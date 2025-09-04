# Wayang Interactive – Portal Budaya Digital

Website interaktif Wayang Kulit Indonesia, menampilkan pengalaman digital yang mendidik, animatif, dan menarik untuk generasi Z.

## 🚀 Fitur Utama

- **🎭 Karakter Wayang** - Jelajahi dunia wayang dengan model interaktif
- **🎶 Gamelan Interaktif** - Mainkan gamelan secara digital
- **📝 Cerita Interaktif** - Buat alur cerita Wayang sendiri
- **⚛️ React 18 & Vite** - Performa cepat dan modern
- **🎨 Tailwind CSS** - UI responsif dan estetis
- **🎬 Framer Motion** - Animasi halus di setiap halaman
- **🎥 Demo Loading Screen** - Loading screen Wayang Interaktif menampilkan animasi siluet Wayang dan cahaya blencong sebelum masuk ke halaman utama.


## 📋 Bahasa Pemograman

- Node.js (v14.x atau higher)
- npm atau yarn

## 🛠️ Instalasi

1. Instal Dependensi:
   ```bash
   npm install
   # atau
   yarn install
   ```
   
2. Mulai server pengembangan:
   ```bash
   npm start
   # atau
   yarn start
   ```

## 📁 Struktur Proyek

```
react_app/
├── public/             # Aset statis
├── src/
│   ├── components/     # Komponen UI yang dapat digunakan kembali
│   ├── pages/          # Komponen halaman
│   ├── styles/         # Gaya global dan konfigurasi Tailwind
│   ├── App.jsx         # Komponen aplikasi utama
│   ├── Routes.jsx      # Jalur aplikasi
│   └── index.jsx       # Titik masuk aplikasi
├── .env                # Variabel lingkungan
├── index.html          # Template HTML
├── package.json        # Ketergantungan proyek dan skrip
├── tailwind.config.js  # Konfigurasi Tailwind CSS
└── vite.config.js      # Konfigurasi Vite
```

## 🧩 Menambahkan Rute

Untuk menambahkan rute baru ke aplikasi, perbarui file `Routes.jsx`:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Gaya

Proyek ini menggunakan Tailwind CSS untuk penataan. Konfigurasi mencakup:

- Plugin formulir untuk penataan formulir
- Plugin tipografi untuk penataan teks
- Plugin rasio aspek untuk elemen responsif
- Pertanyaan kontainer untuk desain responsif khusus komponen
- Tipografi cair untuk teks responsif- Utilitas animasi

## 📱 Desain Responsif

Aplikasi ini dibangun dengan desain responsif menggunakan titik putus Tailwind CSS.


## 📦 Penerapan

Bangun aplikasi untuk produksi:

```bash
npm run build
```