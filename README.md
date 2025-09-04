🚀 Wayang Interactive – Portal Budaya Digital

Website interaktif Wayang Kulit Indonesia, menampilkan pengalaman digital yang mendidik, animatif, dan menarik untuk generasi Z.

🌟 Fitur Utama

🎭 Karakter Wayang 3D – Jelajahi dunia wayang dengan model interaktif
🎶 Gamelan Interaktif – Mainkan gamelan secara digital
📝 Cerita Interaktif – Buat alur cerita Wayang sendiri
⚛️ React 18 & Vite – Performa cepat dan modern
🎨 Tailwind CSS – UI responsif dan estetis
🎬 Framer Motion – Animasi halus di setiap halaman
🎥 Demo Loading Screen

Loading screen Wayang Interaktif menampilkan animasi siluet Wayang dan cahaya blencong sebelum masuk ke halaman utama.

📌 GIF di atas bisa diganti dengan file GIF buatanmu sendiri, atau video pendek .mp4 yang di-convert ke GIF untuk GitHub.

🛠 Instalasi & Jalankan Aplikasi

# Install dependencies

npm install

# atau

yarn install

# Jalankan development server

npm start

# atau

yarn start

📁 Struktur Proyek
wayang-interactive/
├── public/  
│ └── img/ # Siluet Wayang, icon, gambar statis
├── src/
│ ├── components/ # Komponen UI
│ ├── pages/ # Halaman (Homepage, Gallery, Gamelan)
│ ├── styles/ # Tailwind CSS & global styles
│ ├── App.jsx
│ ├── Routes.jsx
│ └── index.jsx
├── .env  
├── index.html  
├── package.json  
├── tailwind.config.js  
└── vite.config.js

🧩 Menambahkan Route Baru

Edit file Routes.jsx:
import { useRoutes } from "react-router-dom";
import HomepageCulturalGateway from "pages/homepage-cultural-gateway";

const ProjectRoutes = () => {
let element = useRoutes([
{ path: "/", element: <HomepageCulturalGateway /> },
// Tambahkan route baru di sini
]);

return element;
};

🎨 Styling & Animasi

Tailwind CSS untuk desain responsif dan konsisten
Framer Motion untuk animasi loading dan interaksi UI
Shadow, glow, dan efek hover untuk pengalaman visual yang premium

📦 Build Produksi
npm run build

# atau

yarn build

Folder dist siap di-deploy ke server.

📝 Tips Profesional

Gunakan React Developer Tools untuk debugging
Pastikan semua file case-sensitive sesuai import
Optimalkan gambar & animasi agar GIF loading tidak berat
Kombinasikan Framer Motion + Tailwind untuk UI interaktif
