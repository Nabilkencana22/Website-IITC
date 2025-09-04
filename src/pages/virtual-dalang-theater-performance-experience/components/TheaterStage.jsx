import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TheaterStage = ({
  selectedStory,
  isPlaying,
  onPlayPause,
  currentScene,
  onSceneChange,
  showEducationalOverlay,
  onToggleOverlay,
}) => {
  const [lampFlicker, setLampFlicker] = useState(false);
  const [puppetPosition, setPuppetPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [sceneTransition, setSceneTransition] = useState(false);
  const audioRef = useRef(null);

  // Lamp flicker
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setLampFlicker((prev) => !prev);
    }, 1600 + Math.random() * 1000);
    return () => clearInterval(flickerInterval);
  }, []);

  // Audio gamelan
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Scene transition animation
  useEffect(() => {
    setSceneTransition(true);
    const timeout = setTimeout(() => setSceneTransition(false), 700);
    return () => clearTimeout(timeout);
  }, [currentScene]);

  const handlePuppetDrag = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPuppetPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    });
  };

  const stageScenes = {
    bharatayuddha: [
      {
        id: 1,
        title: "Perang Besar Dimulai",
        description: "Tentara Pandawa dan Kurawa saling berhadapan",
        duration: "3:45",
        characters: ["Arjuna", "Kresna", "Duryudana"],
      },
      {
        id: 2,
        title: "Dilema Arjuna",
        description: "Pangeran pejuang mempertanyakan tugasnya",
        duration: "4:20",
        characters: ["Arjuna", "Kresna"],
      },
      {
        id: 3,
        title: "Panduan Ilahi",
        description: "Kresna mengungkapkan jalan dharma",
        duration: "5:15",
        characters: ["Arjuna", "Kresna"],
      },
    ],
    ramayana: [
      {
        id: 1,
        title: "Penculikan Sita",
        description: "Rahwana membawa Sita ke Alengka",
        duration: "4:10",
        characters: ["Sita", "Rahwana", "Jatayu"],
      },
      {
        id: 2,
        title: "Misi Hanuman",
        description: "Monyet putih mencari Sita",
        duration: "3:55",
        characters: ["Hanuman", "Sita"],
      },
      {
        id: 3,
        title: "Pertarungan Terakhir",
        description: "Rama menghadapi Rahwana",
        duration: "6:30",
        characters: ["Rama", "Rahwana", "Hanuman"],
      },
    ],
    folklore: [
      {
        id: 1,
        title: "Kebijaksanaan Semar",
        description: "Badut ilahi mengajarkan pelajaran hidup",
        duration: "3:20",
        characters: ["Semar", "Gareng", "Petruk"],
      },
      {
        id: 2,
        title: "Harmoni Desa",
        description: "Nilai-nilai komunitas melalui humor",
        duration: "4:45",
        characters: ["Semar", "Bagong", "Village Chief"],
      },
    ],
  };

  const currentStoryScenes = stageScenes[selectedStory] || [];
  const activeScene =
    currentStoryScenes.find((scene) => scene.id === currentScene) ||
    currentStoryScenes[0];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0d0a07] via-[#1a1209] to-black rounded-2xl overflow-hidden shadow-2xl border border-gold/20">
      {/* Audio */}
      <audio
        ref={audioRef}
        loop
        src="audio/KI_WIDODO_WILIS_PRABOWO_S.Sn_WONOGIRI_JAWATENGAH_BEDOLAN_GUNUNGAN.mp3"
      />

      {/* Lampu kiri */}
      <div className="absolute top-6 left-6 z-20">
        <div
          className={`w-12 h-12 rounded-full shadow-[0_0_40px_15px_rgba(255,200,50,0.6)] transition-all duration-700 ${
            lampFlicker ? "bg-amber-400 scale-110" : "bg-yellow-500 scale-95"
          }`}
        ></div>
      </div>
      {/* Lampu kanan */}
      <div className="absolute top-6 right-6 z-20">
        <div
          className={`w-12 h-12 rounded-full shadow-[0_0_40px_15px_rgba(255,200,50,0.6)] transition-all duration-700 ${
            lampFlicker ? "bg-yellow-500 scale-95" : "bg-amber-400 scale-110"
          }`}
        ></div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 opacity-100 bg-[url('https://i.pinimg.com/originals/52/d2/c8/52d2c84edfcf25e4119ddab998952ef8.jpg')] bg-cover bg-center mix-blend-overlay"></div>

      {/* Stage */}
      <div
        className="absolute inset-8 cursor-move"
        onMouseMove={handlePuppetDrag}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Puppet Utama */}
        <div
          className={`absolute transition-all duration-700 ease-in-out cursor-grab active:cursor-grabbing hover:scale-105 ${
            sceneTransition ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          style={{
            left: `${puppetPosition.x}%`,
            top: `${puppetPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black/40 rounded-lg rotate-2 scale-125 blur-xl"></div>
            <img
              src="img/bartayuda.png"
              alt="Puppet"
              className="relative w-48 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-transform duration-700 hover:rotate-2"
            />
          </div>
        </div>

        {/* Karakter Pendukung */}
        {activeScene?.characters.slice(1).map((character, index) => (
          <div
            key={character}
            className={`absolute transition-all duration-700 ease-in-out opacity-80 hover:opacity-100 ${
              sceneTransition
                ? "opacity-0 translate-y-6"
                : "opacity-100 translate-y-0"
            } animate-enemy`}
            style={{
              left: `${25 + index * 25}%`,
              top: `${70 + index * 5}%`,
              transform: "translate(-50%, -50%) scale(0.7)", // diperkecil
            }}
          >
            <div className="relative">
              {/* Bayangan */}
              <div className="absolute inset-0 bg-black/40 rounded-lg rotate-1 blur-md"></div>

              {/* Gambar karakter */}
              <img
                src="img/ddb1c79707f7555ef88bb19e7e5f29a7-removebg-preview.png"
                alt={character}
                className="relative w-20 h-30 object-contain drop-shadow-lg"
              />

              {/* Highlight background */}
              <div className="absolute inset-0 w-20 h-30 bg-gradient-to-b from-red-600/30 to-red-900/40 rounded-lg border border-red-500/40 shadow-xl"></div>
            </div>
          </div>
        ))}

        {/* Tambahkan animasi di global CSS / Tailwind config */}
        <style jsx>{`
          @keyframes enemyFloat {
            0%,
            100% {
              transform: translateY(0) scale(0.7);
            }
            50% {
              transform: translateY(-8px) scale(0.72);
            }
          }
          .animate-enemy {
            animation: enemyFloat 3s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Overlay Edukasi */}
      {showEducationalOverlay && activeScene && (
        <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-gold/30 p-5 shadow-2xl animate-slideUp">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-heading text-lg font-bold text-gold tracking-wide drop-shadow-lg">
                {activeScene.title}
              </h4>
              <p className="text-sm text-neutral-200 mt-2 leading-relaxed">
                {activeScene.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggleOverlay}
              className="text-neutral-400 hover:text-gold"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Icon name="Clock" size={12} className="mr-1 text-gold" />
                {activeScene.duration}
              </span>
              <span className="flex items-center">
                <Icon name="Users" size={12} className="mr-1 text-gold" />
                {activeScene.characters.length} Karakter
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                iconName="SkipBack"
                onClick={() => onSceneChange(Math.max(1, currentScene - 1))}
                disabled={currentScene === 1}
              />
              <Button
                variant="default"
                size="sm"
                iconName={isPlaying ? "Pause" : "Play"}
                onClick={onPlayPause}
                className="bg-gradient-to-r from-primary to-gold text-white rounded-full shadow-lg hover:scale-110 transition"
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="SkipForward"
                onClick={() =>
                  onSceneChange(
                    Math.min(currentStoryScenes.length, currentScene + 1)
                  )
                }
                disabled={currentScene === currentStoryScenes.length}
              />
            </div>
          </div>
        </div>
      )}

      {/* Indikator Gamelan */}
      <div className="absolute bottom-4 right-6 flex items-center space-x-2 text-sm text-gold font-medium">
        <Icon name="Music" size={16} />
        {/* <span>Gamelan</span> */}
        {isPlaying && (
          <div className="flex space-x-0.5">
            <span className="w-1 h-4 bg-gold animate-pulse"></span>
            <span className="w-1 h-6 bg-gold animate-bounce"></span>
            <span className="w-1 h-5 bg-gold animate-pulse"></span>
            <span className="w-1 h-7 bg-gold animate-bounce"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheaterStage;
