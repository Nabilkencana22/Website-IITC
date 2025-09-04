import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const InstrumentPad = ({
  instrument,
  onPlay,
  isActive = false,
  disabled = false,
  volume = 1,
  className = "",
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const padRef = useRef(null);
  const audioRef = useRef(null);

  // Map backsound audio untuk tiap instrumen
  const audioMap = {
    gong: "audio/gong-sound-effect-308757.mp3",
    metallophone: "audio/Cacahan_Saron_Sampak_Manyura.._https_-_youtu.be_03atV09nDws_karawitan_budayajawi_gamelan_saron.mp3",
    drum: "audio/suara_gambang_gamelan_gamelan_gambang_bermain_gambang_jawa_alat_musik_gambang_jawa_tengah.mp3",
    flute: "audio/What_does_a_piccolo_sound_like_Ode_to_Joy.mp3",
    bonang: "audio/SUARA_BONANG.mp3",
    saron:
      "audio/traditional music saron gangsa sound Alat Musik Traditional Saron Ukir HD.mp3",
    kendang:
      "audio/Kendang_ Kendhang or Gendang _Free Download Sound Effects_.mp3",
    suling: "audio/What_does_a_piccolo_sound_like_Ode_to_Joy.mp3",
  };

  const handlePlay = (e) => {
    if (disabled) return;

    // Ripple effect
    const rect = padRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setIsPressed(true);
    setTimeout(() => {
      setRipples((prev) => prev?.filter((r) => r?.id !== newRipple?.id));
    }, 600);
    setTimeout(() => setIsPressed(false), 200);

    // Mainkan backsound
    const soundSrc = audioMap[instrument?.type];
    if (soundSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(soundSrc);
      audioRef.current.volume = volume;
      audioRef.current.play();
    }

    onPlay(instrument);
  };

  const getInstrumentIcon = (type) => {
    const iconMap = {
      gong: "Circle",
      metallophone: "Grid3X3",
      drum: "Drum",
      flute: "Wind",
      bonang: "Hexagon",
      saron: "BarChart3",
      kendang: "Volume2",
      suling: "Music",
    };
    return iconMap?.[type] || "Music";
  };

  const getInstrumentGradient = (type) => {
    const gradientMap = {
      gong: "from-yellow-500 to-yellow-800",
      metallophone: "from-gray-300 to-gray-600",
      drum: "from-amber-500 to-amber-800",
      flute: "from-blue-400 to-blue-700",
      bonang: "from-orange-400 to-orange-700",
      saron: "from-slate-400 to-slate-700",
      kendang: "from-red-500 to-red-800",
      suling: "from-green-400 to-green-700",
    };
    return gradientMap?.[type] || "from-primary to-cultural-gold";
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={padRef}
        onClick={handlePlay}
        disabled={disabled}
        className={`
          relative w-full h-28 md:h-32 rounded-2xl overflow-hidden
          bg-gradient-to-br ${getInstrumentGradient(instrument?.type)}
          shadow-xl hover:shadow-2xl hover:shadow-cultural
          transition-all duration-300
          transform hover:scale-105 active:scale-95
          ${isPressed ? "scale-95 ring-2 ring-white/50" : ""}
          ${
            isActive
              ? "ring-4 ring-primary ring-offset-2 ring-offset-background animate-pulse"
              : ""
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          group
        `}
      >
        {/* Glow aura */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)]"></div>

        {/* Ripple Effects */}
        {ripples?.map((ripple) => (
          <div
            key={ripple?.id}
            className="absolute pointer-events-none animate-ping"
            style={{
              left: ripple?.x - 25,
              top: ripple?.y - 25,
              width: 50,
              height: 50,
            }}
          >
            <div className="w-full h-full bg-white/40 rounded-full"></div>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
          <Icon
            name={getInstrumentIcon(instrument?.type)}
            size={40}
            className="text-white drop-shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white text-sm font-cultural-cta text-center leading-tight drop-shadow">
            {instrument?.name}
          </span>
          {instrument?.note && (
            <span className="text-white/80 text-xs mt-1">
              {instrument?.note}
            </span>
          )}
        </div>

        {/* Volume Indicator */}
        <div className="absolute bottom-1 left-2 right-2">
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-200"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </button>

      {/* Instrument Label */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground font-cultural-body">
          {instrument?.description}
        </p>
      </div>
    </div>
  );
};

export default InstrumentPad;
