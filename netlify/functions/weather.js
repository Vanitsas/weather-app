exports.handler = async function(event) {
  const city = event.queryStringParameters?.city;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) return { statusCode: 400, body: JSON.stringify({ error: 'City gerekli.' }) };
  if (!API_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'API key bulunamadı.' }) };

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();

  return {
    statusCode: res.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};