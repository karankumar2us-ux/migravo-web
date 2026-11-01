export const config = {
  runtime: 'edge',
  regions: ['bom1'],
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const { message, history } = await req.json();
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured in Vercel settings.' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const systemPrompt = `You are the Migravo AI Counselor, an authoritative, zero-consultancy study abroad and global relocation advisor for Indian students.
Your core mission: Help students apply directly to top public universities (especially €0 tuition in Germany, 3-year STEM OPT in USA, Canadian DLIs, and Australian PR) without paying ₹50,000+ to consultancies.
Be direct, concise, factual, and helpful. Keep responses to 2-3 crisp paragraphs or clear bullet points. Maintain context from earlier parts of the conversation.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I am the Migravo AI Counselor, ready to guide Indian students with factual, zero-broker relocation advice.' }]
      }
    ];

    if (Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn.text && turn.text.trim()) {
          contents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Supported models in priority order
    const candidateModels = ['gemini-3.8-flash', 'gemini-2.5-flash'];
    let response = null;
    let lastErrorText = '';

    for (const model of candidateModels) {
      try {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                maxOutputTokens: 450
              }
            })
          }
        );

        if (response.ok) {
          break;
        } else {
          lastErrorText = await response.text();
          console.warn(`Model ${model} returned ${response.status}:`, lastErrorText);
        }
      } catch (e) {
        lastErrorText = e.message;
        console.error(`Fetch exception for ${model}:`, e);
      }
    }

    if (!response || !response.ok) {
      let friendlyError = 'Gemini API temporarily busy. Please retry in a moment.';
      try {
        const parsed = JSON.parse(lastErrorText);
        friendlyError = parsed.error?.message || friendlyError;
      } catch (e) {
        if (lastErrorText) friendlyError = lastErrorText;
      }

      return new Response(JSON.stringify({ error: friendlyError }), { 
        status: response?.status || 500,
        headers: { 'Content-Type': 'application/json' }
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
            } catch (e) {
              // Ignore partial frames
            }
          }
        }
      }
    });

    return new Response(response.body.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}