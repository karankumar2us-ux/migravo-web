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

    const systemText = `You are the Migravo AI Counselor, an authoritative, zero-consultancy study abroad and global relocation advisor for Indian students.
Your core mission: Help students apply directly to top public universities (especially €0 tuition in Germany, 3-year STEM OPT in USA, Canadian DLIs, and Australian PR) without paying ₹50,000+ to consultancies.
Be direct, concise, factual, and helpful. Keep responses to 2-3 crisp paragraphs or clear bullet points.`;

    // Build properly alternating multi-turn history: user -> model -> user -> model
    const contents = [];

    if (Array.isArray(history)) {
      let expectedRole = 'user';
      for (const turn of history) {
        if (!turn.text || !turn.text.trim()) continue;
        const currentRole = turn.sender === 'user' ? 'user' : 'model';
        
        // Strict alternation check: Gemini rejects consecutive user-user or model-model
        if (currentRole === expectedRole) {
          contents.push({
            role: currentRole,
            parts: [{ text: turn.text.trim() }]
          });
          expectedRole = expectedRole === 'user' ? 'model' : 'user';
        } else if (contents.length > 0 && currentRole === 'user' && expectedRole === 'model') {
          // If two user turns in a row, combine them into one turn
          contents[contents.length - 1].parts[0].text += `\n${turn.text.trim()}`;
        }
      }

      // If last history element was 'user', pop it so the incoming message becomes the final 'user'
      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents.pop();
      }
    }

    // Append the current student prompt as the final user turn
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }]
    });

    const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash'];
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
              systemInstruction: {
                parts: [{ text: systemText }]
              },
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