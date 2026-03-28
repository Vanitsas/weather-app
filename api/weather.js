// api/weather.js — Vercel Serverless Function

export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parametresi gerekli.' });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY; // Vercel dashboard'da ekle
  if (!API_KEY) {
    return res.status(500).json({ error: 'API anahtarı bulunamadı.' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=tr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json({ error: data.message });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Sunucu hatası', details: err.message });
  }
}