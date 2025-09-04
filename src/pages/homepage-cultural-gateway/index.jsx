import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import PathwayCards from "./components/PathwayCards";
import CommunityActivity from "./components/CommunityActivity";
import GamelanPlayer from "./components/GamelanPlayer";
import CulturalPartners from "./components/CulturalPartners";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const HomepageCulturalGateway = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const fullText = "Memuat Website Budaya Kita...";

  useEffect(() => {
    // Simulasi waktu loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // Animasi typing untuk teks
    let index = 0;
    const typing = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(typing);
    }, 90);

    // Sound effect gamelan halus
    const audio = new Audio("audio/gong-sound-effect-308757.mp3");
    audio.volume = 0.10;
    audio.loop = false;
    audio.play().catch(() => {}); // biar tidak error autoplay di browser

    return () => {
      clearTimeout(timer);
      clearInterval(typing);
      audio.pause();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Wayang Interactive - Gerbang Budaya Digital Indonesia</title>
        <meta
          name="description"
          content="Jelajahi warisan budaya Indonesia melalui pengalaman digital yang memukau. Temukan karakter wayang, pelajari seni dalang, dan ciptakan cerita Anda sendiri dalam platform interaktif yang menghidupkan tradisi berusia berabad-abad."
        />
        <meta
          name="keywords"
          content="wayang, budaya indonesia, dalang, gamelan, cerita interaktif, museum digital, seni tradisional"
        />
        <meta
          property="og:title"
          content="Wayang Interactive - Gerbang Budaya Digital Indonesia"
        />
        <meta
          property="og:description"
          content="Platform digital terdepan untuk melestarikan dan menghidupkan kembali seni wayang kulit Indonesia"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/homepage-cultural-gateway" />
      </Helmet>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            {/* Background ornamen batik */}
            <div className="absolute inset-0 bg-[url('img/brown-pattern-megamendung-batik-cirebon-free-vector.jpg')] opacity-[0.07] bg-cover bg-center" />

            {/* Spotlight Blencong */}
            <motion.div
              className="absolute w-[32rem] h-[32rem] rounded-full bg-yellow-400/25 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 25, -25, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Partikel bintang berkilau */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-yellow-300 shadow-md"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.3, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.35,
                }}
              />
            ))}

            {/* Siluet Wayang */}
            <motion.img
              src="img/3.svg"
              alt="Wayang Loading"
              className="w-55 h-55 object-contain drop-shadow-[0_0_35px_rgba(255,215,0,0.7)] relative z-10"
              animate={{
                y: [0, -14, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Teks dengan typing + glow */}
            <motion.div
              className="mt-10 flex items-center space-x-3 text-xl md:text-2xl font-bold tracking-widest relative z-10"
              animate={{ opacity: [0.7, 1, 0.7], y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse drop-shadow-lg" />
              <span className="drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]">
                {text}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten utama */}
      {!loading && (
        <>
          <Header />
          <main className="pt-16">
            <HeroSection />
            <GamelanPlayer />
            <CulturalPartners />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomepageCulturalGateway;
