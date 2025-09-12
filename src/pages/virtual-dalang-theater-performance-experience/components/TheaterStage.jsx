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
  const [showControls, setShowControls] = useState(true);
  const [activePuppet, setActivePuppet] = useState("arjuna");
  const [puppetAnimation, setPuppetAnimation] = useState("idle");
  const audioRef = useRef(null);
  const stageRef = useRef(null);

  // Lamp flicker effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setLampFlicker((prev) => !prev);
    }, 1600 + Math.random() * 1000);
    return () => clearInterval(flickerInterval);
  }, []);

  // Audio control
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Scene transition animation
  useEffect(() => {
    setSceneTransition(true);
    setPuppetAnimation("enter");
    const timeout = setTimeout(() => {
      setSceneTransition(false);
      setPuppetAnimation("idle");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [currentScene, selectedStory]);

  // Handle puppet dragging
  const handlePuppetDrag = (e) => {
    if (!isDragging) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPuppetPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    });
  };

  // Puppet selection
  const handlePuppetSelect = (puppet) => {
    setActivePuppet(puppet);
    setPuppetAnimation("change");
    setTimeout(() => setPuppetAnimation("idle"), 800);
  };

  // Puppet actions
  const handlePuppetAction = (action) => {
    setPuppetAnimation(action);
    setTimeout(() => setPuppetAnimation("idle"), 1000);
  };

  // Scene data
  const stageScenes = {
    bharatayuddha: [
      {
        id: 1,
        title: "Perang Besar Dimulai",
        description:
          "Tentara Pandawa dan Kurawa saling berhadapan di medan perang Kurukshetra. Adegan ini menggambarkan ketegangan sebelum pertempuran besar.",
        duration: "3:45",
        characters: ["Arjuna", "Kresna", "Duryudana"],
        mainPuppet: "arjuna",
      },
      {
        id: 2,
        title: "Dilema Arjuna",
        description:
          "Arjuna mengalami keraguan moral ketika harus melawan keluarga dan gurunya sendiri. Kresna memberikan wejangan tentang dharma.",
        duration: "4:20",
        characters: ["Arjuna", "Kresna"],
        mainPuppet: "arjuna",
      },
      {
        id: 3,
        title: "Panduan Ilahi",
        description:
          "Kresna menyampaikan ajaran Bhagavad Gita kepada Arjuna, mengungkapkan hakikat kehidupan, kewajiban, dan jalan spiritual.",
        duration: "5:15",
        characters: ["Arjuna", "Kresna"],
        mainPuppet: "kresna",
      },
    ],
    ramayana: [
      {
        id: 1,
        title: "Penculikan Sita",
        description:
          "Rahwana menyamar sebagai brahmana dan menculik Sita yang sedang berada di taman. Jatayu berusaha menyelamatkan namun gugur.",
        duration: "4:10",
        characters: ["Sita", "Rahwana", "Jatayu"],
        mainPuppet: "sita",
      },
      {
        id: 2,
        title: "Misi Hanuman",
        description:
          "Hanuman melompati samudera untuk mencari Sita di Alengka. Ia menemukan Sita yang sedang berduka dan memberikan cincin Rama sebagai bukti.",
        duration: "3:55",
        characters: ["Hanuman", "Sita"],
        mainPuppet: "hanuman",
      },
      {
        id: 3,
        title: "Pertarungan Terakhir",
        description:
          "Rama dan Rahwana bertarung dengan senjata sakti. Dengan bantuan Hanuman dan pasukan kera, Rama akhirnya berhasil mengalahkan Rahwana.",
        duration: "6:30",
        characters: ["Rama", "Rahwana", "Hanuman"],
        mainPuppet: "rama",
      },
    ],
    folklore: [
      {
        id: 1,
        title: "Kebijaksanaan Semar",
        description:
          "Semar mengajarkan nilai-nilai kehidupan melalui humor dan kebijaksanaan khasnya. Gareng dan Petruk memberikan kelucuan dalam nasihat.",
        duration: "3:20",
        characters: ["Semar", "Gareng", "Petruk"],
        mainPuppet: "semar",
      },
      {
        id: 2,
        title: "Harmoni Desa",
        description:
          "Kisah tentang kehidupan masyarakat desa yang penuh dengan nilai gotong royong dan kearifan lokal yang dijaga melalui humor.",
        duration: "4:45",
        characters: ["Semar", "Bagong", "Village Chief"],
        mainPuppet: "semar",
      },
    ],
  };

  const currentStoryScenes = stageScenes[selectedStory] || [];
  const activeScene =
    currentStoryScenes.find((scene) => scene.id === currentScene) ||
    currentStoryScenes[0];

  // Puppet images mapping
  const puppetImages = {
    arjuna: "img/bartayuda.png",
    kresna: "img/kresna.png",
    duryudana: "img/duryudana.png",
    sita: "img/sita.png",
    hanuman: "img/hanuman.png",
    rama: "img/rama.png",
    rahwana: "img/rahwana.png",
    semar: "img/semar.png",
    gareng: "img/gareng.png",
    petruk: "img/petruk.png",
    bagong: "img/bagong.png",
    default: "img/bartayuda.png",
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0d0a07] via-[#1a1209] to-black rounded-2xl overflow-hidden shadow-2xl border border-gold/20">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="audio/KI_WIDODO_WILIS_PRABOWO_S.Sn_WONOGIRI_JAWATENGAH_BEDOLAN_GUNUNGAN.mp3"
      />

      {/* Stage Lighting Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left Lamp */}
        <div className="absolute top-6 left-6">
          <div
            className={`w-12 h-12 rounded-full shadow-[0_0_40px_15px_rgba(255,200,50,0.6)] transition-all duration-700 ${
              lampFlicker ? "bg-amber-400 scale-110" : "bg-yellow-500 scale-95"
            }`}
          ></div>
        </div>

        {/* Right Lamp */}
        <div className="absolute top-6 right-6">
          <div
            className={`w-12 h-12 rounded-full shadow-[0_0_40px_15px_rgba(255,200,50,0.6)] transition-all duration-700 ${
              lampFlicker ? "bg-yellow-500 scale-95" : "bg-amber-400 scale-110"
            }`}
          ></div>
        </div>

        {/* Ambient Light */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Stage Background */}
      <div className="absolute inset-0 opacity-80 bg-[url('https://i.pinimg.com/originals/52/d2/c8/52d2c84edfcf25e4119ddab998952ef8.jpg')] bg-cover bg-center mix-blend-soft-light"></div>

      {/* Interactive Stage Area */}
      <div
        ref={stageRef}
        className="absolute inset-8 cursor-move"
        onMouseMove={handlePuppetDrag}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onDoubleClick={() => setShowControls(!showControls)}
      >
        {/* Main Puppet */}
        <div
          className={`absolute transition-all duration-500 ease-out cursor-grab active:cursor-grabbing hover:scale-105 z-30
            ${sceneTransition ? "opacity-0 scale-90" : "opacity-100 scale-100"}
            ${puppetAnimation === "enter" ? "animate-puppetEnter" : ""}
            ${puppetAnimation === "change" ? "animate-puppetChange" : ""}
            ${puppetAnimation === "attack" ? "animate-puppetAttack" : ""}
            ${puppetAnimation === "talk" ? "animate-puppetTalk" : ""}
          `}
          style={{
            left: `${puppetPosition.x}%`,
            top: `${puppetPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black/40 rounded-lg rotate-2 scale-125 blur-xl"></div>
            <img
              src={
                puppetImages[activeScene?.mainPuppet || activePuppet] ||
                puppetImages.default
              }
              alt="Wayang"
              className="relative w-48 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-transform duration-300"
            />
            {/* Puppet Control Indicator */}
            {isDragging && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                Gerakkan wayang
              </div>
            )}
          </div>
        </div>

        {/* Supporting Characters */}
        {activeScene?.characters
          .filter((char) => char.toLowerCase() !== activeScene.mainPuppet)
          .map((character, index) => (
            <div
              key={character}
              className={`absolute transition-all duration-700 ease-in-out opacity-80 hover:opacity-100 z-20
              ${
                sceneTransition
                  ? "opacity-0 translate-y-6"
                  : "opacity-100 translate-y-0"
              }
              animate-enemyFloat
            `}
              style={{
                left: `${25 + index * 25}%`,
                top: `${70 + index * 5}%`,
                transform: "translate(-50%, -50%) scale(0.7)",
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black/40 rounded-lg rotate-1 blur-md"></div>
                <img
                  src={
                    puppetImages[character.toLowerCase()] ||
                    puppetImages.default
                  }
                  alt={character}
                  className="relative w-20 h-30 object-contain drop-shadow-lg"
                />
                <div className="absolute inset-0 w-20 h-30 bg-gradient-to-b from-red-600/30 to-red-900/40 rounded-lg border border-red-500/40 shadow-xl"></div>
              </div>
            </div>
          ))}

        {/* Stage Floor Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgeD0iMCIgeT0iMCI+PHBhdGggZD0iTTAgMEg4MFY4MEgwWiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBMODAgODBNODAgMEwwIDgwIiBzdHJva2U9IiM4ODQ0MTEiIHN0cm9rZS13aWR0aD0iMiI+PC9wYXRoPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
      </div>

      {/* Dalang Control Panel */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-xl border border-gold/30 p-3 flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Move"
              onClick={() => setIsDragging(!isDragging)}
              className={isDragging ? "bg-gold/20 text-gold" : "text-white"}
              tooltip="Gerakkan wayang"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Swords"
              onClick={() => handlePuppetAction("attack")}
              className="text-white hover:text-red-400"
              tooltip="Aksi menyerang"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => handlePuppetAction("talk")}
              className="text-white hover:text-blue-400"
              tooltip="Aksi berbicara"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="SkipBack"
              onClick={() => onSceneChange(Math.max(1, currentScene - 1))}
              disabled={currentScene === 1}
              tooltip="Adegan sebelumnya"
            />
            <Button
              variant="default"
              size="lg"
              iconName={isPlaying ? "Pause" : "Play"}
              onClick={onPlayPause}
              className="bg-gradient-to-r from-primary to-gold text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              tooltip={isPlaying ? "Jeda" : "Mainkan"}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="SkipForward"
              onClick={() =>
                onSceneChange(
                  Math.min(currentStoryScenes.length, currentScene + 1)
                )
              }
              disabled={currentScene === currentStoryScenes.length}
              tooltip="Adegan berikutnya"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Info"
              onClick={onToggleOverlay}
              className={
                showEducationalOverlay ? "bg-gold/20 text-gold" : "text-white"
              }
              tooltip="Info cerita"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              onClick={() => setShowControls(false)}
              className="text-white"
              tooltip="Sembunyikan panel"
            />
          </div>
        </div>
      )}

      {/* Scene Info Corner */}
      {!showControls && (
        <div
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 cursor-pointer hover:bg-black/70 transition-colors"
          onClick={() => setShowControls(true)}
        >
          <Icon name="Settings" size={16} className="text-gold" />
        </div>
      )}

      {/* Educational Overlay */}
      {showEducationalOverlay && activeScene && (
        <div className="absolute top-4 left-4 right-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-gold/30 p-5 shadow-2xl animate-slideDown z-40">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-heading text-xl font-bold text-gold tracking-wide drop-shadow-lg mb-2">
                {activeScene.title}
              </h4>
              <p className="text-sm text-neutral-200 mt-2 leading-relaxed">
                {activeScene.description}
              </p>
              <div className="flex items-center space-x-4 mt-3 text-xs text-neutral-300">
                <span className="flex items-center">
                  <Icon name="Clock" size={12} className="mr-1 text-gold" />
                  {activeScene.duration}
                </span>
                <span className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1 text-gold" />
                  {activeScene.characters.join(", ")}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggleOverlay}
              className="text-neutral-400 hover:text-gold"
            />
          </div>
        </div>
      )}

      {/* Gamelan Indicator */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 text-sm text-gold font-medium bg-black/50 rounded-full py-1 px-3">
        <Icon name="Music" size={16} />
        <span>Gamelan</span>
        {isPlaying && (
          <div className="flex space-x-1">
            <span className="w-1 h-4 bg-gold animate-pulse"></span>
            <span
              className="w-1 h-6 bg-gold animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-1 h-5 bg-gold animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></span>
            <span
              className="w-1 h-7 bg-gold animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></span>
          </div>
        )}
      </div>

      {/* Animation Styles */}
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
        @keyframes puppetEnter {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        @keyframes puppetChange {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.8) rotate(10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        @keyframes puppetAttack {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          25% {
            transform: translate(calc(-50% + 20px), -50%) scale(1.1);
          }
          50% {
            transform: translate(calc(-50% - 15px), -50%) scale(1.05);
          }
          75% {
            transform: translate(calc(-50% + 10px), -50%) scale(1.07);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes puppetTalk {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, calc(-50% - 5px)) scale(1.02);
          }
        }
        .animate-enemyFloat {
          animation: enemyFloat 3s ease-in-out infinite;
        }
        .animate-puppetEnter {
          animation: puppetEnter 0.7s ease-out forwards;
        }
        .animate-puppetChange {
          animation: puppetChange 0.8s ease-in-out forwards;
        }
        .animate-puppetAttack {
          animation: puppetAttack 1s ease-in-out forwards;
        }
        .animate-puppetTalk {
          animation: puppetTalk 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TheaterStage;
