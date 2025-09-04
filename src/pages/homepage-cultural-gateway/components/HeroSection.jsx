import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalType, setModalType] = useState(null); // ⬅️ TAMBAH STATE MODAL
  const audioRef = useRef(null);

  const characters = [
    {
      id: 1,
      name: "Arjuna",
      title: "Pangeran Pandawa",
      description:
        "Kesatria bijaksana yang terkenal dengan kemampuan memanahnya",
      image:
        "https://img.freepik.com/premium-vector/arjuna-pandawa-wayang-illustration-hand-drawn-indonesian-shadow-puppet_588166-317.jpg?w=900",
      color: "from-blue-600 to-indigo-800",
    },
    {
      id: 2,
      name: "Srikandi",
      title: "Putri Pejuang",
      description:
        "Wanita pemberani yang ahli dalam seni perang dan kepemimpinan",
      image:
        "https://i.pinimg.com/736x/05/33/4a/05334aa57fb279c3d2aa62239887981e.jpg",
      color: "from-emerald-600 to-teal-800",
    },
    {
      id: 3,
      name: "Hanoman",
      title: "Duta Setia",
      description:
        "Kera putih yang memiliki kekuatan luar biasa dan kesetiaan tanpa batas",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0f1c7348-ae01-4fc9-905b-540b5b3e767d/d1exmmj-b23a21e9-f83b-4366-8240-98df66b60b14.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wZjFjNzM0OC1hZTAxLTRmYzktOTA1Yi01NDBiNWIzZTc2N2QvZDFleG1tai1iMjNhMjFlOS1mODNiLTQzNjYtODI0MC05OGRmNjZiNjBiMTQuanBnIn1dXX0.BvMZji1M7cYJRpaSXRydKh8Zo2YL3GresaNZxkPUTc4",
      color: "from-orange-600 to-red-800",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
      const interval = setInterval(() => {
        setCurrentCharacter((prev) => (prev + 1) % characters.length);
      }, 5000);
      return () => clearInterval(interval);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-shadow-black to-background overflow-hidden">
      {/* BACKSOUND */}
      <audio ref={audioRef} loop>
        <source src="/sounds/gamelan.mp3" type="audio/mp3" />
      </audio>

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Blobs */}
        {[
          {
            top: "10%",
            left: "5%",
            size: 40,
            duration: 6,
            color: "bg-primary/20",
          },
          {
            top: "70%",
            left: "80%",
            size: 48,
            duration: 7,
            color: "bg-cultural-gold/20",
          },
          {
            top: "50%",
            left: "25%",
            size: 32,
            duration: 5,
            color: "bg-accent/20",
          },
          {
            top: "30%",
            left: "60%",
            size: 24,
            duration: 8,
            color: "bg-primary/10",
          },
          {
            top: "80%",
            left: "10%",
            size: 36,
            duration: 9,
            color: "bg-cultural-gold/15",
          },
        ].map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute ${blob.color} rounded-full blur-3xl`}
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              left: blob.left,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: blob.duration,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
                whileHover={{ scale: 1.05 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Kebijaksanaan Kuno Bertemu Keajaiban Digital
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground leading-tight">
                Wayang
                <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text animate-gradient-x">
                  Interactive
                </span>
              </h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Jelajahi warisan budaya Indonesia melalui pengalaman digital
                yang memukau. Temukan karakter wayang, pelajari seni dalang, dan
                ciptakan cerita Anda sendiri dalam platform interaktif yang
                menghidupkan tradisi berusia berabad-abad.
              </motion.p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-cultural-gold transition-all duration-300 shadow-lg shadow-primary/30 font-cta rounded-xl"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => setModalType("petualangan")}
                >
                  Mulai Petualangan
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-foreground hover:bg-primary/10 transition-all duration-300 font-cta rounded-xl"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => setModalType("tentang")}
                >
                  Pelajari Lebih Lanjut
                </Button>
              </motion.div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {[
                {
                  value: "50+",
                  label: "Karakter Wayang",
                  color: "text-primary",
                },
                {
                  value: "25+",
                  label: "Cerita Interaktif",
                  color: "text-cultural-gold",
                },
                {
                  value: "1000+",
                  label: "Pengguna Aktif",
                  color: "text-accent",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${characters[currentCharacter]?.color} opacity-20 animate-pulse`}
                ></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={characters[currentCharacter]?.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 p-8 h-full flex flex-col"
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hover:scale-105 hover:shadow-2xl transition-transform duration-500"
                      >
                        <Image
                          src={characters[currentCharacter]?.image}
                          alt={characters[currentCharacter]?.name}
                          className="w-52 h-72 object-cover rounded-2xl shadow-xl"
                        />
                      </motion.div>
                    </div>

                    <div className="text-center space-y-2 mt-4">
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {characters[currentCharacter]?.name}
                      </h3>
                      <p className="text-primary font-medium">
                        {characters[currentCharacter]?.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {characters[currentCharacter]?.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* NAVIGATION */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  onClick={() =>
                    setCurrentCharacter(
                      (prev) =>
                        (prev - 1 + characters.length) % characters.length
                    )
                  }
                  className="p-2 rounded-full bg-muted/20 border border-border/50 hover:bg-muted/40 transition"
                >
                  <Icon
                    name="ChevronLeft"
                    size={20}
                    className="text-foreground"
                  />
                </button>

                <div className="flex space-x-2">
                  {characters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCharacter(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentCharacter
                          ? "bg-primary w-6 animate-pulse"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentCharacter(
                      (prev) => (prev + 1) % characters.length
                    )
                  }
                  className="p-2 rounded-full bg-muted/20 border border-border/50 hover:bg-muted/40 transition"
                >
                  <Icon
                    name="ChevronRight"
                    size={20}
                    className="text-foreground"
                  />
                </button>
              </div>

              {/* PLAY / PAUSE */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <button
                  onClick={togglePlayback}
                  className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:scale-110 transition shadow-lg"
                >
                  <Icon
                    name={isPlaying ? "Pause" : "Play"}
                    size={18}
                    className="text-foreground"
                  />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="flex flex-col items-center space-y-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-xs text-muted-foreground">
            Gulir untuk menjelajah
          </span>
          <Icon
            name="ChevronDown"
            size={20}
            className="text-muted-foreground"
          />
        </motion.div>
      </div>

      {/* MODAL / POPUP */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition"
              >
                <Icon name="X" size={20} className="text-foreground" />
              </button>

              {modalType === "petualangan" && (
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Selamat Datang di Petualangan
                  </h2>
                  <p className="text-muted-foreground">
                    Masuki dunia wayang interaktif! Pilih karakter favoritmu dan
                    mulai jelajahi cerita epik yang penuh makna.
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={() => setModalType(null)}
                  >
                    Mulai Sekarang
                  </Button>
                </div>
              )}

              {modalType === "tentang" && (
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Tentang Wayang Interactive
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Wayang Interactive adalah platform budaya digital untuk
                    GenZ. Kamu bisa belajar filosofi, mengenal karakter, dan
                    menciptakan cerita sendiri dalam format interaktif.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={() => setModalType(null)}
                  >
                    Tutup
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
