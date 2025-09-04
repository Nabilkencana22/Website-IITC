import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GamelanPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Ref untuk simpan audio instrumen
  const instrumentRefs = useRef({});

  const tracks = [
    {
      id: 1,
      title: "Gending Sriwijaya",
      description: "Musik pembuka yang menenangkan",
      duration: "8:38",
      mood: "Tenang",
      src: "audio/Gending Sriwijaya.mp3",
    },
    {
      id: 2,
      title: "Lancaran Ricik-ricik",
      description: "Irama ceria untuk suasana riang",
      duration: "2:41",
      mood: "Riang",
      src: "audio/Lancaran RICIK RICIK.mp3",
    },
    {
      id: 3,
      title: "Ketawang Puspawarna",
      description: "Melodi klasik yang mendalam",
      duration: "4:44",
      mood: "Khidmat",
      src: "audio/Ketawang Puspawarna.mp3",
    },
  ];

  const instruments = [
    { name: "Gong", icon: "Circle", active: true },
    { name: "Kendang", icon: "Drum", active: true },
    { name: "Saron", icon: "Music", active: true },
    { name: "Bonang", icon: "Disc", active: true },
    { name: "Gambang", icon: "Piano", active: true },
  ];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks?.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks?.length) % tracks?.length);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e?.target?.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format waktu mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Event listener untuk update waktu & durasi
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Saat ganti track otomatis play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Music" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Suasana Gamelan Interaktif
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Rasakan Harmoni
            <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text">
              Musik Tradisional
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nikmati koleksi musik gamelan autentik yang dapat Anda kontrol.
            Sesuaikan instrumen, volume, dan suasana untuk pengalaman yang
            personal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-puppet">
            {/* Audio Element */}
            <audio ref={audioRef}>
              <source src={tracks?.[currentTrack]?.src} type="audio/mp3" />
              Browser Anda tidak mendukung audio player.
            </audio>

            {/* Player Header */}
            <div className="bg-gradient-to-r from-primary/10 via-cultural-gold/10 to-accent/10 p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-cultural-gold rounded-2xl flex items-center justify-center shadow-cultural">
                    <Icon
                      name="Music"
                      size={32}
                      className="text-primary-foreground"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground">
                      {tracks?.[currentTrack]?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {tracks?.[currentTrack]?.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {tracks?.[currentTrack]?.duration}
                      </span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {tracks?.[currentTrack]?.mood}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    {/* Volume Control */}
                    <div className="relative flex items-center space-x-2">
                      {/* Tombol Icon Volume */}
                      <button
                        onClick={() => setShowVolumeControl(!showVolumeControl)}
                        className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300 flex items-center justify-center"
                      >
                        <Icon
                          name={
                            volume === 0
                              ? "VolumeX"
                              : volume < 0.5
                              ? "Volume1"
                              : "Volume2"
                          }
                          size={20}
                          className={`text-muted-foreground transition-colors duration-300 ${
                            volume === 0 ? "text-red-500" : "text-yellow-400"
                          }`}
                        />
                      </button>

                      {/* Slider Volume */}
                      {showVolumeControl && (
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) =>
                            setVolume(parseFloat(e.target.value))
                          }
                          className="w-24 h-2 rounded-full accent-yellow-400 cursor-pointer transition-all duration-300 hover:scale-105"
                          style={{
                            background: `linear-gradient(to right, #facc15 ${
                              volume * 100
                            }%, #d1d5db ${volume * 100}%)`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="p-8">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <button
                  onClick={prevTrack}
                  className="p-3 rounded-full hover:bg-muted/20 transition-all duration-cultural-normal"
                >
                  <Icon
                    name="SkipBack"
                    size={24}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-gradient-to-r from-primary to-cultural-gold rounded-full flex items-center justify-center shadow-puppet hover:shadow-cultural transition-all duration-cultural-normal puppet-hover"
                >
                  <Icon
                    name={isPlaying ? "Pause" : "Play"}
                    size={28}
                    className="text-primary-foreground ml-1"
                  />
                </button>

                <button
                  onClick={nextTrack}
                  className="p-3 rounded-full hover:bg-muted/20 transition-all duration-cultural-normal"
                >
                  <Icon
                    name="SkipForward"
                    size={24}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  {/* Alur (background) */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-muted to-muted/40" />

                  {/* Progress (jalannya musik) */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-cultural-gold transition-all duration-300"
                    style={{
                      width: duration
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                    }}
                  />

                  {/* Thumb (lingkaran yang bisa digeser) */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>

              {/* Instrument Controls */}
              <div className="space-y-4">
                <h4 className="text-lg font-heading font-semibold text-foreground text-center">
                  Kontrol Instrumen
                </h4>

                {/* 🎵 Ref ke Audio Instrumen */}
                <audio
                  ref={(el) => (instrumentRefs.current["Gong"] = el)}
                  src="audio/gong-sound-effect-308757.mp3"
                  preload="auto"
                />
                <audio
                  ref={(el) => (instrumentRefs.current["Kendang"] = el)}
                  src="audio/Kendang_ Kendhang or Gendang _Free Download Sound Effects_.mp3"
                  preload="auto"
                />
                <audio
                  ref={(el) => (instrumentRefs.current["Saron"] = el)}
                  src="audio/traditional music saron gangsa sound Alat Musik Traditional Saron Ukir HD.mp3"
                  preload="auto"
                />
                <audio
                  ref={(el) => (instrumentRefs.current["Bonang"] = el)}
                  src="audio/SUARA_BONANG.mp3"
                  preload="auto"
                />
                <audio
                  ref={(el) => (instrumentRefs.current["Gambang"] = el)}
                  src="audio/suara_gambang_gamelan_gamelan_gambang_bermain_gambang_jawa_alat_musik_gambang_jawa_tengah.mp3"
                  preload="auto"
                />

                <div className="grid grid-cols-5 gap-4">
                  {instruments?.map((instrument, index) => (
                    <div key={index} className="text-center">
                      <button
                        onClick={() => {
                          // Stop semua audio lain terlebih dahulu
                          Object.values(instrumentRefs.current).forEach(
                            (audio) => {
                              if (audio && !audio.paused) {
                                audio.pause();
                                audio.currentTime = 0;
                              }
                            }
                          );

                          // Mainkan audio yang dipilih
                          const audio =
                            instrumentRefs.current[instrument?.name];
                          if (audio) {
                            audio.currentTime = 0;
                            audio.play();
                          }
                        }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-cultural-normal ${
                          instrument?.active
                            ? "bg-primary/20 text-primary border-2 border-primary/30"
                            : "bg-muted/20 text-muted-foreground border-2 border-transparent hover:bg-muted/40"
                        }`}
                      >
                        <Icon name={instrument?.icon} size={20} />
                      </button>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {instrument?.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Track List */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Daftar Putar
                </h4>

                <div className="space-y-2">
                  {tracks?.map((track, index) => (
                    <button
                      key={track?.id}
                      onClick={() => {
                        setCurrentTrack(index);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center space-x-4 p-3 rounded-lg text-left transition-all duration-cultural-normal ${
                        index === currentTrack
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/20"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === currentTrack
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/30"
                        }`}
                      >
                        {index === currentTrack && isPlaying ? (
                          <Icon name="Volume2" size={16} />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {track?.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {track?.description}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {track?.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10 font-cta rounded-xl"
              iconName="Headphones"
              iconPosition="left"
            >
              Jelajahi Gamelan Playground
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamelanPlayer;
