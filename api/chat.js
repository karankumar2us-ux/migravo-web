export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing on server.' });
  }

  const systemPrompt = `You are the Migravo AI Counselor, an authoritative, zero-consultancy study abroad and global relocation advisor for Indian students.
Your core mission: Help students apply directly to top public universities (especially €0 tuition in Germany, 3-year STEM OPT in USA, Canadian DLIs, and Australian PR) without paying ₹50,000+ to consultancies.
Be direct, concise, factual, and helpful. Keep responses to 2-3 crisp paragraphs or clear bullet points.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nStudent Question: ${message}` }]
            }
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API request failed' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that query. Please rephrase your question.";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error while connecting to AI counselor.' });
  }
}