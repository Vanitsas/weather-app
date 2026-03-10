# SKYVISION — Hava Durumu Uygulaması

## 🌍 Canlı Demo
https://vanitsas.github.io/weather-app/

## Genel Bakış

**SKYVISION**, **HTML, CSS ve JavaScript** ile hazırlanmış modern ve görsel açıdan çekici bir hava durumu uygulamasıdır. Dünyadaki herhangi bir şehir için **OpenWeatherMap API** üzerinden gerçek zamanlı hava durumu bilgisi sunar. Uygulama, mevcut hava koşullarına göre dinamik arka plan animasyonları, gece/gündüz modu ve pürüzsüz etkileşimli efektler içerir.

Öne çıkan özellikler:

- Gündüz/Gece modu 🌞🌙  
- Hava durumuna göre animasyonlu arka planlar (güneş, bulut, yağmur, kar, fırtına, sis)  
- Mobil ve masaüstü uyumlu tasarım  
- Gerçek zamanlı hava bilgileri: sıcaklık, nem, rüzgar, basınç ve hissedilen sıcaklık  
- Test animasyon paneli ile tüm hava durumlarını önizleme

## Özellikler

- **Şehir Arama:** Herhangi bir şehri girerek mevcut hava durumunu görüntüleme  
- **Dinamik Arka Planlar:** Arka planlar, hava koşullarına göre değişir  
- **Animasyonlu Hava Efektleri:** Güneş, bulut, yağmur, kar, yıldırım ve sis animasyonları  
- **Gece Modu:** Otomatik yıldızlar ve gece ikonları  
- **Responsive Tasarım:** Masaüstü ve mobilde sorunsuz çalışır  
- **Test Modu:** Farklı hava animasyonlarını hızlıca görüntüleme

## Canlı Demo

Projeyi yerel olarak çalıştırabilir veya **GitHub Pages** üzerinden canlı görebilirsiniz.

## Kurulum / Yerel Çalıştırma

1. Depoyu klonlayın:

```bash
git clone https://github.com/your-username/skyvision.git
cd skyvision

2. index.html dosyasını tarayıcınızda açın.
3. ⚠️ Önemli: Hava verisi çekmeden önce OpenWeatherMap API anahtarınızı script.js içinde ekleyin:
const API_KEY = 'YOUR_API_KEY_HERE';
'YOUR_API_KEY_HERE' yerine kendi anahtarınızı koyun.

skyvision/
├─ index.html
├─ style.css
├─ script.js
├─ icons/           # Hava ikonları (gündüz/gece, bulut, yağmur vb.)
└─ README.md


## Kullanılan Teknolojiler
HTML5 — Uygulama yapısı
CSS3 — Animasyonlar, responsive tasarım, gradientler
JavaScript — Fetch API, DOM işlemleri, dinamik hava efektleri
OpenWeatherMap API — Gerçek zamanlı hava verisi

## Hava Animasyonları
Hava Durumu	Görsel Efekt
Açık	Güneş ve yüzen bulutlar
Bulutlu	Hareket eden bulutlar
Yağmur	Düşen yağmur damlaları
Kar	Düşen kar taneleri
Fırtına	Yağmur + bulut + aralıklı yıldırım
Çiseleme	Hafif bulut + hafif yağmur
Sis/Pus/Hazıne	Yarı saydam sis katmanları

## Gündüz/Gece Modu
Kullanıcılar modu manuel olarak değiştirebilir
Gece modu yıldızlar ve gece ikonlarını gösterir

## Katkıda Bulunma
Depoyu forklayın
Kendi branch’inizi oluşturun (git checkout -b feature-name)
Değişikliklerinizi yapın ve commit edin (git commit -m "Özellik ekle")
Branch’i pushlayın (git push origin feature-name)
Pull Request açın