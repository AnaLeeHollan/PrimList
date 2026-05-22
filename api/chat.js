export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
  {
    role: "system",
    content: "You create Etsy listing data for vintage and handmade items."
  },
  {
    role: "user",
    content: `
Return ONLY valid JSON in this exact format:

{
  "title": "",
  "price": "",
  "tags": "",
  "description": ""
}

Create an Etsy-style listing for a vintage or handmade item.
`
  }
],
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
