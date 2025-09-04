import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const PerformanceControls = ({
  isPlaying,
  onPlayPause,
  currentTime,
  totalTime,
  onSeek,
  currentScene,
  totalScenes,
  onSceneChange,
  volume,
  onVolumeChange,
  showSubtitles,
  onToggleSubtitles,
  onOpenVoiceTraining,
  onToggleEducationalOverlay,
  showEducationalOverlay,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, "0")}`;
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5];
    const currentIndex = speeds?.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds?.length;
    setPlaybackSpeed(speeds?.[nextIndex]);
  };

  const progressPercentage =
    totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  return (
    <div className="bg-card/95 backdrop-blur-cultural border-t border-border p-5 space-y-5 rounded-t-2xl shadow-lg">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>
            Scene {currentScene} / {totalScenes}
          </span>
          <span>
            {formatTime(currentTime)} / {formatTime(totalTime)}
          </span>
        </div>

        <div className="relative">
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary via-cultural-gold to-primary rounded-full shadow-inner"
            />
          </div>

        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between">
        {/* Left Controls - Scene Navigation */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="SkipBack"
            onClick={() => onSceneChange(Math.max(1, currentScene - 1))}
            disabled={currentScene === 1}
            className="text-muted-foreground hover:text-foreground"
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="Rewind"
            onClick={() => onSeek(Math.max(0, currentTime - 10))}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Center Controls - Play/Pause */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onPlayPause}
            className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural w-16 h-16 rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              // Pause Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              // Play Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 3v18l15-9-15-9z" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Right Controls - Scene Navigation */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="FastForward"
            onClick={() => onSeek(Math.min(totalTime, currentTime + 10))}
            className="text-muted-foreground hover:text-foreground"
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="SkipForward"
            onClick={() =>
              onSceneChange(Math.min(totalScenes, currentScene + 1))
            }
            disabled={currentScene === totalScenes}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>

      {/* Advanced Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {/* Left Side - Audio & Display */}
        <div className="flex items-center space-x-3">
          {/* Volume Control */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName={
                volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"
              }
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="text-muted-foreground hover:text-foreground"
            />

            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-lg p-3 shadow-puppet"
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Volume1"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) =>
                        onVolumeChange(parseInt(e?.target?.value))
                      }
                      className="w-24 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-muted-foreground w-8">
                      {volume}%
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitles Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Subtitles"
            onClick={onToggleSubtitles}
            className={`${
              showSubtitles ? "text-primary" : "text-muted-foreground"
            } hover:text-foreground`}
          />

          {/* Playback Speed */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSpeedChange}
            className="text-muted-foreground hover:text-foreground text-xs font-mono"
          >
            {playbackSpeed}x
          </Button>
        </div>

        {/* Right Side - Learning Features */}
        <div className="flex items-center space-x-3">
          {/* Educational Overlay Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Info"
            onClick={onToggleEducationalOverlay}
            className={`${
              showEducationalOverlay ? "text-primary" : "text-muted-foreground"
            } hover:text-foreground`}
          />

          {/* Voice Training */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Mic"
            onClick={onOpenVoiceTraining}
            className="text-muted-foreground hover:text-foreground"
          />

          {/* Share Performance */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Wayang Interactive Performance",
                  text: "Check out this amazing wayang performance experience!",
                  url: window.location?.href,
                });
              } else {
                navigator.clipboard?.writeText(window.location?.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="text-muted-foreground hover:text-foreground"
          />

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Maximize"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement?.requestFullscreen();
              }
            }}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>

      {/* Scene Indicators */}
      <div className="flex items-center justify-center space-x-2 pt-3">
        {Array.from({ length: totalScenes }, (_, index) => (
          <motion.button
            key={index + 1}
            whileHover={{ scale: 1.3 }}
            onClick={() => onSceneChange(index + 1)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentScene === index + 1
                ? "bg-primary scale-125 shadow-cultural"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PerformanceControls;
