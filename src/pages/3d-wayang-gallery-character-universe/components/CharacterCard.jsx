import React, { useState, useRef, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const CharacterCard = ({ character, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const audioRef = useRef(null);

  // Handle audio playback
  const handlePlayAudio = (e) => {
    e?.stopPropagation();

    if (!character?.audio) {
      console.warn("Audio tidak tersedia untuk", character?.name);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(character.audio);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => {
        setIsPlaying(false);
        console.error("Error memutar audio");
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Gagal memutar audio:", err);
          setIsPlaying(false);
        });
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Type colors mapping
  const typeColors = {
    hero: {
      bg: "bg-green-500/15",
      text: "text-green-400",
      border: "border-green-400/30",
      icon: "Shield",
    },
    villain: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      border: "border-red-400/30",
      icon: "Skull",
    },
    deity: {
      bg: "bg-amber-500/15",
      text: "text-amber-400",
      border: "border-amber-400/30",
      icon: "Sparkles",
    },
    clown: {
      bg: "bg-purple-500/15",
      text: "text-purple-400",
      border: "border-purple-400/30",
      icon: "Laugh",
    },
    default: {
      bg: "bg-blue-500/15",
      text: "text-blue-400",
      border: "border-blue-400/30",
      icon: "User",
    },
  };

  const characterType = typeColors[character?.type] || typeColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br from-amber-950/50 to-amber-900/30 border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-amber-400 shadow-2xl shadow-amber-500/20 scale-105 border-amber-400/50"
          : "border-amber-600/30 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/50"
      }`}
      onClick={() => onSelect(character)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Character Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-amber-800/20 animate-pulse rounded-none" />
          )}

          <Image
            src={character?.image}
            alt={character?.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } ${isHovered ? "scale-105" : "scale-100"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-amber-950/10 to-transparent" />
        </div>

        {/* Character type badge */}
        <div className="absolute top-3 left-3">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md border ${characterType.bg} ${characterType.text} ${characterType.border} flex items-center gap-1.5`}
          >
            <Icon name={characterType.icon} size={12} />
            {character?.type
              ? character.type.charAt(0).toUpperCase() + character.type.slice(1)
              : "Character"}
          </motion.span>
        </div>

        {/* Audio play button */}
        <AnimatePresence>
          {(isHovered || isPlaying) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-3 right-3"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`backdrop-blur-md rounded-full border transition-all duration-300 ${
                  isPlaying
                    ? "bg-amber-500/80 hover:bg-amber-500/90 border-amber-400/50 text-white"
                    : "bg-amber-900/80 hover:bg-amber-800/90 border-amber-600/50 text-amber-200 hover:text-white"
                }`}
                onClick={handlePlayAudio}
              >
                <Icon
                  name={isPlaying ? "PauseCircle" : "Volume2"}
                  size={18}
                  className={isPlaying ? "animate-pulse" : ""}
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story count indicator */}
        <div className="absolute bottom-3 right-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-1.5 bg-amber-900/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-amber-700/30"
          >
            <Icon name="BookOpen" size={14} className="text-amber-300" />
            <span className="text-sm font-semibold text-amber-100">
              {character?.storyCount || 0}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-cultural font-bold text-amber-50 text-xl leading-tight tracking-wide"
          >
            {character?.name}
          </motion.h3>

          {character?.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 text-xs px-2.5 py-1 rounded-full font-bold shadow-lg animate-pulse"
            >
              BARU
            </motion.span>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-amber-200/90 text-sm mb-4 line-clamp-2 leading-relaxed"
        >
          {character?.description}
        </motion.p>

        {/* Character attributes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between text-xs text-amber-300/80 mb-4"
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-amber-900/50 rounded-full px-2.5 py-1">
              <Icon name="Users" size={12} className="text-amber-300" />
              <span className="font-medium">
                {character?.familyConnections || 0} Hubungan
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-amber-900/50 rounded-full px-2.5 py-1">
              <Icon name="Star" size={12} className="text-amber-300" />
              <span className="font-medium">
                {character?.popularity || 0}% Populer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Story origins */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-2"
        >
          {character?.origins?.slice(0, 3)?.map((origin, index) => (
            <span
              key={index}
              className="text-xs bg-amber-800/40 text-amber-200 px-2.5 py-1 rounded-full border border-amber-700/30 backdrop-blur-sm"
            >
              {origin}
            </span>
          ))}
          {character?.origins?.length > 3 && (
            <span className="text-xs text-amber-400/70 font-medium">
              +{character?.origins?.length - 3} Lainnya
            </span>
          )}
        </motion.div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-amber-500/10 pointer-events-none rounded-2xl border-2 border-amber-400/50"
        >
          <div className="absolute top-3 left-3 w-7 h-7 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Icon name="Check" size={16} className="text-amber-950 font-bold" />
          </div>
        </motion.div>
      )}

      {/* Hover effect overlay */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/10 pointer-events-none rounded-2xl"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CharacterCard;
