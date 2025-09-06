import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import InstrumentPad from "./components/InstrumentPad";
import CompositionStudio from "./components/CompositionStudio";
import CollaborativeSession from "./components/CollaborativeSession";
import ProgressTracker from "./components/ProgressTracker";

/**
 * GamelanPlaygroundPage — upgraded UX (competition standard)
 * - Removed RhythmGame completely (import & modal)
 * - Replaced "Mulai Bermain" with "Panduan Interaktif" (GuidedSession modal inline)
 * - Improved visual styles, animations, accessibility, and layout.
 *
 * NOTE: Ensure /audio/* assets and img assets exist in public folder.
 */

const GuidedSession = ({ isOpen, onClose }) => {
  // Simple inline guided session modal (kehilangan RhythmGame digantikan fitur edukatif)
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-3xl w-full bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="animate-fadeIn">
            <h3 className="text-3xl md:text-4xl font-cultural-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cultural-gold">
              Panduan Interaktif
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Ikuti panduan singkat untuk memahami instrumen, skala, dan pola
              gamelan. Cocok untuk pemula hingga menengah. Rasakan pengalaman
              belajar yang menyenangkan dan interaktif!
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Tutup panduan"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card/90 rounded-xl border border-border shadow-md hover:shadow-lg transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground mb-2">
              Langkah 1
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Kenali instrumen: ketuk pad untuk mendengar suara tiap instrumen.
            </p>
          </div>

          <div className="p-6 bg-card/90 rounded-xl border border-border shadow-md hover:shadow-lg transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground mb-2">
              Langkah 2
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Cobalah kombinasi sederhana: gong + saron + kendang.
            </p>
          </div>

          <div className="p-6 bg-card/90 rounded-xl border border-border shadow-md hover:shadow-lg transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground mb-2">
              Langkah 3
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Pelajari skala: pelog vs slendro dan rasakan suasana yang berbeda.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="border border-muted/50 font-sans text-foreground hover:bg-muted/10 hover:border-primary transition-all duration-300 rounded-xl px-5 py-2"
          >
            Tutup
          </Button>

          <Button
            variant="default"
            size="md"
            onClick={() => {
              onClose();
            }}
            className="bg-gradient-to-r from-primary to-cultural-gold text-white font-sans shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6 py-2"
          >
            Mulai Panduan
          </Button>
        </div>
      </div>
    </div>
  );
};

const GamelanPlaygroundPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTempo, setCurrentTempo] = useState(120);
  const [selectedScale, setSelectedScale] = useState("pelog");
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [userProgress, setUserProgress] = useState({});
  const [compositions, setCompositions] = useState([]);

  const audioContextRef = useRef(null);
  const instrumentsRef = useRef({});

  // Mock gamelan instruments data
  const gamelanInstruments = [
    {
      id: "gong-ageng",
      name: "Gong Ageng",
      type: "gong",
      description: "Gong seremonial besar",
      note: "C2",
      audioUrl: "/audio/gong-ageng.mp3",
      category: "percussion",
    },
    {
      id: "saron-barung",
      name: "Saron Barung",
      type: "metallophone",
      description: "Metalofon perunggu",
      note: "C4",
      audioUrl: "/audio/saron-barung.mp3",
      category: "metallophone",
    },
    {
      id: "kendang-gendhing",
      name: "Kendang Gendhing",
      type: "drum",
      description: "Gendang besar berkepala dua",
      note: "Rhythm",
      audioUrl: "/audio/kendang-gendhing.mp3",
      category: "percussion",
    },
    {
      id: "suling",
      name: "Suling",
      type: "flute",
      description: "Seruling bambu",
      note: "G5",
      audioUrl: "/audio/suling.mp3",
      category: "wind",
    },
    {
      id: "bonang-barung",
      name: "Bonang Barung",
      type: "bonang",
      description: "Set lonceng gong",
      note: "E4",
      audioUrl: "/audio/bonang-barung.mp3",
      category: "metallophone",
    },
    {
      id: "saron-demung",
      name: "Saron Demung",
      type: "saron",
      description: "Saron bernada rendah",
      note: "C3",
      audioUrl: "/audio/saron-demung.mp3",
      category: "metallophone",
    },
    {
      id: "kendang-ketipung",
      name: "Kendang Ketipung",
      type: "kendang",
      description: "Gendang kecil",
      note: "High",
      audioUrl: "/audio/kendang-ketipung.mp3",
      category: "percussion",
    },
    {
      id: "rebab",
      name: "Rebab",
      type: "string",
      description: "Instrumen gesek yang melengkung",
      note: "A4",
      audioUrl: "/audio/rebab.mp3",
      category: "string",
    },
  ];

  const scales = {
    pelog: {
      name: "Pelog",
      description:
        "Skala tujuh nada dengan interval tidak sama, sering digunakan dalam musik upacara",
      notes: ["1", "2", "3", "4", "5", "6", "7"],
      mood: "Mistik dan reflektif",
    },
    slendro: {
      name: "Slendro",
      description:
        "Skala lima nada dengan interval yang sama, umum dalam pertunjukan wayang",
      notes: ["1", "2", "3", "5", "6"],
      mood: "Seimbang dan harmonis",
    },
  };

  const featuredCompositions = [
    {
      id: 1,
      name: "Lancaran Ricik-ricik",
      composer: "Tradisional",
      difficulty: "Pemula",
      duration: "3:45",
      description:
        "Sebuah karya tradisional yang lembut sempurna untuk mempelajari pola gamelan dasar",
      instruments: ["Saron", "Bonang", "Gong"],
      scale: "slendro",
      plays: 1250,
    },
    {
      id: 2,
      name: "Ketawang Puspawarna",
      composer: "Tradisional",
      difficulty: "Menengah",
      duration: "5:20",
      description:
        "Musik istana yang indah menampilkan keanggunan gamelan Jawa",
      instruments: ["Saron", "Bonang", "Suling", "Rebab"],
      scale: "pelog",
      plays: 890,
    },
    {
      id: 3,
      name: "Modern Fusion",
      composer: "Sari Dewi",
      difficulty: "Lanjutan",
      duration: "4:15",
      description:
        "Komposisi kontemporer yang memadukan elemen tradisional dan modern",
      instruments: ["All Instruments"],
      scale: "pelog",
      plays: 567,
    },
  ];

  useEffect(() => {
    // Initialize audio context lazily (do not start until user interacts)
    if (!audioContextRef?.current && typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    return () => {
      if (audioContextRef?.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const playInstrument = (instrument) => {
    // Mock audio playback hook — real implementation should use WebAudio or <audio>
    console.log(`Playing ${instrument?.name} at volume ${masterVolume}`);

    // Show quick visual highlight
    setSelectedInstruments((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((i) => i?.id === instrument?.id);
      if (idx >= 0) {
        updated[idx] = { ...instrument, lastPlayed: Date.now() };
      } else {
        updated.push({ ...instrument, lastPlayed: Date.now() });
      }
      return updated;
    });

    // clear highlight after short animation
    setTimeout(() => {
      setSelectedInstruments((prev) =>
        prev.map((i) =>
          i.id === instrument.id ? { ...i, lastPlayed: null } : i
        )
      );
    }, 420);
  };

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const handleScoreUpdate = (score) => {
    setUserProgress((prev) => ({
      ...prev,
      lastRhythmScore: score,
      totalScore: (prev?.totalScore || 0) + score,
    }));
  };

  const handleSaveComposition = (composition) => {
    setCompositions((prev) => [...prev, composition]);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Pemula: "text-success",
      Menengah: "text-warning",
      Lanjutan: "text-destructive",
    };
    return colors?.[difficulty] || "text-muted-foreground";
  };

  return (
    <>
      <Helmet>
        <title>Gamelan Playground - Eksplorasi Musik | Wayang Interaktif</title>
        <meta
          name="description"
          content="Explore traditional Indonesian gamelan music through interactive instruments, composition studio and collaborative sessions."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main className="pt-16">
          {/* HERO */}
          <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#071021]/30 via-transparent to-[#2b1608]/10">
            <div className="absolute inset-0 pointer-events-none">
              {/* subtle texture */}
              <div className="w-full h-full bg-[url('/img/texture-subtle.png')] opacity-10" />
            </div>

            <div className="relative max-w-7xl mx-auto text-center">
              <div className="mb-8">
                <Icon
                  name="Music"
                  size={88}
                  className="text-primary mx-auto mb-6 transform-gpu motion-safe:animate-[pulse_2s_infinite]"
                />
                <h1 className="text-4xl md:text-6xl font-cultural-heading font-bold mb-4">
                  Gamelan Playground
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Jelajahi gamelan Indonesia dengan instrumen interaktif, studio
                  komposisi, dan sesi kolaboratif—dirancang untuk pelestarian
                  budaya dan pembelajaran berkualitas.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                <div className="bg-card/60 backdrop-blur rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-2xl font-cultural-cta text-primary">
                    {gamelanInstruments.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Instrumen</div>
                </div>
                <div className="bg-card/60 backdrop-blur rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-2xl font-cultural-cta text-accent">
                    2
                  </div>
                  <div className="text-sm text-muted-foreground">Skala</div>
                </div>
                <div className="bg-card/60 backdrop-blur rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-2xl font-cultural-cta text-secondary">
                    {featuredCompositions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Komposisi</div>
                </div>
                <div className="bg-card/60 backdrop-blur rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-2xl font-cultural-cta text-success">
                    ∞
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Kemungkinan
                  </div>
                </div>
              </div>

              {/* Action Buttons (Professional Style) */}
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {/* Primary Button - Guided Session */}
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => openModal("guided-session")}
                  className="bg-gradient-to-r from-primary to-cultural-gold shadow-lg shadow-primary/50 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center rounded-xl px-6 py-3 font-semibold text-white"
                >
                  <Icon name="BookOpen" size={20} className="mr-3" />
                  Panduan Interaktif
                </Button>

                {/* Secondary Button - Composition Studio */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => openModal("composition-studio")}
                  className="border border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 flex items-center rounded-xl px-6 py-3 font-medium"
                >
                  <Icon name="Edit3" size={20} className="mr-3" />
                  Buat Musik
                </Button>

                {/* Ghost Button - Collaborative Session */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => openModal("collaborative-session")}
                  className="text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 flex items-center rounded-xl px-6 py-3 font-medium"
                >
                  <Icon name="Users" size={20} className="mr-3" />
                  Bergabung Sesi
                </Button>
              </div>
            </div>
          </section>

          {/* Instrument Playground */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-cultural-heading mb-4">
                  Orkestra Gamelan Virtual
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sentuh atau klik pad untuk memainkan alat musik, ciptakan
                  kombinasi, dan rasakan perbedaan skala.
                </p>
              </div>

              {/* Master Controls */}
              <div className="bg-card rounded-2xl shadow-puppet border border-border p-6 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Volume Master */}
                    <div className="flex items-center gap-3">
                      <Icon
                        name="Volume2"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <span className="text-sm font-cultural-cta">
                        Volume Master
                      </span>
                      <input
                        aria-label="Volume master"
                        type="range"
                        min="0"
                        max="100"
                        value={Math.round(masterVolume * 100)}
                        onChange={(e) => setMasterVolume(e.target.value / 100)}
                        className="w-32 h-2 rounded-full appearance-none cursor-pointer
                          bg-gradient-to-r from-primary to-cultural-gold
                          accent-primary hover:accent-cultural-gold"
                        style={{
                          background: `linear-gradient(to right, #f59e0b ${Math.round(
                            masterVolume * 100
                          )}%, #d1d5db ${Math.round(masterVolume * 100)}%)`,
                        }}
                      />
                      <span className="text-sm font-semibold text-foreground w-10 text-right">
                        {Math.round(masterVolume * 100)}%
                      </span>
                    </div>

                    {/* Tempo Control */}
                    <div className="flex items-center gap-3">
                      <Icon
                        name="Clock"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <span className="text-sm font-cultural-cta">Tempo</span>
                      <input
                        aria-label="Tempo"
                        type="range"
                        min="60"
                        max="200"
                        value={currentTempo}
                        onChange={(e) =>
                          setCurrentTempo(parseInt(e.target.value))
                        }
                        className="w-32 h-2 rounded-full appearance-none cursor-pointer
                          bg-gradient-to-r from-secondary to-accent
                          accent-secondary hover:accent-accent"
                        style={{
                          background: `linear-gradient(to right, #34d399 ${
                            ((currentTempo - 60) / 140) * 100
                          }%, #d1d5db ${((currentTempo - 60) / 140) * 100}%)`,
                        }}
                      />
                      <span className="text-sm font-semibold text-foreground w-12 text-right">
                        {currentTempo} BPM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm font-cultural-cta">Skala:</label>
                    <select
                      value={selectedScale}
                      onChange={(e) => setSelectedScale(e.target.value)}
                      className="bg-input border border-border rounded-lg px-3 py-1 text-sm"
                      aria-label="Pilih skala"
                    >
                      {Object.entries(scales).map(([key, scale]) => (
                        <option key={key} value={key}>
                          {scale.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted/20 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-cultural-cta text-foreground">
                      {scales[selectedScale].name} Skala
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {scales[selectedScale].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-cultural-cta text-primary">
                      Suasana: {scales[selectedScale].mood}
                    </div>
                    <div className="flex gap-1 mt-2"></div>
                  </div>
                </div>
              </div>

              {/* Instrument Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {gamelanInstruments.map((instr) => (
                  <InstrumentPad
                    key={instr.id}
                    instrument={instr}
                    onPlay={playInstrument}
                    isActive={selectedInstruments.some(
                      (i) => i.id === instr.id && i.lastPlayed
                    )}
                    volume={masterVolume}
                  />
                ))}
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  className="bg-card rounded-xl shadow-puppet border border-border p-6 cursor-pointer hover:shadow-cultural transition-transform transform hover:-translate-y-1"
                  onClick={() => openModal("guided-session")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-cultural-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="BookOpen"
                        size={28}
                        className="text-primary-foreground"
                      />
                    </div>
                    <h3 className="text-lg font-cultural-heading mb-2">
                      Panduan Interaktif
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pembelajaran berstruktur untuk memahami pola gamelan.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-card rounded-xl shadow-puppet border border-border p-6 cursor-pointer hover:shadow-cultural transition-transform transform hover:-translate-y-1"
                  onClick={() => openModal("composition-studio")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="Edit3"
                        size={28}
                        className="text-accent-foreground"
                      />
                    </div>
                    <h3 className="text-lg font-cultural-heading mb-2">
                      Studio Komposisi
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Buat karya asli dengan pola tradisional.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-card rounded-xl shadow-puppet border border-border p-6 cursor-pointer hover:shadow-cultural transition-transform transform hover:-translate-y-1"
                  onClick={() => openModal("collaborative-session")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="Users"
                        size={28}
                        className="text-success-foreground"
                      />
                    </div>
                    <h3 className="text-lg font-cultural-heading mb-2">
                      Sesi Kolaboratif
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Bermain bersama musisi lain secara real-time.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-card rounded-xl shadow-puppet border border-border p-6 cursor-pointer hover:shadow-cultural transition-transform transform hover:-translate-y-1"
                  onClick={() => openModal("progress-tracker")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-warning to-cultural-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="TrendingUp"
                        size={28}
                        className="text-warning-foreground"
                      />
                    </div>
                    <h3 className="text-lg font-cultural-heading mb-2">
                      Pelacak Kemajuan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pantau perkembangan dan capai milestone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Compositions */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-cultural-heading mb-4">
                  Komposisi Unggulan
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Kompilasi komposisi tradisional dan modern untuk inspirasi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCompositions.map((composition) => (
                  <div
                    key={composition.id}
                    className="bg-card rounded-xl shadow-puppet border border-border overflow-hidden group hover:shadow-cultural transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-cultural-heading text-foreground mb-1">
                            {composition.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {composition.composer}
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-cultural-cta ${getDifficultyColor(
                              composition.difficulty
                            )}`}
                          >
                            {composition.difficulty}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {composition.duration}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {composition.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Instrument:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {composition.instruments.map((instr, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-primary/20 rounded text-xs"
                              >
                                {instr}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              name="Music"
                              size={14}
                              className="text-primary"
                            />
                            <span className="text-xs text-muted-foreground">
                              {composition.scale} Skala
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon
                              name="Play"
                              size={14}
                              className="text-muted-foreground"
                            />
                            <span className="text-xs text-muted-foreground">
                              {composition.plays} Mulai
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Icon name="Play" size={16} className="mr-2" />{" "}
                            Dengarkan
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Icon name="BookOpen" size={16} className="mr-2" />{" "}
                            Belajar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 ">
                <Button variant="outline" size="lg">
                  <Icon name="Music" size={20} className="mr-2" /> Jelajahi
                  semua komposisi
                </Button>
              </div>
            </div>
          </section>

          {/* Cultural Context */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-cultural-heading mb-6">
                Jiwa Musik Indonesia
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Gamelan mewakili detak jantung budaya Indonesia — menyatukan
                  perunggu, bambu, dan suara manusia menjadi pengalaman musik
                  yang transendental.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <Icon
                    name="Globe"
                    size={48}
                    className="text-primary mx-auto mb-4"
                  />
                  <h3 className="text-lg font-cultural-heading mb-2">
                    Warisan UNESCO
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Diakui sebagai Karya Agung Warisan Lisan dan Takbenda
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Clock"
                    size={48}
                    className="text-accent mx-auto mb-4"
                  />
                  <h3 className="text-lg font-cultural-heading mb-2">
                    1000+ Tahun
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tradisi kuno yang diwariskan melalui generasi
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Heart"
                    size={48}
                    className="text-secondary mx-auto mb-4"
                  />
                  <h3 className="text-lg font-cultural-heading mb-2">
                    Budaya yang Hidup
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Terus berevolusi dan menginspirasi
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-cultural-gold rounded-full flex items-center justify-center">
                <img src="img/4.svg" alt="" />
              </div>
              <h3 className="text-xl font-cultural-heading">
                Wayang Interaktif
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Mempertahankan warisan budaya Indonesia melalui inovasi digital
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Wayang Interaktif</span>
              <span>•</span>
              <span>Pelestarian Warisan Budaya</span>
              <span>•</span>
              <span>Dibuat oleh SMK Telkom Malang</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <GuidedSession
          isOpen={activeModal === "guided-session"}
          onClose={closeModal}
        />

        <CompositionStudio
          isActive={activeModal === "composition-studio"}
          onClose={closeModal}
          instruments={gamelanInstruments}
          onSaveComposition={handleSaveComposition}
        />

        <CollaborativeSession
          isActive={activeModal === "collaborative-session"}
          onClose={closeModal}
        />

        <ProgressTracker
          isActive={activeModal === "progress-tracker"}
          onClose={closeModal}
          userProgress={userProgress}
        />
      </div>
    </>
  );
};

export default GamelanPlaygroundPage;
