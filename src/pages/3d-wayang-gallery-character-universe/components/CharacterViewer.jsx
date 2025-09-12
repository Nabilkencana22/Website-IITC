import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import { motion, AnimatePresence } from "framer-motion";

const CharacterViewer = ({ character, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [scale, setScale] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const viewerRef = useRef(null);

  const tabs = [
    { id: "overview", label: "Gambaran Umum", icon: "Info" },
    { id: "stories", label: "Kisah & Cerita", icon: "BookOpen" },
    { id: "family", label: "Pohon Keluarga", icon: "Users" },
    { id: "symbolism", label: "Simbolisme", icon: "Eye" },
  ];

  // Auto-rotation effect
  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetView = () => {
    setScale(1);
    setRotationAngle(0);
    setIsRotating(false);
  };

  const handleRotationToggle = () => {
    setIsRotating(!isRotating);
  };

  const handleAudioPlay = () => {
    setAudioPlaying(!audioPlaying);
    // Mock audio functionality
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 text-amber-100">
                Profil Karakter
              </h4>
              <p className="text-amber-200/90 leading-relaxed mb-6 text-base">
                {character?.fullDescription}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-900/30 border border-amber-700/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm text-amber-300/80 mb-2">
                    Tipe Karakter
                  </div>
                  <div className="font-semibold text-amber-100 capitalize">
                    {character?.type}
                  </div>
                </div>
                <div className="bg-amber-900/30 border border-amber-700/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm text-amber-300/80 mb-2">
                    Popularitas
                  </div>
                  <div className="font-semibold text-amber-100">
                    {character?.popularity}%
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 text-amber-100">
                Ajaran Filsafat
              </h4>
              <div className="space-y-4">
                {character?.teachings?.map((teaching, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-amber-900/20 border border-amber-700/20 rounded-xl backdrop-blur-sm hover:bg-amber-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-amber-700/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Quote" size={18} className="text-amber-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-100 font-medium mb-2 text-base">
                        {teaching?.principle}
                      </p>
                      <p className="text-amber-200/80 text-sm leading-relaxed">
                        {teaching?.explanation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "stories":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg mb-4 text-amber-100">
              Penampilan dalam Cerita
            </h4>
            {character?.storyAppearances?.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-amber-700/30 rounded-xl p-4 bg-amber-900/20 backdrop-blur-sm hover:bg-amber-900/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h5 className="font-semibold text-amber-100 text-base">
                    {story?.title}
                  </h5>
                  <span className="text-xs bg-amber-700/40 text-amber-200 px-3 py-1 rounded-full">
                    {story?.origin}
                  </span>
                </div>
                <p className="text-amber-200/80 text-sm mb-4 leading-relaxed">
                  {story?.role}
                </p>
                <div className="flex items-center space-x-4 text-xs text-amber-300/80">
                  <div className="flex items-center space-x-2 bg-amber-900/40 rounded-full px-3 py-1.5">
                    <Icon name="Clock" size={12} className="text-amber-300" />
                    <span>{story?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-amber-900/40 rounded-full px-3 py-1.5">
                    <Icon name="Users" size={12} className="text-amber-300" />
                    <span>{story?.otherCharacters} Karakter</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "family":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg mb-4 text-amber-100">
              Koneksi Keluarga
            </h4>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-amber-950 font-bold text-2xl">
                    {character?.name?.charAt(0)}
                  </span>
                </div>
                <div className="font-semibold text-amber-100 text-lg">
                  {character?.name}
                </div>
              </div>

              <div className="space-y-3">
                {character?.familyTree?.map((relation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-amber-900/30 rounded-lg border border-amber-700/20 hover:bg-amber-900/40 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-800/40 rounded-full flex items-center justify-center shadow-inner">
                        <span className="text-amber-300 font-semibold text-sm">
                          {relation?.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-amber-100">
                          {relation?.name}
                        </div>
                        <div className="text-xs text-amber-300/80">
                          {relation?.relationship}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-400 hover:text-amber-300 hover:bg-amber-800/30"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "symbolism":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg mb-4 text-amber-100">
              Simbolisme Budaya
            </h4>
            {character?.symbolism?.map((symbol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-amber-700/30 rounded-xl p-5 bg-amber-900/20 backdrop-blur-sm hover:bg-amber-900/30 transition-colors"
              >
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 bg-amber-800/40 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Icon
                      name={symbol?.icon}
                      size={24}
                      className="text-amber-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-amber-100 text-base mb-2">
                      {symbol?.element}
                    </h5>
                    <p className="text-amber-200/80 text-sm mb-4 leading-relaxed">
                      {symbol?.meaning}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-amber-700/40 text-amber-200 px-3 py-1.5 rounded-full">
                        {symbol?.significance}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-amber-950/10 backdrop-blur-xl z-50 overflow-y-auto"
    >
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 p-4 bg-amber-900/30 rounded-2xl border border-amber-700/30 backdrop-blur-md"
          >
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-amber-300 hover:text-amber-100 hover:bg-amber-800/30 rounded-xl"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-cultural font-bold text-amber-100">
                  {character?.name}
                </h1>
                <p className="text-amber-300/80">
                  {character?.type} • {character?.origins?.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-amber-300 hover:text-amber-100 hover:bg-amber-800/30 rounded-xl"
              >
                <Icon name="Share" size={18} />
              </Button>
              <Button
                variant="ghost"
                className="text-amber-300 hover:text-amber-100 hover:bg-amber-800/30 rounded-xl"
              >
                <Icon name="Heart" size={18} />
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div
                ref={viewerRef}
                className="relative bg-gradient-to-br from-amber-900/40 to-amber-800/30 rounded-2xl aspect-square overflow-hidden border border-amber-700/30 shadow-2xl"
              >
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-amber-800/20 animate-pulse rounded-2xl" />
                )}

                <Image
                  src={character?.image}
                  alt={character?.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: `rotate(${rotationAngle}deg) scale(${scale})`,
                  }}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Viewer Controls */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-3 bg-amber-900/80 backdrop-blur-md rounded-full px-4 py-2 border border-amber-700/50 shadow-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomIn}
                      className="text-amber-300 hover:text-amber-100 hover:bg-amber-800/50"
                    >
                      <Icon name="ZoomIn" size={18} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomOut}
                      className="text-amber-300 hover:text-amber-100 hover:bg-amber-800/50"
                    >
                      <Icon name="ZoomOut" size={18} />
                    </Button>
                  </div>
                </div>

                {/* Audio Play Button */}
                <div className="absolute top-5 right-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAudioPlay}
                    className={`backdrop-blur-md rounded-full border ${
                      audioPlaying
                        ? "bg-amber-500/80 border-amber-400/50 text-white"
                        : "bg-amber-900/80 border-amber-700/50 text-amber-300 hover:text-amber-100"
                    }`}
                  >
                    <Icon
                      name={audioPlaying ? "Volume2" : "Volume"}
                      size={20}
                      className={audioPlaying ? "animate-pulse" : ""}
                    />
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    value: character?.storyCount,
                    label: "Cerita",
                    icon: "BookOpen",
                  },
                  {
                    value: character?.familyConnections,
                    label: "Hubungan",
                    icon: "Users",
                  },
                  {
                    value: `${character?.popularity}%`,
                    label: "Popularitas",
                    icon: "Star",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-amber-900/30 border border-amber-700/30 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-amber-900/40 transition-colors"
                  >
                    <div className="text-2xl font-bold text-amber-300 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-amber-300/80 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Tabs */}
              <div className="border-b border-amber-700/30">
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-5 py-3 text-sm font-medium border-b-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "border-amber-400 text-amber-100 bg-amber-900/30 rounded-t-lg"
                          : "border-transparent text-amber-300/80 hover:text-amber-100 hover:bg-amber-900/20"
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[500px] overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterViewer;
