export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, history } = await req.json();
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured in Vercel settings.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are the Migravo AI Counselor, an authoritative, zero-consultancy study abroad and global relocation advisor for Indian students.
Your core mission: Help students apply directly to top public universities (especially €0 tuition in Germany, 3-year STEM OPT in USA, Canadian DLIs, and Australian PR) without paying ₹50,000+ to consultancies.
Be direct, concise, factual, and helpful. Keep responses to 2 crisp paragraphs or clear bullet points.`;

    const contents = [];

    // Strictly alternate turns: user -> model -> user -> model
    if (Array.isArray(history)) {
      let expectedRole = 'user';
      for (const turn of history.slice(-4)) {
        if (!turn.text || !turn.text.trim()) continue;
        const currentRole = turn.sender === 'user' ? 'user' : 'model';

        if (currentRole === expectedRole) {
          contents.push({
            role: currentRole,
            parts: [{ text: turn.text.trim() }],
          });
          expectedRole = expectedRole === 'user' ? 'model' : 'user';
        } else if (contents.length > 0 && currentRole === 'user' && expectedRole === 'model') {
          contents[contents.length - 1].parts[0].text += `\n${turn.text.trim()}`;
        }
      }

      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents.pop();
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    // Call active model: gemini-3.8-flash
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            maxOutputTokens: 350,
          },
        }),
      }
    );

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(JSON.stringify({ error: `Gemini API error (${geminiRes.status}): ${errText}` }), {
        status: geminiRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const token = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (token) {
                controller.enqueue(encoder.encode(token));
              }
            } catch {
              // Ignore partial frames
            }
          }
        }
      },
    });

    return new Response(geminiRes.body.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (err) {
    const isTimeout = err.name === 'AbortError';
    return new Response(
      JSON.stringify({
        error: isTimeout
          ? 'Upstream connection timed out after 9s. Please try again.'
          : err.message || 'Internal server error',
      }),
      {
        status: 504,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}