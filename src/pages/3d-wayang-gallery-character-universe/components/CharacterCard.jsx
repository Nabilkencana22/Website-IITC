import React, { useState, useRef } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";


const CharacterCard = ({ character, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayAudio = (e) => {
    e?.stopPropagation();

    if (!character?.audio) {
      console.warn("Audio tidak tersedia untuk", character?.name);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(character.audio);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <div
      className={`relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform ${
        isSelected
          ? "ring-2 ring-primary shadow-cultural scale-105"
          : "hover:shadow-lg hover:-translate-y-1"
      }`}
      onClick={() => onSelect(character)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Character Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={character?.image}
          alt={character?.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Overlay with character type */}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              character?.type === "hero"
                ? "bg-success/20 text-success"
                : character?.type === "villain"
                ? "bg-destructive/20 text-destructive"
                : character?.type === "deity"
                ? "bg-cultural-gold/20 text-cultural-gold"
                : "bg-accent/20 text-accent"
            }`}
          >
            {character?.type}
          </span>
        </div>

        {/* Audio play button */}
        <div
          className={`absolute top-2 right-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`backdrop-blur-md rounded-full ${
              isPlaying
                ? "bg-primary/80 hover:bg-primary/90"
                : "bg-background/80 hover:bg-background/90"
            }`}
            onClick={handlePlayAudio}
          >
            <Icon name={isPlaying ? "PauseCircle" : "Volume2"} size={18} />
          </Button>
        </div>

        {/* Story count indicator */}
        <div className="absolute bottom-2 right-2">
          <div className="flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
            <Icon name="BookOpen" size={12} className="text-primary" />
            <span className="text-xs font-medium text-foreground">
              {character?.storyCount}
            </span>
          </div>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
            {character?.name}
          </h3>
          {character?.isNew && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium animate-pulse">
              Baru
            </span>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {character?.description}
        </p>

        {/* Character attributes */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{character?.familyConnections} Hubungan</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-yellow-500" />
            <span>{character?.popularity}%</span>
          </div>
        </div>

        {/* Story origins */}
        <div className="flex flex-wrap gap-1 mt-3">
          {character?.origins?.slice(0, 2)?.map((origin, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              {origin}
            </span>
          ))}
          {character?.origins?.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{character?.origins?.length - 2} Lainnya
            </span>
          )}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-primary/10 pointer-events-none">
          <div className="absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
            <Icon name="Check" size={14} className="text-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
