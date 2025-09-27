import React, { useState, useEffect, useRef, useCallback } from "react";
import Icon from "../../../components/AppIcon";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showControls, setShowControls] = useState(true);
  const [puppetAnimation, setPuppetAnimation] = useState("idle");
  const [particleEffects, setParticleEffects] = useState([]);
  const audioRef = useRef(null);
  const stageRef = useRef(null);
  const dragStartPos = useRef(null);

  // Enhanced lighting effects
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setLampFlicker(prev => !prev);
    }, 1600 + Math.random() * 1000);
    
    const ambientInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLampFlicker(prev => !prev);
        setTimeout(() => setLampFlicker(prev => !prev), 200);
      }
    }, 5000);

    return () => {
      clearInterval(flickerInterval);
      clearInterval(ambientInterval);
    };
  }, []);

  // Audio control
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Autoplay prevented");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Enhanced scene transition with particles
  useEffect(() => {
    setSceneTransition(true);
    setPuppetAnimation("enter");
    
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 1000 + 500
    }));
    setParticleEffects(newParticles);

    const timeout = setTimeout(() => {
      setSceneTransition(false);
      setPuppetAnimation("idle");
      setParticleEffects([]);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [currentScene, selectedStory]);

  // Enhanced puppet dragging
  const handlePuppetDragStart = useCallback((e) => {
    setIsDragging(true);
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      dragStartPos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      };
    }
  }, []);

  const handlePuppetDrag = useCallback((e) => {
    if (!isDragging || !dragStartPos.current || !stageRef.current) return;
    
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(20, Math.min(80, ((e.clientY - rect.top) / rect.height) * 100));
    
    setPuppetPosition({ x, y });
  }, [isDragging]);

  const handlePuppetDragEnd = useCallback(() => {
    setIsDragging(false);
    dragStartPos.current = null;
  }, []);

  // Enhanced puppet actions
  const handlePuppetAction = useCallback((action) => {
    setPuppetAnimation(action);
    
    if (action === "attack") {
      const attackParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i + 100,
        x: puppetPosition.x + (Math.random() - 0.5) * 20,
        y: puppetPosition.y - 10,
        size: Math.random() * 2 + 1,
        type: "spark",
        duration: 600
      }));
      setParticleEffects(prev => [...prev, ...attackParticles]);
    }

    setTimeout(() => setPuppetAnimation("idle"), 1000);
  }, [puppetPosition]);

  // Scene data
  const stageScenes = {
    bharatayuddha: [
      {
        id: 1,
        title: "Medan Perang Kurukshetra",
        description: "Tentara Pandawa dan Kurawa saling berhadapan di medan perang suci Kurukshetra.",
        duration: "3:45",
        characters: ["Arjuna", "Kresna", "Duryudana"],
        mainPuppet: "arjuna",
        mood: "tension"
      },
      {
        id: 2,
        title: "Dialog Arjuna dan Kresna",
        description: "Arjuna ragu-ragu untuk bertarung melawan sanak saudaranya.",
        duration: "4:20",
        characters: ["Arjuna", "Kresna"],
        mainPuppet: "arjuna",
        mood: "contemplation"
      }
    ],
    ramayana: [
      {
        id: 1,
        title: "Penculikan Sita",
        description: "Rahwana menculik Sita, permaisuri Rama.",
        duration: "3:15",
        characters: ["Rama", "Sita", "Rahwana"],
        mainPuppet: "rama",
        mood: "drama"
      }
    ],
    folklore: [
      {
        id: 1,
        title: "Nasihat Semar",
        description: "Semar memberikan wejangan kepada para punakawan.",
        duration: "2:50",
        characters: ["Semar", "Gareng", "Petruk", "Bagong"],
        mainPuppet: "semar",
        mood: "wisdom"
      }
    ]
  };

  const currentStoryScenes = stageScenes[selectedStory] || [];
  const activeScene = currentStoryScenes.find(scene => scene.id === currentScene) || currentStoryScenes[0];

  // Puppet images dengan fallback
  const puppetImages = {
    arjuna: "img/ddb1c79707f7555ef88bb19e7e5f29a7-removebg-preview.png",
    kresna: "img/bartayuda.png",
    duryudana: "/img/duryudana.png",
    sita: "img/ddb1c79707f7555ef88bb19e7e5f29a7-removebg-preview.png",
    hanuman: "/img/hanuman.png",
    rama: "img/bartayuda.png",
    rahwana: "img/bartayuda.png",
    semar: "/img/semar.png",
    gareng: "/img/gareng.png",
    petruk: "/img/petruk.png",
    bagong: "/img/bagong.png",
    default: "/img/wayang-default.png"
  };

  // Particle system component
  const Particle = ({ particle }) => (
    <motion.div
      className={`absolute rounded-full ${
        particle.type === "spark" ? "bg-yellow-400" : "bg-amber-200/40"
      }`}
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: 0,
        scale: 0,
        y: particle.type === "spark" ? -20 : 0,
        x: particle.type === "spark" ? (Math.random() - 0.5) * 40 : 0
      }}
      transition={{ duration: particle.duration / 1000, ease: "easeOut" }}
    />
  );

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0a0600] via-[#1a1209] to-[#2a1a12] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        className="hidden"
      >
        <source src="audio/KI_WIDODO_WILIS_PRABOWO_S.Sn_WONOGIRI_JAWATENGAH_BEDOLAN_GUNUNGAN.mp3" type="audio/mpeg" />
      </audio>

      {/* Lighting System */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Dynamic Stage Lights */}
        <div className="absolute inset-0 bg-radial-gradient(at_30%_20%, rgba(255,200,50,0.1) 0%, transparent 50%)" />
        
        {/* Left Lamp */}
        <motion.div 
          className="absolute top-8 left-8"
          animate={{ 
            scale: lampFlicker ? [1, 1.1, 1] : 1,
            opacity: lampFlicker ? [0.8, 1, 0.8] : 0.9
          }}
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-full shadow-[0_0_60px_20px_rgba(255,200,50,0.4)] bg-gradient-to-br from-amber-300 to-yellow-600" />
        </motion.div>

        {/* Right Lamp */}
        <motion.div 
          className="absolute top-8 right-8"
          animate={{ 
            scale: lampFlicker ? [1.1, 1, 1.1] : 1,
            opacity: lampFlicker ? [1, 0.8, 1] : 0.9
          }}
          transition={{ duration: 0.7, repeat: Infinity, delay: 0.3 }}
        >
          <div className="w-16 h-16 rounded-full shadow-[0_0_60px_20px_rgba(255,200,50,0.4)] bg-gradient-to-br from-yellow-400 to-amber-600" />
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
        
        {/* Floating Dust Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://i1.wp.com/bergaya.id/wp-content/uploads/2020/03/Motif-Batik-Solo.jpg')] bg-cover bg-center mix-blend-overlay" />

      {/* Transition Particles */}
      <AnimatePresence>
        {particleEffects.map(particle => (
          <Particle key={particle.id} particle={particle} />
        ))}
      </AnimatePresence>

      {/* Interactive Stage Area */}
      <div
        ref={stageRef}
        className="absolute inset-6 cursor-move rounded-2xl border border-amber-500/10"
        onMouseDown={handlePuppetDragStart}
        onMouseMove={handlePuppetDrag}
        onMouseUp={handlePuppetDragEnd}
        onMouseLeave={handlePuppetDragEnd}
        onDoubleClick={() => setShowControls(!showControls)}
      >
        {/* Main Puppet */}
        <motion.div
          className={`absolute cursor-grab active:cursor-grabbing z-30 transition-shadow duration-300 ${
            isDragging ? "shadow-2xl shadow-amber-400/30" : "shadow-lg shadow-amber-400/20"
          }`}
          style={{
            left: `${puppetPosition.x}%`,
            top: `${puppetPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: sceneTransition ? 0.8 : isDragging ? 1.1 : 1,
            rotate: isDragging ? [0, -2, 2, 0] : 0,
            y: puppetAnimation === "talk" ? [0, -5, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.3 },
            rotate: { duration: 0.5, repeat: isDragging ? Infinity : 0 },
            y: { duration: 0.5, repeat: puppetAnimation === "talk" ? Infinity : 0 }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            {/* Puppet Shadow */}
            <div className="absolute -inset-4 bg-black/30 rounded-full blur-xl transform scale-150" />
            
            {/* Puppet Glow */}
            <div className={`absolute -inset-2 rounded-lg blur-md transition-all duration-300 ${
              puppetAnimation === "attack" ? "bg-red-400/40" : "bg-amber-400/20"
            }`} />

            <img
              src={puppetImages[activeScene?.mainPuppet] || puppetImages.default}
              alt="Wayang Puppet"
              className="relative w-48 h-64 object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDQzNDIzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiBmaWxsPSIjRDlBNjQ2IiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5XYXlhbmc8L3RleHQ+Cjwvc3ZnPg==";
              }}
            />

            {/* Drag Indicator */}
            {isDragging && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-amber-200 text-xs px-3 py-1 rounded-full backdrop-blur-sm"
              >
                ✨ Gerakkan Wayang
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stage Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2a1a12] via-transparent to-transparent" />
      </div>

      {/* Scene Information */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-950/80 to-amber-900/80 backdrop-blur-xl rounded-xl p-4 border border-amber-500/30 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-amber-100">{activeScene?.title}</h3>
              <p className="text-sm text-amber-200/80 mt-1">{activeScene?.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-amber-300/70">
                <span>⏱️ {activeScene?.duration}</span>
                <span>🎭 {activeScene?.characters?.join(", ")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleOverlay}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  showEducationalOverlay
                    ? "bg-amber-500/30 text-amber-200"
                    : "bg-white/10 text-gray-400 hover:text-white"
                }`}
                title="Toggle Educational Overlay"
              >
                <Icon name="BookOpen" size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 z-20"
          >
            <div className="bg-gradient-to-r from-amber-950/90 to-amber-900/90 backdrop-blur-xl rounded-xl p-4 border border-amber-500/30 shadow-lg">
              <div className="flex items-center justify-center">
                {/* Puppet Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePuppetAction("talk")}
                    className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all duration-200"
                  >
                    Bicara
                  </button>
                  <button
                    onClick={() => handlePuppetAction("attack")}
                    className="px-3 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-200"
                  >
                    Serang
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene Transition Overlay */}
      <AnimatePresence>
        {sceneTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-amber-900/40 via-transparent to-yellow-900/40 z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Interactive Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-xs text-amber-300/70 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
      >
        ✨ Klik dua kali untuk menyembunyikan kontrol
      </motion.div>
    </div>
  );
};

export default TheaterStage;