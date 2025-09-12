import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";

// Import components
import TheaterStage from "./components/TheaterStage";
import StorySelector from "./components/StorySelector";
import VoiceTrainingPanel from "./components/VoiceTrainingPanel";
import SubtitleDisplay from "./components/SubtitleDisplay";
import { motion, AnimatePresence } from "framer-motion";

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
    bharatayuddha: { scenes: 3, duration: 780, title: "Bharatayuddha" },
    ramayana: { scenes: 3, duration: 660, title: "Ramayana" },
    folklore: { scenes: 2, duration: 480, title: "Cerita Rakyat" },
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
                    {Math.floor(userProgress.totalWatchTime / 60)}m durasi
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

              {/* Floating Control Bar */}
              <AnimatePresence>
                {isPerformanceStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
                  >
                    <div className="bg-background/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl shadow-2xl p-4 flex items-center space-x-4">
                      {/* Play/Pause Button */}
                      <Button
                        variant="ghost"
                        size="lg"
                        iconName={isPlaying ? "Pause" : "Play"}
                        onClick={handlePlayPause}
                        className="w-12 h-12 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-100 transition-all duration-300"
                      />

                      {/* Scene Navigation */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ChevronLeft"
                          onClick={() => handleSceneChange(currentScene - 1)}
                          disabled={currentScene <= 1}
                          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                        />

                        <div className="text-sm text-amber-200 font-medium px-2 py-1 bg-amber-500/20 rounded-lg">
                          Adegan {currentScene}/{getTotalScenes()}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ChevronRight"
                          onClick={() => handleSceneChange(currentScene + 1)}
                          disabled={currentScene >= getTotalScenes()}
                          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                        />
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="Volume2"
                          size={16}
                          className="text-amber-300"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) =>
                            handleVolumeChange(parseInt(e.target.value))
                          }
                          className="w-20 h-1 bg-amber-500/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                      </div>

                      {/* Additional Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={
                            showSubtitles ? "Subtitles" : "SubtitlesOff"
                          }
                          onClick={handleToggleSubtitles}
                          className={`w-10 h-10 rounded-lg ${
                            showSubtitles
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-white/5 text-white/70"
                          } hover:bg-white/10 transition-all duration-300`}
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Mic"
                          onClick={handleOpenVoiceTraining}
                          className="w-10 h-10 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

              {/* Story Title Overlay */}
              <AnimatePresence>
                {isPerformanceStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-4 right-4 z-30"
                  >
                    <div className="bg-background/70 backdrop-blur-md border border-amber-500/30 rounded-xl px-4 py-2">
                      <h3 className="text-amber-300 font-semibold text-sm">
                        {storyConfigs[selectedStory]?.title}
                      </h3>
                      <p className="text-amber-200/80 text-xs">
                        Adegan {currentScene} dari {getTotalScenes()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
