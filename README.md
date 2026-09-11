# 💄 Liza Makeup — Luxury Editorial Landing Page & Portfolio

[![Astro](https://img.shields.io/badge/Astro-v5.1.0-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-v3.12.2-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)

Landing page premium & portofolio interaktif untuk **Liza Makeup**, penyedia layanan Makeup Artist (MUA) profesional berbasis di Jombang & Jawa Timur. Dirancang dengan estetika editorial modern, animasi halus berkinerja tinggi, serta integrasi pemesanan langsung ke WhatsApp.

🌐 **Live Demo:** [https://lizamakeup.vercel.app/](https://lizamakeup.vercel.app/)

---

## ✨ Fitur Utama

- 🎨 **Desain Editorial Premium & Responsive**: Kombinasi warna *champagne*, *nude*, dan *charcoal* yang anggun, responsif di seluruh perangkat (desktop, tablet, mobile).
- 🎬 **Animasi & Interaksi Modern (GSAP + ScrollTrigger)**:
  - Text splitting & character reveal animations saat di-scroll.
  - Custom cursor interaktif yang mengikuti pergerakan kursor mouse.
  - Subtle grain overlay & hero parallax effect.
  - Interactive wave button animation pada tombol booking.
- 🚀 **Smooth Scrolling (Lenis)**: Pengalaman *scrolling* yang sangat mulus terintegrasi langsung dengan GSAP ScrollTrigger.
- 🖼️ **Koleksi Portofolio & Lightbox**: Galeri foto interaktif dengan mode pratinjau *fullscreen lightbox* dan otimisasi format WebP/JPEG lazy-loading.
- 💰 **Daftar Layanan & Paket Akad**: Tampilan transparan untuk paket pernikahan/akad beserta rincian fasilitasnya.
- 💬 **Integrasi Booking WhatsApp**: Akses cepat bagi calon klien untuk berkonsultasi dan mengamankan tanggal acara.
- 🔍 **SEO & Structured Data (JSON-LD)**: 
  - Schema markup `BeautySalon` (Schema.org) untuk meningkatkan visibilitas di Google Search & Google Maps.
  - Meta tags OpenGraph & Twitter Cards lengkap.
  - Generator Favicon Dinamis menggunakan HTML Canvas.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Astro v5.1](https://astro.build/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/) + Custom CSS
- **Animation Engine**: [GSAP 3.12](https://greensock.com/gsap/) (`ScrollTrigger`)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Font**: Playfair Display (Serif) & Montserrat (Sans-Serif) via Google Fonts
- **Deployment**: Vercel / Netlify

---

## 📁 Struktur Proyek

```text
landing-page-liza-makeup/
├── public/
│   ├── img-jpeg/           # Aset gambar format JPEG
│   └── img-webp/           # Aset gambar teroptimasi format WebP
├── src/
│   ├── pages/
│   │   └── index.astro     # Halaman utama (Landing Page & Structuring)
│   ├── scripts/
│   │   └── animations.js   # Logic GSAP, Lenis, Text Splitter, Cursor & Lightbox
│   └── styles/
│       └── global.css      # Custom styling, fonts, & utility classes
├── astro.config.mjs        # Konfigurasi Astro & Tailwind integration
├── tailwind.config.js      # Konfigurasi Tema Tailwind (Warna, Font, dll)
├── package.json            # Manifest Dependensi & Scripts
└── README.md               # Dokumentasi Proyek
```

---

## 🚀 Panduan Instalasi & Penggunaan

### Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- `npm` / `pnpm` / `yarn`

### Langkah-langkah

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/ekyaaa/lizamakeup.git
   cd lizamakeup
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Development)**:
   ```bash
   npm run dev
   ```
   Akses aplikasi di browser pada alamat `http://localhost:4321`.

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   Hasil build akan tersimpan di dalam direktori `dist/`.

5. **Preview Build Produksi**:
   ```bash
   npm run preview
   ```

---

## 📄 Lisensi & Kredit

- **Developed by**: [nexacode.dev](https://nexacode.dev)
- **Client**: Liza Makeup (Jombang, Jawa Timur)
- **License**: Distributed under the ISC License.

---
<p center align="center">Made with ❤️ for Liza Makeup</p>
