import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";

// Import components
import TheaterStage from "./components/TheaterStage";
import StorySelector from "./components/StorySelector";
import VoiceTrainingPanel from "./components/VoiceTrainingPanel";
import PerformanceControls from "./components/PerformanceControls";
import SubtitleDisplay from "./components/SubtitleDisplay";
import { motion } from "framer-motion";

const VirtualDalangTheaterPerformanceExperience = () => {
  // Performance state
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPerformanceStarted, setIsPerformanceStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(480);
  const [volume, setVolume] = useState(75);

  // UI state
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false);
  const [showVoiceTraining, setShowVoiceTraining] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("arjuna");
  const [userProgress, setUserProgress] = useState({
    completedStories: [],
    voiceTrainingScores: {},
    totalWatchTime: 0,
  });

  const storyConfigs = {
    bharatayuddha: { scenes: 3, duration: 780 },
    ramayana: { scenes: 3, duration: 660 },
    folklore: { scenes: 2, duration: 480 },
  };

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (isPlaying && isPerformanceStarted) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= totalTime) {
            setIsPlaying(false);
            handlePerformanceComplete();
            return totalTime;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPerformanceStarted, totalTime]);

  useEffect(() => {
    if (selectedStory && storyConfigs[selectedStory]) {
      setTotalTime(storyConfigs[selectedStory].duration);
    }
  }, [selectedStory]);

  const handleStorySelect = (storyId) => {
    setSelectedStory(storyId);
    setCurrentScene(1);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleStartPerformance = () => {
    if (selectedStory) {
      setIsPerformanceStarted(true);
      setIsPlaying(true);
      setShowEducationalOverlay(true);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (time) =>
    setCurrentTime(Math.max(0, Math.min(totalTime, time)));
  const handleSceneChange = (sceneNumber) => {
    const config = storyConfigs[selectedStory];
    if (config && sceneNumber >= 1 && sceneNumber <= config.scenes) {
      setCurrentScene(sceneNumber);
      const sceneTime = ((sceneNumber - 1) / config.scenes) * totalTime;
      setCurrentTime(sceneTime);
    }
  };

  const handleVolumeChange = (newVolume) => setVolume(newVolume);
  const handleToggleSubtitles = () => setShowSubtitles(!showSubtitles);
  const handleToggleEducationalOverlay = () =>
    setShowEducationalOverlay(!showEducationalOverlay);
  const handleOpenVoiceTraining = () => {
    setShowVoiceTraining(true);
    setIsPlaying(false);
  };
  const handleCloseVoiceTraining = () => setShowVoiceTraining(false);

  const handlePerformanceComplete = () => {
    if (
      selectedStory &&
      !userProgress.completedStories.includes(selectedStory)
    ) {
      setUserProgress((prev) => ({
        ...prev,
        completedStories: [...prev.completedStories, selectedStory],
        totalWatchTime: prev.totalWatchTime + totalTime,
      }));
    }
  };

  const getTotalScenes = () =>
    selectedStory ? storyConfigs[selectedStory]?.scenes || 1 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <Header />
      <main className="pt-16">
        {!isPerformanceStarted ? (
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-12 relative">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-heading font-bold text-foreground relative z-10 drop-shadow-lg"
              >
                Teater Dalang Virtual
              </motion.h1>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cultural-gold/20 rounded-lg blur-xl opacity-50 z-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed relative z-10"
              >
                Masuklah ke dunia mistis wayang kulit melalui pengalaman teater
                interaktif kami. Kendalikan wayang bayangan tradisional,
                pelajari teknik dalang yang autentik, dan tenggelamkan diri Anda
                dalam seni bercerita paling berharga di Indonesia.
              </motion.p>

              {/* Quick Stats */}
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground mt-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-card/50 backdrop-blur-md rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg"
                >
                  <Icon name="Play" size={16} className="text-primary" />
                  <span>
                    {userProgress.completedStories.length} cerita selesai
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-card/50 backdrop-blur-md rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg"
                >
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>
                    {Math.floor(userProgress.totalWatchTime / 60)} Durasi
                    Tontonan
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-card/50 backdrop-blur-md rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg"
                >
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Penjelajah Budaya</span>
                </motion.div>
              </div>
            </div>

            {/* Story Selector */}
            <StorySelector
              selectedStory={selectedStory}
              onStorySelect={handleStorySelect}
              onStartPerformance={handleStartPerformance}
            />

            {/* Features Preview */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Pelatihan Suara",
                  description:
                    "Latih teknik suara dalang dengan umpan balik AI dan perbandingan rekaman master.",
                  icon: "Mic",
                  iconBg: "bg-primary/20",
                  iconColor: "text-primary",
                },
                {
                  title: "Subtitel Budaya",
                  description:
                    "Subtitel multi-bahasa dengan konteks budaya dan penjelasan filosofis.",
                  icon: "Subtitles",
                  iconBg: "bg-cultural-gold/20",
                  iconColor: "text-cultural-gold",
                },
                {
                  title: "Kontrol Interaktif",
                  description:
                    "Manipulasi karakter boneka dan kontrol kecepatan pertunjukan dengan gerakan intuitif.",
                  icon: "Gamepad2",
                  iconBg: "bg-accent/20",
                  iconColor: "text-accent",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  className="bg-card/70 backdrop-blur-md border border-border rounded-2xl p-6 text-center space-y-4 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mx-auto shadow-inner`}
                  >
                    <Icon
                      name={feature.icon}
                      size={28}
                      className={`${feature.iconColor} animate-pulse`}
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-screen flex flex-col">
            {/* Theater Stage */}
            <div className="flex-1 relative bg-gradient-to-b from-shadow-black to-background">
              <TheaterStage
                selectedStory={selectedStory}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                currentScene={currentScene}
                onSceneChange={handleSceneChange}
                showEducationalOverlay={showEducationalOverlay}
                onToggleOverlay={handleToggleEducationalOverlay}
              />

              {/* Subtitle Display */}
              <SubtitleDisplay
                isVisible={showSubtitles}
                currentTime={currentTime}
                selectedStory={selectedStory}
                currentScene={currentScene}
                language="indonesian"
              />

              {/* Back to Selection Button */}
              <div className="absolute top-4 left-4 z-30">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => {
                    setIsPerformanceStarted(false);
                    setIsPlaying(false);
                    setCurrentTime(0);
                    setCurrentScene(1);
                  }}
                  className="bg-background/70 backdrop-blur-md border border-primary/40 text-foreground hover:bg-background/90 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-cultural rounded-xl px-4 py-2 font-semibold"
                >
                  Kembali ke Cerita
                </Button>
              </div>
            </div>

            {/* Performance Controls */}
            <PerformanceControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              currentTime={currentTime}
              totalTime={totalTime}
              onSeek={handleSeek}
              currentScene={currentScene}
              totalScenes={getTotalScenes()}
              onSceneChange={handleSceneChange}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              showSubtitles={showSubtitles}
              onToggleSubtitles={handleToggleSubtitles}
              onOpenVoiceTraining={handleOpenVoiceTraining}
              onToggleEducationalOverlay={handleToggleEducationalOverlay}
              showEducationalOverlay={showEducationalOverlay}
            />
          </div>
        )}

        {/* Voice Training Panel */}
        <VoiceTrainingPanel
          isOpen={showVoiceTraining}
          onClose={handleCloseVoiceTraining}
          selectedCharacter={selectedCharacter}
        />

        {/* Navigation Footer */}
        {!isPerformanceStarted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card/60 border-t border-border mt-16 backdrop-blur-lg rounded-t-3xl"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="text-center space-y-6">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Lanjutkan Perjalanan Budaya Anda
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <Link to="/3d-wayang-gallery-character-universe">
                    <Button
                      variant="default"
                      iconName="Box"
                      iconPosition="left"
                      className="relative overflow-hidden px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-primary to-cultural-gold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-primary/90 hover:to-cultural-gold/90"
                    >
                      <span className="relative z-10">Jelajahi Galeri</span>
                      <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                  <Link to="/gamelan-playground-musical-exploration">
                    <Button
                      variant="default"
                      iconName="Music"
                      iconPosition="left"
                      className="relative overflow-hidden px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-primary to-cultural-gold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-primary/90 hover:to-cultural-gold/90"
                    >
                      <span className="relative z-10">Playground Gamelan</span>
                      <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default VirtualDalangTheaterPerformanceExperience;
