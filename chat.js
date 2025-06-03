export default async function handler(req, res) {
  const { frage, branche, sprache } = req.body;

  const prompt = `Du bist ein smarter AI-Bot für die Branche "${branche}" und antwortest in ${sprache}. Frage: ${frage}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Du bist ein hilfreicher Assistent." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ antwort: data.choices[0].message.content });
}
