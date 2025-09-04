import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import components
import TheaterStage from './components/TheaterStage';
import StorySelector from './components/StorySelector';
import VoiceTrainingPanel from './components/VoiceTrainingPanel';
import PerformanceControls from './components/PerformanceControls';
import SubtitleDisplay from './components/SubtitleDisplay';

const VirtualDalangTheaterPerformanceExperience = () => {
  // Performance state
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPerformanceStarted, setIsPerformanceStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(480); // 8 minutes default
  const [volume, setVolume] = useState(75);
  
  // UI state
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false);
  const [showVoiceTraining, setShowVoiceTraining] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('arjuna');
  const [userProgress, setUserProgress] = useState({
    completedStories: [],
    voiceTrainingScores: {},
    totalWatchTime: 0
  });

  // Story configurations
  const storyConfigs = {
    bharatayuddha: { scenes: 3, duration: 780 }, // 13 minutes
    ramayana: { scenes: 3, duration: 660 }, // 11 minutes
    folklore: { scenes: 2, duration: 480 } // 8 minutes
  };

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (isPlaying && isPerformanceStarted) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
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

  // Update total time when story changes
  useEffect(() => {
    if (selectedStory && storyConfigs?.[selectedStory]) {
      setTotalTime(storyConfigs?.[selectedStory]?.duration);
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    setCurrentTime(Math.max(0, Math.min(totalTime, time)));
  };

  const handleSceneChange = (sceneNumber) => {
    const config = storyConfigs?.[selectedStory];
    if (config && sceneNumber >= 1 && sceneNumber <= config?.scenes) {
      setCurrentScene(sceneNumber);
      // Calculate approximate time for scene
      const sceneTime = ((sceneNumber - 1) / config?.scenes) * totalTime;
      setCurrentTime(sceneTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleToggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };

  const handleToggleEducationalOverlay = () => {
    setShowEducationalOverlay(!showEducationalOverlay);
  };

  const handleOpenVoiceTraining = () => {
    setShowVoiceTraining(true);
    setIsPlaying(false);
  };

  const handleCloseVoiceTraining = () => {
    setShowVoiceTraining(false);
  };

  const handlePerformanceComplete = () => {
    if (selectedStory && !userProgress?.completedStories?.includes(selectedStory)) {
      setUserProgress(prev => ({
        ...prev,
        completedStories: [...prev?.completedStories, selectedStory],
        totalWatchTime: prev?.totalWatchTime + totalTime
      }));
    }
  };

  const getTotalScenes = () => {
    return selectedStory ? storyConfigs?.[selectedStory]?.scenes || 1 : 1;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {!isPerformanceStarted ? (
          // Story Selection Phase
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  Teater Dalang Virtual
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cultural-gold/20 rounded-lg blur-xl opacity-50"></div>
              </div>

              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Masuklah ke dunia mistis wayang kulit melalui pengalaman teater
                interaktif kami. Kendalikan wayang bayangan tradisional,
                pelajari teknik dalang yang autentik, dan tenggelamkan diri Anda
                dalam bentuk seni bercerita paling berharga di Indonesia.
              </p>

              {/* Quick Stats */}
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} className="text-primary" />
                  <span>
                    {userProgress?.completedStories?.length} cerita selesai
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>
                    {Math.floor(userProgress?.totalWatchTime / 60)} Durasi
                    Tontonan
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Penjelajah Budaya</span>
                </div>
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
              <div className="bg-card border border-border rounded-lg p-6 text-center space-y-3 puppet-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon name="Mic" size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  Pelatihan Suara
                </h3>
                <p className="text-sm text-muted-foreground">
                  Latih teknik suara dalang dengan umpan balik yang didukung AI
                  dan perbandingan rekaman master.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center space-y-3 puppet-hover">
                <div className="w-12 h-12 bg-cultural-gold/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon
                    name="Subtitles"
                    size={24}
                    className="text-cultural-gold"
                  />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  Subtitel Budaya
                </h3>
                <p className="text-sm text-muted-foreground">
                  Subtitel multi-bahasa dengan konteks budaya dan penjelasan
                  filosofis.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center space-y-3 puppet-hover">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon name="Gamepad2" size={24} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  Kontrol Interaktif
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manipulasi karakter boneka dan kontrol kecepatan pertunjukan
                  dengan gerakan intuitif.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Performance Phase
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
                  className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90"
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
          <div className="bg-card/50 border-t border-border mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center space-y-4">
                <h3 className="font-heading font-semibold text-foreground">
                  Lanjutkan Perjalanan Budaya Anda
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/3d-wayang-gallery-character-universe">
                    <Button
                      variant="outline"
                      iconName="Box"
                      iconPosition="left"
                    >
                      Jelajahi Galeri
                    </Button>
                  </Link>
                  <Link to="/gamelan-playground-musical-exploration">
                    <Button
                      variant="outline"
                      iconName="Music"
                      iconPosition="left"
                    >
                      Playground Gamelan
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VirtualDalangTheaterPerformanceExperience;