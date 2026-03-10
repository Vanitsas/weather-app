/* ============================================
   WEATHER APP — script.js
   API: OpenWeatherMap via Netlify Function
   Features: Search, Day/Night toggle,
             Weather-based BG animations,
             Test animation cycle
   ============================================ */

// ── API Config ──────────────────────────────
// API key Netlify environment variable'da saklı
// Frontend'e gelmiyor, güvenli!
const API_URL = '/.netlify/functions/weather';

// ── DOM References ───────────────────────────
const cityInput      = document.getElementById('city-input');
const searchBtn      = document.getElementById('search-btn');
const modeToggle     = document.getElementById('mode-toggle');
const bgLayer        = document.getElementById('bg-layer');
const starLayer      = document.getElementById('star-layer');
const weatherDisplay = document.getElementById('weather-display');
const loading        = document.getElementById('loading');
const errorMsg       = document.getElementById('error-msg');
const testBtn        = document.getElementById('test-btn');
const stopBtn        = document.getElementById('stop-btn');

// Weather data elements
const cityNameEl  = document.getElementById('city-name');
const tempEl      = document.getElementById('temperature');
const descEl      = document.getElementById('description');
const humidityEl  = document.getElementById('humidity');
const windEl      = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feels-like');
const pressureEl  = document.getElementById('pressure');
const weatherIcon = document.getElementById('weather-icon');

// ── State ────────────────────────────────────
let isNightMode  = false;
let testInterval = null;
let testIndex    = 0;
const testWeatherTypes  = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'drizzle', 'mist'];
const allWeatherClasses = ['weather-rain','weather-thunderstorm','weather-clouds','weather-drizzle','weather-snow','weather-mist','weather-clear'];

// ── Icon Mapping ─────────────────────────────
function getIconName(description, night = false) {
  const d = description.toLowerCase();
  const suffix = night ? '-night' : '-day';

  if (d.includes('thunderstorm')) return `thunder${suffix}`;
  if (d.includes('drizzle'))      return `drizzle${suffix}`;
  if (d.includes('rain'))         return `rain${suffix}`;
  if (d.includes('snow'))         return `snow${suffix}`;
  if (d.includes('overcast'))     return `overcast-clouds${suffix}`;
  if (d.includes('broken'))       return `broken-clouds${suffix}`;
  if (d.includes('cloud'))        return `clouds${suffix}`;
  if (d.includes('mist'))         return `mist${suffix}`;
  if (d.includes('fog'))          return `fog${suffix}`;
  if (d.includes('haze'))         return `haze${suffix}`;
  if (d.includes('clear'))        return `sunny${suffix}`;
  return 'default';
}

// Set icon — bulunamazsa default.png
function setWeatherIcon(description) {
  const iconName = getIconName(description, isNightMode);
  const img = weatherIcon;
  img.src = `icons/${iconName}.png`;
  img.onerror = () => { img.src = 'icons/default.png'; };
}

// ── Weather Type Classifier ───────────────────
function classifyWeather(description) {
  const d = description.toLowerCase();
  if (d.includes('thunderstorm')) return 'thunderstorm';
  if (d.includes('drizzle'))      return 'drizzle';
  if (d.includes('rain'))         return 'rain';
  if (d.includes('snow'))         return 'snow';
  if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return 'mist';
  if (d.includes('cloud'))        return 'clouds';
  if (d.includes('clear'))        return 'clear';
  return 'clear';
}

// ── Fetch Weather — Netlify Function üzerinden ──
async function fetchWeather(city) {
  showLoading(true);
  showError('');
  weatherDisplay.classList.add('hidden');

  try {
    const res = await fetch(
      `${API_URL}?city=${encodeURIComponent(city)}`
    );

    if (res.status === 404) throw new Error(`"${city}" bulunamadı. Şehir adını kontrol edin.`);
    if (res.status === 401) throw new Error('API anahtarı geçersiz.');
    if (!res.ok)            throw new Error('Bir hata oluştu. Lütfen tekrar deneyin.');

    const data = await res.json();
    renderWeather(data);

  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

// ── Render Weather Data ──────────────────────
function renderWeather(data) {
  const description = data.weather[0].description;
  const type        = classifyWeather(description);

  cityNameEl.textContent  = `${data.name}, ${data.sys.country}`;
  tempEl.textContent      = `${Math.round(data.main.temp)}°C`;
  descEl.textContent      = description;
  humidityEl.textContent  = `${data.main.humidity}%`;
  windEl.textContent      = `${Math.round(data.wind.speed)} m/s`;
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  pressureEl.textContent  = `${data.main.pressure} hPa`;

  setWeatherIcon(description);
  weatherDisplay.classList.remove('hidden');

  startAnimation(type);
}

// ── UI Helpers ───────────────────────────────
function showLoading(state) {
  loading.classList.toggle('hidden', !state);
}

function showError(msg) {
  if (msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
  } else {
    errorMsg.classList.add('hidden');
  }
}

// ── Day / Night Toggle ───────────────────────
modeToggle.addEventListener('click', () => {
  isNightMode = !isNightMode;
  document.body.classList.toggle('day-mode', !isNightMode);
  document.body.classList.toggle('night-mode', isNightMode);
  modeToggle.textContent = isNightMode ? '🌙' : '☀️';

  if (isNightMode) buildStars();
  else starLayer.innerHTML = '';

  const currentDesc = descEl.textContent;
  if (currentDesc && currentDesc !== '—') setWeatherIcon(currentDesc);
});

// Twinkling star field (night mode)
function buildStars() {
  starLayer.innerHTML = '';
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px; height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation-duration: ${2 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 4}s;
    `;
    starLayer.appendChild(star);
  }
}

// ── Background Animations ────────────────────
function clearAnimations() {
  bgLayer.innerHTML = '';
}

function startAnimation(type) {
  clearAnimations();

  document.body.classList.remove(...allWeatherClasses);
  document.body.classList.add(`weather-${type}`);

  switch (type) {
    case 'clear':        animSunny();   break;
    case 'clouds':
    case 'drizzle':      animClouds(8); break;
    case 'rain':         animRain();    break;
    case 'snow':         animSnow();    break;
    case 'thunderstorm': animThunder(); break;
    case 'mist':         animMist();    break;
    default:             animClouds(4); break;
  }
}

// ── Animation: Sunny ─────────────────────────
function animSunny() {
  const sun = document.createElement('div');
  sun.className = 'anim-sun';
  bgLayer.appendChild(sun);
  animClouds(3, true);
}

// ── Animation: Clouds ────────────────────────
function animClouds(count = 6, slow = false) {
  for (let i = 0; i < count; i++) {
    const cloud = buildCloudEl();
    const dur   = slow ? 30 + Math.random() * 30 : 15 + Math.random() * 20;
    const top   = 5 + Math.random() * 50;
    const scale = 0.6 + Math.random() * 1.2;
    const delay = Math.random() * -dur;

    cloud.style.cssText = `
      top: ${top}%;
      width: ${80 * scale}px;
      height: ${30 * scale}px;
      opacity: ${0.4 + Math.random() * 0.4};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    bgLayer.appendChild(cloud);
  }
}

function buildCloudEl() {
  const cloud = document.createElement('div');
  cloud.className = 'anim-cloud';
  cloud.style.cssText = `background: rgba(255,255,255,0.65); border-radius: 50px;`;

  const bump1 = document.createElement('div');
  bump1.style.cssText = `
    position:absolute; bottom:60%; left:15%;
    width:55%; height:120%;
    background:rgba(255,255,255,0.7); border-radius:50%;
  `;
  const bump2 = document.createElement('div');
  bump2.style.cssText = `
    position:absolute; bottom:60%; left:40%;
    width:40%; height:100%;
    background:rgba(255,255,255,0.65); border-radius:50%;
  `;
  cloud.appendChild(bump1);
  cloud.appendChild(bump2);
  return cloud;
}

// ── Animation: Rain ──────────────────────────
function animRain() {
  animClouds(5);
  for (let i = 0; i < 80; i++) {
    const drop = document.createElement('div');
    drop.className = 'anim-rain';
    const dur = 0.6 + Math.random() * 0.6;
    drop.style.cssText = `
      left: ${Math.random() * 100}%;
      height: ${12 + Math.random() * 18}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * -dur}s;
      opacity: ${0.4 + Math.random() * 0.5};
    `;
    bgLayer.appendChild(drop);
  }
}

// ── Animation: Snow ──────────────────────────
function animSnow() {
  for (let i = 0; i < 60; i++) {
    const flake = document.createElement('div');
    flake.className = 'anim-snow';
    const size = 4 + Math.random() * 8;
    const dur  = 4 + Math.random() * 6;
    flake.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px; height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * -dur}s;
      opacity: ${0.5 + Math.random() * 0.5};
    `;
    bgLayer.appendChild(flake);
  }
}

// ── Animation: Thunderstorm ──────────────────
function animThunder() {
  for (let i = 0; i < 6; i++) {
    const cloud = buildCloudEl();
    const scale = 1.2 + Math.random() * 1.5;
    cloud.style.cssText = `
      top: ${Math.random() * 30}%;
      width: ${100 * scale}px;
      height: ${38 * scale}px;
      opacity: ${0.6 + Math.random() * 0.3};
      background: rgba(60,40,80,0.6);
      animation-duration: ${20 + Math.random() * 15}s;
      animation-delay: ${Math.random() * -20}s;
      filter: blur(3px);
    `;
    bgLayer.appendChild(cloud);
  }
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'anim-rain';
    const dur = 0.4 + Math.random() * 0.4;
    drop.style.cssText = `
      left: ${Math.random() * 100}%;
      height: ${14 + Math.random() * 20}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * -dur}s;
      opacity: ${0.5 + Math.random() * 0.4};
    `;
    bgLayer.appendChild(drop);
  }
  const flash = document.createElement('div');
  flash.className = 'anim-lightning';
  bgLayer.appendChild(flash);
}

// ── Animation: Mist / Fog / Haze ─────────────
function animMist() {
  for (let i = 0; i < 5; i++) {
    const mist = document.createElement('div');
    mist.style.cssText = `
      position: absolute;
      left: ${-10 + i * 20}%;
      top: ${20 + i * 12}%;
      width: ${200 + Math.random() * 300}px;
      height: ${60 + Math.random() * 80}px;
      background: rgba(200,190,220,0.18);
      border-radius: 50%;
      filter: blur(18px);
      animation: driftCloud ${25 + i * 8}s linear infinite;
      animation-delay: ${i * -5}s;
    `;
    bgLayer.appendChild(mist);
  }
}

// ── Search Events ─────────────────────────────
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// ── Test Animations ───────────────────────────
testBtn.addEventListener('click', () => {
  testBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
  runTestCycle();
});

stopBtn.addEventListener('click', stopTest);

function runTestCycle() {
  testIndex = 0;
  showTestFrame();
  testInterval = setInterval(() => {
    testIndex = (testIndex + 1) % testWeatherTypes.length;
    showTestFrame();
  }, 5000);
}

function showTestFrame() {
  const type = testWeatherTypes[testIndex];
  startAnimation(type);

  errorMsg.textContent = `Testing: ${type.toUpperCase()}`;
  errorMsg.style.color       = '#c4b5fd';
  errorMsg.style.background  = 'rgba(139,92,246,0.15)';
  errorMsg.style.borderColor = 'rgba(139,92,246,0.3)';
  errorMsg.classList.remove('hidden');
}

function stopTest() {
  clearInterval(testInterval);
  testInterval = null;
  clearAnimations();

  document.body.classList.remove(...allWeatherClasses);

  showError('');
  errorMsg.style.color       = '';
  errorMsg.style.background  = '';
  errorMsg.style.borderColor = '';

  stopBtn.classList.add('hidden');
  testBtn.classList.remove('hidden');
}

// ── Init ──────────────────────────────────────
animClouds(3, true);