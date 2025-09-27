import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const StorySelector = ({
  selectedStory,
  onStorySelect,
  onStartPerformance,
}) => {
  const [hoveredStory, setHoveredStory] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const stories = [
    {
      id: "bharatayuddha",
      title: "Bharatayuddha",
      subtitle: "Perang Besar",
      description: `Rasakan pertempuran epik antara saudara Pandawa dan Kurawa.\nSaksikan dilema moral Arjuna dan bimbingan ilahi Krishna.\nPelajari tentang dharma, kewajiban, dan konsekuensi dari perang.`,
      duration: "12-15 Menit",
      difficulty: "Lanjutan",
      scenes: 3,
      characters: ["Arjuna", "Kresna", "Duryudana", "Bima", "Karna"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Wayang_Painting_of_Bharatayudha_Battle.jpg/1920px-Wayang_Painting_of_Bharatayudha_Battle.jpg",
      cultural_context: "Epik sentral dari filosofi Jawa",
      themes: ["Kewajiban vs Keinginan", "Petunjuk Ilahi", "Konflik Moral"],
      popularity: 95,
      year: "Abad ke-10"
    },
    {
      id: "ramayana",
      title: "Ramayana",
      subtitle: "Perjalanan Pangeran",
      description: `Ikuti pencarian Rama untuk menyelamatkan Sita dari raja iblis Rahwana.\nBergabunglah dengan misi heroik Hanuman melintasi lautan.\nTemukan tema kesetiaan, pengabdian, dan kemenangan kebaikan atas kejahatan.`,
      duration: "10-12 Menit",
      difficulty: "Menengah",
      scenes: 3,
      characters: ["Rama", "Sita", "Rahwana", "Hanuman", "Jatayu"],
      image:
        "https://tse1.mm.bing.net/th/id/OIP.5xcJQ4fcRASFoih3fHoryAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      cultural_context: "Kisah tercinta tentang kepahlawanan dan pengabdian",
      themes: ["Cinta & Kesetiaan", "Baik vs Jahat", "Intervensi Ilahi"],
      popularity: 88,
      year: "Abad ke-5"
    },
    {
      id: "folklore",
      title: "Cerita Rakyat Jawa",
      subtitle: "Kebijaksanaan Semar",
      description: `Pelajari pelajaran hidup melalui humor dan kebijaksanaan Semar.\nRasakan nilai-nilai desa tradisional dan harmoni komunitas.\nNikmati cerita ringan yang sempurna untuk memahami humor wayang.`,
      duration: "8-10 Menit",
      difficulty: "Pemula",
      scenes: 2,
      characters: ["Semar", "Gareng", "Petruk", "Bagong"],
      image:
        "https://tse1.mm.bing.net/th/id/OIP.5dZ3k7Bqxip-CghpJ-ZnIAHaE6?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      cultural_context: "Kearifan tradisional melalui komedi",
      themes: ["Nilai Komunitas", "Kebijaksanaan & Humor", "Harmoni Sosial"],
      popularity: 76,
      year: "Tradisional"
    },
  ];

  const handleImageLoad = (storyId) => {
    setLoadedImages(prev => ({ ...prev, [storyId]: true }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Pemula":
        return "from-green-400 to-green-600 shadow-green-500/50";
      case "Menengah":
        return "from-yellow-400 to-yellow-600 shadow-yellow-500/50";
      case "Lanjutan":
        return "from-red-400 to-red-600 shadow-red-500/50";
      default:
        return "from-gray-400 to-gray-600 shadow-gray-500/50";
    }
  };

  const getDifficultyTextColor = (difficulty) => {
    switch (difficulty) {
      case "Pemula":
        return "text-green-400";
      case "Menengah":
        return "text-yellow-400";
      case "Lanjutan":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-heading font-bold text-amber-300">
          Pilih Pertunjukan Anda
        </h2>
        <p className="text-amber-200/90 max-w-3xl mx-auto text-lg leading-relaxed">
          Jelajahi warisan budaya wayang melalui cerita-cerita klasik. Setiap pertunjukan 
          menawarkan pengalaman belajar interaktif yang mendalam tentang filosofi Jawa.
        </p>
      </motion.div>

      {/* Story Cards dengan Animasi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`group relative bg-gradient-to-br from-amber-950/50 to-amber-900/30 border-2 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-sm ${
              selectedStory === story.id
                ? "border-amber-400 shadow-amber-500/25 scale-105"
                : "border-amber-500/30 hover:border-amber-400/50"
            }`}
            onClick={() => onStorySelect(story.id)}
            onMouseEnter={() => setHoveredStory(story.id)}
            onMouseLeave={() => setHoveredStory(null)}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-amber-600/5 z-10" />
            
            {/* Story Image */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <div className="relative h-full w-full">
                {/* Loading Skeleton */}
                {!loadedImages[story.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-900 animate-pulse" />
                )}
                
                <Image
                  src={story.image}
                  alt={story.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    loadedImages[story.id] 
                      ? 'opacity-100 group-hover:scale-110' 
                      : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(story.id)}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Difficulty Badge */}
              <motion.div
                layout
                whileHover={{ scale: 1.15, rotate: [0, 3, -3, 0] }}
                animate={{ 
                  scale: hoveredStory === story.id ? 1.1 : 1,
                  y: hoveredStory === story.id ? -2 : 0
                }}
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-2xl backdrop-blur-md border border-white/20 ${
                  getDifficultyColor(story.difficulty)
                }`}
              >
                <span className="text-white drop-shadow-lg">{story.difficulty}</span>
              </motion.div>

              {/* Popularity Indicator */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-amber-400" />
                  <span className="text-white text-sm font-medium">{story.popularity}%</span>
                </div>
              </div>

              {/* Selection Indicator */}
              <AnimatePresence>
                {selectedStory === story.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Icon name="Check" size={16} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading font-bold text-2xl text-white mb-1 drop-shadow-lg">
                  {story.title}
                </h3>
                <p className="text-amber-300 font-medium text-sm">{story.subtitle}</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6 space-y-4">
              <p className="text-amber-100/90 leading-relaxed line-clamp-3 text-sm">
                {story.description.split("\n")[0]}
              </p>

              {/* Story Stats */}
              <div className="flex items-center justify-between text-sm text-amber-200/80">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{story.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Film" size={14} />
                    <span>{story.scenes} Adegan</span>
                  </span>
                </div>
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{story.characters.length} Karakter</span>
                </span>
              </div>

              {/* Cultural Context */}
              <div className="pt-3 border-t border-amber-500/20">
                <p className="text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wide">
                  Konteks Budaya
                </p>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  {story.cultural_context}
                </p>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-2">
                {story.themes.slice(0, 2).map((theme, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-amber-500/20 text-xs text-amber-300 rounded-full border border-amber-500/30 transition-all duration-300"
                  >
                    {theme}
                  </motion.span>
                ))}
                {story.themes.length > 2 && (
                  <span className="px-3 py-1 bg-amber-500/10 text-xs text-amber-400 rounded-full">
                    +{story.themes.length - 2} Lainnya
                  </span>
                )}
              </div>

              {/* Year Badge */}
              <div className="flex justify-between items-center pt-3">
                <span className="text-xs text-amber-500/80 font-medium">
                  {story.year}
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full"
                >
                  Wayang Kulit
                </motion.div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >

            {/* Tombol Mulai Pertunjukan */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                onClick={onStartPerformance}
                className="px-10 py-4 font-bold text-lg rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
              >
                Mulai Pertunjukan Wayang
              </Button>

              {/* Glow Effect */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-lg -z-10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
      >
        {[
          { icon: "Clock", label: "Total Durasi", value: "30-37 Menit" },
          { icon: "Film", label: "Total Adegan", value: "8 Adegan" },
          { icon: "Users", label: "Karakter", value: "12+ Tokoh" },
          { icon: "Award", label: "Tingkat Kesulitan", value: "Beragam" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="text-center p-4 bg-gradient-to-br from-amber-900/30 to-amber-800/20 rounded-2xl border border-amber-500/20 backdrop-blur-sm"
          >
            <Icon name={stat.icon} size={24} className="text-amber-400 mx-auto mb-2" />
            <div className="text-amber-300 font-bold text-lg">{stat.value}</div>
            <div className="text-amber-200/70 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StorySelector;