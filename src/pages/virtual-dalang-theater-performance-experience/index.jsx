// index.jsx (Enhanced Main Component)
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import TheaterStage from "./components/TheaterStage";
import StorySelector from "./components/StorySelector";
import VoiceTrainingPanel from "./components/VoiceTrainingPanel";
import SubtitleDisplay from "./components/SubtitleDisplay";

const VirtualDalangTheaterPerformanceExperience = () => {
  const navigate = useNavigate();

  // Performance state
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPerformanceStarted, setIsPerformanceStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(360);
  const [currentScene, setCurrentScene] = useState(1);
  const [totalScenes, setTotalScenes] = useState(5);
  const [volume, setVolume] = useState(0.8);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false);
  const [isVoiceTrainingOpen, setIsVoiceTrainingOpen] = useState(false);
  const [performanceQuality, setPerformanceQuality] = useState("high");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  // Enhanced performance data with images
  const performanceData = {
    bharatayuddha: {
      title: "Bharatayuddha",
      duration: "45 menit",
      scenes: 8,
      description: "Kisah perang besar antara Pandawa dan Kurawa di medan Kurukshetra",
      difficulty: "Menengah",
      color: "from-purple-600 to-blue-600",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
      characters: ["Arjuna", "Kresna", "Bisma"],
      icon: "Swords"
    },
    ramayana: {
      title: "Ramayana",
      duration: "60 menit",
      scenes: 10,
      description: "Petualangan Rama dalam menyelamatkan Sinta dari cengkeraman Rahwana",
      difficulty: "Pemula",
      color: "from-orange-600 to-red-600",
      gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
      characters: ["Rama", "Sinta", "Hanuman"],
      icon: "ArrowRight"
    },
    mahabharata: {
      title: "Mahabharata",
      duration: "90 menit",
      scenes: 12,
      description: "Epik besar keluarga Bharata dengan konflik dan nilai-nilai kehidupan",
      difficulty: "Mahir",
      color: "from-green-600 to-teal-600",
      gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
      characters: ["Yudhistira", "Bima", "Duryodana"],
      icon: "Crown"
    }
  };

  // Enhanced loading simulation
  const simulateLoading = useCallback(async () => {
    if (!selectedStory) {
      showToast("⚠️ Pilih cerita terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);

    const steps = [
      { task: "Mempersiapkan panggung wayang...", duration: 800 },
      { task: "Memuat karakter dan properti...", duration: 1000 },
      { task: "Menyiapkan audio gamelan...", duration: 600 },
      { task: "Mengatur pencahayaan panggung...", duration: 700 },
      { task: "Finalisasi pertunjukan...", duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => {
        setTimeout(() => {
          setLoadingProgress(((i + 1) / steps.length) * 100);
          resolve();
        }, steps[i].duration);
      });
    }

    setIsLoading(false);
    setIsPerformanceStarted(true);
    setIsPlaying(true);
    showToast("🎭 Pertunjukan dimulai! Selamat menikmati wayang virtual.");
  }, [selectedStory]);

  // Enhanced toast system
  const showToast = useCallback((message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  // Enhanced performance controls
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    showToast(isPlaying ? "⏸️ Pertunjukan dijeda" : "▶️ Pertunjukan dilanjutkan");
  }, [isPlaying, showToast]);

  const handleSeek = useCallback((time) => {
    setCurrentTime(time);
    showToast(`⏩ Melompat ke ${formatTime(time)}`);
  }, [showToast]);

  const handleSceneChange = useCallback((sceneNumber) => {
    setCurrentScene(sceneNumber);
    setCurrentTime((sceneNumber / totalScenes) * totalTime);
    showToast(`🎬 Beralih ke adegan ${sceneNumber}`);
  }, [totalScenes, totalTime, showToast]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    showToast(newVolume === 0 ? "🔇 Volume dimatikan" : `🔊 Volume: ${Math.round(newVolume * 100)}%`);
  }, [showToast]);

  const handleToggleSubtitles = useCallback(() => {
    setShowSubtitles(prev => !prev);
    showToast(showSubtitles ? "📝 Subtitle dimatikan" : "📝 Subtitle diaktifkan");
  }, [showSubtitles, showToast]);

  const handleToggleEducationalOverlay = useCallback(() => {
    setShowEducationalOverlay(prev => !prev);
    showToast(showEducationalOverlay ? "🧠 Mode edukasi dimatikan" : "🧠 Mode edukasi diaktifkan");
  }, [showEducationalOverlay, showToast]);

  const handleOpenVoiceTraining = useCallback(() => {
    setIsVoiceTrainingOpen(true);
    showToast("🎤 Panel pelatihan suara dibuka");
  }, [showToast]);

  const handleCloseVoiceTraining = useCallback(() => {
    setIsVoiceTrainingOpen(false);
    showToast("🎤 Panel pelatihan suara ditutup");
  }, [showToast]);

  const handleQualityChange = useCallback((quality) => {
    setPerformanceQuality(quality);
    showToast(`⚡ Kualitas: ${getQualityLabel(quality)}`);
  }, [showToast]);

  // Fungsi tombol kembali
  const handleBackToStorySelection = useCallback(() => {
    setIsPerformanceStarted(false);
    setIsPlaying(false);
    setCurrentScene(1);
    setCurrentTime(0);
    showToast("🏠 Kembali ke pemilihan cerita");
  }, [showToast]);

  const handleBackToHome = useCallback(() => {
    navigate("/");
    showToast("🏠 Kembali ke halaman utama");
  }, [navigate, showToast]);

  const getQualityLabel = (quality) => {
    const labels = { low: "Rendah", medium: "Sedang", high: "Tinggi", ultra: "Ultra" };
    return labels[quality] || "Tinggi";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPerformanceStarted && e.code !== "Escape") return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (isPerformanceStarted) handlePlayPause();
          break;
        case "ArrowLeft":
          if (isPerformanceStarted) handleSeek(Math.max(0, currentTime - 10));
          break;
        case "ArrowRight":
          if (isPerformanceStarted) handleSeek(Math.min(totalTime, currentTime + 10));
          break;
        case "KeyS":
          if (isPerformanceStarted) handleToggleSubtitles();
          break;
        case "KeyI":
          if (isPerformanceStarted) handleToggleEducationalOverlay();
          break;
        case "KeyH":
          setIsHelpVisible(prev => !prev);
          break;
        case "KeyB":
          if (isPerformanceStarted) handleBackToStorySelection();
          break;
        case "Escape":
          if (isVoiceTrainingOpen) handleCloseVoiceTraining();
          else if (showEducationalOverlay) setShowEducationalOverlay(false);
          else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
          else if (isHelpVisible) setIsHelpVisible(false);
          else if (isPerformanceStarted) handleBackToStorySelection();
          break;
      }
    };

    

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPerformanceStarted, currentTime, totalTime, isVoiceTrainingOpen, showEducationalOverlay, isMobileMenuOpen, isHelpVisible]);

  // Enhanced loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 backdrop-blur-4xl rounded-3xl border-2 border-amber-500/40 p-8 max-w-md w-full text-center shadow-2xl relative z-10"
        >
          {/* Tombol Kembali di Loading Screen */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleBackToStorySelection}
            className="absolute top-4 left-4 p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-colors z-20"
          >
            <Icon name="ArrowLeft" size={20} className="text-amber-300" />
          </motion.button>

          {/* 🎭 Animated Wayang Silhouette as Image */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <div className="relative">
              {/* Ganti Icon dengan gambar wayang */}
              <motion.img
                src="img/4.svg"  // 👉 ganti sesuai path gambarmu
                alt="Wayang Silhouette"
                className="mx-auto w-[120px] h-auto opacity-90 drop-shadow-lg pointer-events-none select-none"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Glow effect di belakang gambar */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full"
              />
            </div>
          </motion.div>


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-amber-300 mb-3 font-cultural drop-shadow-lg"
          >
            Mempersiapkan Pertunjukan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-amber-200/90 mb-6 text-lg min-h-[24px]"
          >
            {loadingProgress < 20 && "🎭 Mempersiapkan panggung wayang..."}
            {loadingProgress >= 20 && loadingProgress < 40 && "👥 Memuat karakter dan properti..."}
            {loadingProgress >= 40 && loadingProgress < 60 && "🎵 Menyiapkan audio gamelan..."}
            {loadingProgress >= 60 && loadingProgress < 80 && "💡 Mengatur pencahayaan panggung..."}
            {loadingProgress >= 80 && loadingProgress < 100 && "✨ Finalisasi pertunjukan..."}
            {loadingProgress === 100 && "✅ Siap! Memulai pertunjukan..."}
          </motion.p>

          {/* Enhanced Progress Bar */}
          <div className="w-full bg-amber-900/40 rounded-full h-4 mb-4 overflow-hidden shadow-inner border border-amber-500/20">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                animate={{ x: [-100, 400] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
              />
            </motion.div>
          </div>

          <div className="flex justify-between text-sm text-amber-200/80 font-medium mb-2">
            <span>0%</span>
            <span className="text-amber-300 font-bold">{Math.round(loadingProgress)}%</span>
            <span>100%</span>
          </div>

          {/* Story Preview */}
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon name={performanceData[selectedStory].icon} size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-amber-300 font-semibold">{performanceData[selectedStory].title}</p>
                  <p className="text-amber-200/80 text-sm">{performanceData[selectedStory].duration}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading Tips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-xl border border-amber-500/30"
          >
            <p className="text-sm text-amber-200/90 flex items-center justify-center gap-2">
              <Icon name="Keyboard" size={16} />
              Tekan ESC untuk kembali ke pemilihan cerita
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Story selection screen
  if (!isPerformanceStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* 🎨 Enhanced Animated Background with Image Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Layer gradient animasi */}
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)
      `,
                backgroundSize: "60% 60%, 60% 60%, 60% 60%",
              }}
            />

            {/* Layer gambar dekoratif */}
            <motion.img
              src="img/4.svg"   // 👉 ganti dengan path gambar kamu
              alt="Wayang Silhouette"
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] opacity-30 pointer-events-none select-none"
            />

            {/* Bisa tambahkan multiple img untuk variasi */}
            <motion.img
              src="/assets/bg-batik.png"
              alt="Batik Motif"
              initial={{ opacity: 0.1, y: 50 }}
              animate={{ opacity: [0.1, 0.25, 0.1], y: [50, 30, 50] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[300px] opacity-20 pointer-events-none select-none"
            />
          </div>


          {/* 🌸 Floating Wayang Images */}
          {[...Array(8)].map((_, i) => (
            <motion.img
              key={i}
              src={`img/4.svg`} // 👉 ganti sesuai gambar kamu
              alt="Wayang Floating"
              className="absolute opacity-25 pointer-events-none select-none"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + Math.sin(i) * 60}%`,
                width: `${40 + i * 5}px`
              }}
            />
          ))}

        </div>

        <Header
          title="Teater Virtual Dalang"
          subtitle="Pengalaman Wayang Interaktif"
          showBackButton={true}
          onBackClick={handleBackToHome}
          className="relative z-10"
        />

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="mb-6"
            >
              <div className="relative inline-block">
                {/* Ganti Icon dengan gambar */}
                <motion.img
                  src="img/4.svg"  // 👉 ganti path sesuai file gambar kamu
                  alt="Wayang Silhouette"
                  className="w-[120px] h-auto mx-auto drop-shadow-2xl opacity-90 pointer-events-none select-none"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Glow effect di belakang wayang */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full"
                />
              </div>
            </motion.div>


            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-amber-300 mb-6 font-cultural drop-shadow-2xl leading-tight"
            >
              Wayang Virtual
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-amber-200/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Jelajahi keajaiban wayang kulit melalui pengalaman digital interaktif.
              Pilih cerita favorit Anda dan nikmati pertunjukan wayang dengan kontrol penuh.
            </motion.p>
          </motion.div>

          {/* Enhanced Story Selection */}
          <StorySelector
            stories={performanceData}
            selectedStory={selectedStory}
            onStorySelect={setSelectedStory}
            onStartPerformance={simulateLoading}
          />

          {/* Enhanced Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto"
          >
            {[
              {
                icon: "Move",
                title: "Kontrol Interaktif",
                description: "Kontrol wayang secara real-time dengan gesture dan suara",
                color: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: "Volume2",
                title: "Audio Immersive",
                description: "Pengalaman audio 3D dengan gamelan tradisional dan efek spatial",
                color: "from-green-500 to-emerald-500",
                delay: 0.1
              },
              {
                icon: "BookOpen",
                title: "Mode Edukasi",
                description: "Pelajari filosofi dan makna budaya di setiap adegan",
                color: "from-purple-500 to-pink-500",
                delay: 0.2
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: feature.delay }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center 
                         hover:border-amber-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center 
                              justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-lg`}>
                  <Icon name={feature.icon} size={32} className="text-white" />
                </div>

                <h3 className="font-bold text-amber-200 mb-4 text-xl relative z-10">{feature.title}</h3>
                <p className="text-amber-200/80 text-base leading-relaxed relative z-10">{feature.description}</p>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Start Button for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-sm px-4"
          >
            <div className="bg-black/70 backdrop-blur-2xl rounded-2xl border border-amber-500/30 p-4 shadow-2xl">
              <div className="flex gap-3 items-center justify">
                {/* Tombol Kembali untuk Mobile */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBackToHome}
                  className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} className="text-amber-300" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => selectedStory && simulateLoading()}
                  disabled={!selectedStory}
                  className={`flex-1 py-4 rounded-xl border-2 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${selectedStory
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
                      : 'bg-gray-600/50 border-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  <Icon name="Play" size={20} />
                  <span>Mulai Pertunjukan</span>
                </motion.button>
              </div>

              {!selectedStory && (
                <p className="text-amber-200/70 text-xs text-center mt-2">Pilih cerita terlebih dahulu</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main performance interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
          >
            <div className="bg-black/90 backdrop-blur-3xl border-2 border-amber-500/50 rounded-2xl px-6 py-4 shadow-2xl">
              <p className="text-amber-200 font-medium flex items-center justify-center space-x-3 text-center">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl"
                >
                  {toastMessage.split(' ')[0]}
                </motion.span>
                <span className="text-lg">{toastMessage.split(' ').slice(1).join(' ')}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-3xl border-b border-amber-500/30"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {/* Tombol Kembali untuk Mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBackToStorySelection}
              className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
            >
              <Icon name="ArrowLeft" size={24} className="text-amber-300" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} className="text-amber-300" />
            </motion.button>
          </div>

          <div className="text-center flex-1 mx-4">
            <h1 className="text-xl font-bold text-amber-300 font-cultural truncate">
              {performanceData[selectedStory]?.title}
            </h1>
            <p className="text-amber-200/80 text-sm">Adegan {currentScene}/{totalScenes}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBackToHome}
            className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors"
          >
            <Icon name="Home" size={24} className="text-red-300" />
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/95 backdrop-blur-3xl border-b border-amber-500/30 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {[
                  { icon: isPlaying ? "Pause" : "Play", label: isPlaying ? "Jeda" : "Main", action: handlePlayPause },
                  { icon: "Subtitles", label: "Subtitle", action: handleToggleSubtitles, active: showSubtitles },
                  { icon: "Info", label: "Mode Edukasi", action: handleToggleEducationalOverlay, active: showEducationalOverlay },
                  { icon: "Mic", label: "Latihan Suara", action: handleOpenVoiceTraining },
                  { icon: "ArrowLeft", label: "Kembali ke Cerita", action: handleBackToStorySelection },
                  { icon: "Home", label: "Ke Halaman Utama", action: handleBackToHome }
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.action}
                    className={`flex items-center space-x-4 w-full p-4 rounded-xl transition-all duration-200 ${item.active
                        ? 'bg-amber-500/20 border border-amber-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                      }`}
                  >
                    <Icon name={item.icon} size={22} className="text-amber-300" />
                    <span className="text-amber-200 font-medium text-lg">{item.label}</span>
                    {item.active && (
                      <div className="w-2 h-2 bg-amber-400 rounded-full ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Desktop Header */}

      <div className="container mx-auto px-4 py-6 relative z-20 pt-20 lg:pt-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Stage Area */}
          <div className="lg:col-span-3">
            <TheaterStage
              selectedStory={selectedStory}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              currentScene={currentScene}
              onSceneChange={handleSceneChange}
              showEducationalOverlay={showEducationalOverlay}
              onToggleOverlay={handleToggleEducationalOverlay}
              isMobile={window.innerWidth < 1024}
            />
          </div>

          {/* Enhanced Side Panel - Desktop Only */}
          <div className="hidden lg:block space-y-6">
            {/* Subtitle Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SubtitleDisplay
                currentScene={currentScene}
                showSubtitles={showSubtitles}
                story={selectedStory}
              />
            </motion.div>

            {/* Enhanced Quick Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/60 backdrop-blur-3xl rounded-3xl border-2 border-amber-500/30 p-6"
            >
              <h4 className="font-bold text-amber-300 mb-6 text-xl flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Kontrol Cepat
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: isPlaying ? "Pause" : "Play",
                    label: isPlaying ? "Jeda" : "Main",
                    action: handlePlayPause,
                    color: "amber",
                    active: isPlaying
                  },
                  {
                    icon: "Subtitles",
                    label: "Subtitle",
                    action: handleToggleSubtitles,
                    color: "blue",
                    active: showSubtitles
                  },
                  {
                    icon: "Info",
                    label: "Edukasi",
                    action: handleToggleEducationalOverlay,
                    color: "green",
                    active: showEducationalOverlay
                  },
                  {
                    icon: "Mic",
                    label: "Suara",
                    action: handleOpenVoiceTraining,
                    color: "purple"
                  }
                ].map((button, index) => (
                  <motion.button
                    key={button.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={button.action}
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center justify-center space-y-3 transition-all duration-200 relative overflow-hidden ${button.active
                        ? `bg-${button.color}-500/20 border-${button.color}-500/50 shadow-lg shadow-${button.color}-500/20`
                        : `bg-white/5 border-white/10 hover:border-${button.color}-500/30`
                      }`}
                  >
                    {/* Active Indicator */}
                    {button.active && (
                      <div className={`absolute top-2 right-2 w-3 h-3 bg-${button.color}-400 rounded-full animate-pulse`} />
                    )}

                    <Icon name={button.icon} size={24} className={`text-${button.color}-300`} />
                    <span className={`text-${button.color}-200 font-semibold text-sm`}>{button.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tombol Kembali di Side Panel */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToStorySelection}
                className="w-full mt-4 p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 rounded-xl text-amber-300 font-semibold flex items-center justify-center gap-2 hover:border-amber-500/50 transition-all duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
                Kembali ke Pemilihan Cerita
              </motion.button>
            </motion.div>

            {/* Enhanced Scene Navigator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/60 backdrop-blur-3xl rounded-3xl border-2 border-amber-500/30 p-6"
            >
              <h4 className="font-bold text-amber-300 mb-6 text-xl flex items-center gap-2">
                <Icon name="Layout" size={20} />
                Navigasi Adegan
              </h4>
              <div className="grid grid-cols-5 gap-3">
                {[...Array(totalScenes)].map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSceneChange(index + 1)}
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold transition-all duration-200 ${currentScene === index + 1
                        ? 'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/30'
                        : 'bg-white/5 border-white/10 text-amber-200 hover:border-amber-500/50'
                      }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Bottom Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-3xl border-t border-amber-500/30 p-4 z-30"
        >
          <div className="container mx-auto">
            {/* Enhanced Progress Bar */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-amber-300 font-mono text-sm min-w-[50px]">
                {formatTime(currentTime)}
              </span>

              <div className="flex-1 relative group">
                <div className="w-full bg-amber-900/40 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full relative"
                    style={{ width: `${(currentTime / totalTime) * 100}%` }}
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white/30"
                    />
                  </motion.div>
                </div>

                {/* Enhanced Seek Tooltip */}
                <div className="absolute inset-y-0 left-0 right-0">
                  <input
                    type="range"
                    min="0"
                    max={totalTime}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>

                <div className="absolute top-full mt-2 left-0 right-0 hidden group-hover:block">
                  <div className="bg-black/90 border border-amber-500/50 rounded-lg px-3 py-1 text-center">
                    <span className="text-amber-200 text-sm font-mono">
                      {formatTime(currentTime)} / {formatTime(totalTime)}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-amber-300 font-mono text-sm min-w-[50px]">
                {formatTime(totalTime)}
              </span>
            </div>

            {/* Enhanced Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Tombol Kembali untuk Desktop */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToStorySelection}
                  className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl hover:bg-amber-500/30 transition-colors flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={18} className="text-amber-300" />
                  <span className="text-amber-200 text-sm font-medium">Kembali</span>
                </motion.button>

                {/* Enhanced Play/Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-200"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} className="text-white" />
                </motion.button>

                {/* Enhanced Volume Control */}
                <div className="flex items-center space-x-2 bg-white/5 rounded-2xl px-4 py-2">
                  <Icon name={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"}
                    size={20} className="text-amber-300" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-24 accent-amber-500"
                  />
                </div>

                {/* Enhanced Scene Navigation */}
                <div className="flex items-center space-x-2 bg-white/5 rounded-2xl px-4 py-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSceneChange(Math.max(1, currentScene - 1))}
                    disabled={currentScene <= 1}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30"
                  >
                    <Icon name="SkipBack" size={18} className="text-amber-300" />
                  </motion.button>

                  <span className="text-amber-300 font-medium min-w-[60px] text-center">
                    {currentScene}/{totalScenes}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSceneChange(Math.min(totalScenes, currentScene + 1))}
                    disabled={currentScene >= totalScenes}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30"
                  >
                    <Icon name="SkipForward" size={18} className="text-amber-300" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Enhanced Quality Selector */}
                <select
                  value={performanceQuality}
                  onChange={(e) => handleQualityChange(e.target.value)}
                  className="bg-black/50 border border-amber-500/30 rounded-xl px-4 py-2 text-amber-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="low">Kualitas: Rendah</option>
                  <option value="medium">Kualitas: Sedang</option>
                  <option value="high">Kualitas: Tinggi</option>
                  <option value="ultra">Kualitas: Ultra</option>
                </select>

                {/* Enhanced Help Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsHelpVisible(true)}
                  className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors"
                >
                  <Icon name="HelpCircle" size={20} className="text-amber-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Voice Training Panel */}
      <AnimatePresence>
        {isVoiceTrainingOpen && (
          <VoiceTrainingPanel
            onClose={handleCloseVoiceTraining}
            isOpen={isVoiceTrainingOpen}
            story={selectedStory}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Help Modal */}
      <AnimatePresence>
        {isHelpVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-50 flex items-center justify-center p-4"
            onClick={() => setIsHelpVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 border-2 border-amber-500/50 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-amber-300 font-cultural">Bantuan & Shortcut</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsHelpVisible(false)}
                  className="p-2 rounded-xl hover:bg-amber-500/20 transition-colors"
                >
                  <Icon name="X" size={24} className="text-amber-300" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center gap-2">
                    <Icon name="Keyboard" size={20} />
                    Shortcut Keyboard
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: "Spasi", action: "Play/Pause pertunjukan" },
                      { key: "← →", action: "Geser 10 detik" },
                      { key: "S", action: "Toggle subtitle" },
                      { key: "I", action: "Toggle mode edukasi" },
                      { key: "B", action: "Kembali ke pemilihan cerita" },
                      { key: "H", action: "Bantuan (tutup dengan ESC)" },
                      { key: "ESC", action: "Tutup modal/menu/kembali" }
                    ].map((shortcut, index) => (
                      <div key={shortcut.key} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                        <span className="text-amber-200/90">{shortcut.action}</span>
                        <kbd className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg font-mono text-sm border border-amber-500/30">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center gap-2">
                    <Icon name="Info" size={20} />
                    Tips Penggunaan
                  </h4>
                  <ul className="space-y-2 text-amber-200/90">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      Gunakan tombol kembali (←) untuk kembali ke pemilihan cerita
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      Tekan ESC atau B untuk shortcut kembali yang cepat
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      Tombol Home akan membawa Anda ke halaman utama
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back Button untuk Desktop */}

    </div>
  );
};

export default VirtualDalangTheaterPerformanceExperience;