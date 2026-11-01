export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in Vercel settings.' });
    }

    const systemPrompt = `You are the Migravo AI Counselor, an authoritative, zero-consultancy study abroad and global relocation advisor for Indian students.
Your core mission: Help students apply directly to top public universities (especially €0 tuition in Germany, 3-year STEM OPT in USA, Canadian DLIs, and Australian PR) without paying ₹50,000+ to consultancies.
Be direct, concise, factual, and helpful. Keep responses to 2 crisp paragraphs or clear bullet points.`;

    // Build properly alternating multi-turn history: user -> model
    const contents = [];

    if (Array.isArray(history)) {
      let expectedRole = 'user';
      for (const turn of history.slice(-4)) {
        if (!turn.text || !turn.text.trim()) continue;
        const currentRole = turn.sender === 'user' ? 'user' : 'model';

        if (currentRole === expectedRole) {
          contents.push({
            role: currentRole,
            parts: [{ text: turn.text.trim() }]
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
      parts: [{ text: message.trim() }]
    });

    // Fast direct request with thinkingBudget set to 0 to avoid delays
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            maxOutputTokens: 400,
            thinkingConfig: {
              thinkingBudget: 0
            }
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      let friendlyError = 'Google API error';
      try {
        const parsed = JSON.parse(errText);
        friendlyError = parsed.error?.message || errText;
      } catch {}
      return res.status(geminiRes.status).json({ error: friendlyError });
    }

    const data = await geminiRes.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}