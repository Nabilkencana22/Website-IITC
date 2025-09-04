import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const defaultInstrumentSoundMap = {
  // fallback mapping if instruments prop doesn't include audioUrl
  Gong: "audio/gong-sound-effect-308757.mp3",
  Bonang: "audio/SUARA_BONANG.mp3",
  Saron: "audio/traditional music saron gangsa sound Alat Musik Traditional Saron Ukir HD.mp3",
  Kendang: "audio/Kendang_ Kendhang or Gendang _Free Download Sound Effects_.mp3",
  Suling: "audio/What_does_a_piccolo_sound_like_Ode_to_Joy.mp3",
  // add more as needed
};

const CompositionStudio = ({
  isActive = false,
  onClose,
  instruments = [], // optional: [{ id, name, audioUrl, ... }]
  onSaveComposition,
  className = "",
}) => {
  const [composition, setComposition] = useState({
    name: "Karya Baru",
    tempo: 120,
    scale: "pelog",
    tracks: [], // will be initialized from instruments prop if empty
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [visualizerLevel, setVisualizerLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const audioContextRef = useRef(null);
  const buffersRef = useRef({}); // keyed by instrumentName
  const playbackTimerRef = useRef(null);

  const scales = {
    pelog: {
      name: "Pelog",
      description: "Skala tujuh nada dengan interval yang tidak sama",
      notes: ["Do", "Ra", "Mi", "Fa", "Sol", "La", "Ti"],
    },
    slendro: {
      name: "Slendro",
      description: "Skala lima nada dengan interval yang sama",
      notes: ["Do", "Re", "Mi", "Sol", "La"],
    },
  };

  const patterns = [
    {
      name: "Dasar 4/4",
      beats: 16,
      pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      name: "Sincope",
      beats: 16,
      pattern: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    },
    { name: "Gong Tradisional", beats: 8, pattern: [1, 0, 0, 0, 1, 0, 0, 0] },
    {
      name: "Ritme Kompleks",
      beats: 12,
      pattern: [1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    },
  ];

  // Initialize tracks from instruments prop (max 8)
  useEffect(() => {
    if (instruments?.length > 0 && composition.tracks.length === 0) {
      const initial = instruments.slice(0, 8).map((ins, idx) => ({
        id: idx,
        instrumentId: ins.id || `ins-${idx}`,
        instrumentName: ins.name || `Instrumen ${idx + 1}`,
        audioUrl: ins.audioUrl || defaultInstrumentSoundMap[ins.name] || null,
        pattern: new Array(16).fill(0),
        volume: 0.8,
        muted: false,
        solo: false,
      }));
      setComposition((prev) => ({ ...prev, tracks: initial }));
    }
  }, [instruments]);

  // Setup / preload audio buffers for all tracks (use audioUrl if available)
  useEffect(() => {
    let mounted = true;
    const ensureAudioContext = () => {
      if (
        !audioContextRef.current ||
        audioContextRef.current.state === "closed"
      ) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      return audioContextRef.current;
    };

    const loadBuffer = async (name, url) => {
      if (!url) return;
      try {
        const resp = await fetch(url);
        const arrayBuffer = await resp.arrayBuffer();
        const audioBuffer = await ensureAudioContext().decodeAudioData(
          arrayBuffer
        );
        buffersRef.current[name] = audioBuffer;
      } catch (err) {
        // silent fail but log for debugging
        // console.warn("Failed loading sound", name, url, err);
      }
    };

    // load from composition.tracks (their audioUrl), fallback to default map
    composition.tracks.forEach((track) => {
      const name = track.instrumentName;
      const url = track.audioUrl || defaultInstrumentSoundMap[name];
      if (url && !buffersRef.current[name]) {
        loadBuffer(name, url);
      }
    });

    return () => {
      mounted = false;
      // do not close audioContext here to allow resume on play; close on unmount below
    };
  }, [composition.tracks]);

  // Clean up audioContext on unmount
  useEffect(() => {
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        try {
          audioContextRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  // helper: play buffer by instrumentName with gain control
  const playBuffer = (instrumentName, gain = 1) => {
    try {
      const audioCtx = audioContextRef.current;
      if (!audioCtx) return;
      const buffer = buffersRef.current[instrumentName];
      if (!buffer) return;
      const src = audioCtx.createBufferSource();
      src.buffer = buffer;
      const g = audioCtx.createGain();
      g.gain.value = gain;
      src.connect(g);
      g.connect(audioCtx.destination);
      src.start();
      // small visualizer trigger
      setVisualizerLevel(Math.min(100, 20 + Math.random() * 80));
      // cleanup (not strictly necessary — GC will handle)
      src.onended = () => {
        try {
          src.disconnect();
          g.disconnect();
        } catch (_) {}
      };
    } catch (e) {
      // console.error("playBuffer error", e);
    }
  };

  // Sequencer: when isPlaying true, step every 16th note
  useEffect(() => {
    if (!composition.tracks || composition.tracks.length === 0) return;

    const startSequencer = () => {
      // interval for 16th note: (60 / bpm) * 1000 / 4
      const intervalMs = ((60 / Math.max(20, composition.tempo)) * 1000) / 4;
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const next =
            (prev + 1) %
            Math.max(...composition.tracks.map((t) => t.pattern.length || 16));
          // trigger sounds for tracks that have 1 at next
          composition.tracks.forEach((track) => {
            const patternLen = track.pattern.length;
            const beat = track.pattern[next % patternLen];
            if (beat === 1 && !track.muted) {
              // prefer track.audioUrl or instrumentName mapping
              playBuffer(track.instrumentName, track.volume ?? 1);
            }
          });
          // visual decay
          setTimeout(() => setVisualizerLevel((v) => Math.max(0, v - 12)), 120);
          return next;
        });
      }, intervalMs);
    };

    if (isPlaying) {
      // resume audioContext if suspended (due to auto-play policies)
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current.resume().catch(() => {});
      }
      startSequencer();
    } else {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, composition.tempo, composition.tracks]);

  // Transport controls
  const togglePlay = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch (_) {}
    }
    setIsPlaying((prev) => {
      if (!prev) setCurrentBeat(0); // reset on start
      return !prev;
    });
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
    setVisualizerLevel(0);
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  };

  // Sequencer editing
  const toggleBeat = (trackIndex, beatIndex) => {
    setComposition((prev) => {
      const next = { ...prev };
      next.tracks = prev.tracks.map((t, ti) => {
        if (ti !== trackIndex) return t;
        const newPattern = t.pattern.map((b, bi) =>
          bi === beatIndex ? (b === 0 ? 1 : 0) : b
        );
        return { ...t, pattern: newPattern };
      });
      return next;
    });
  };

  const updateTrackVolume = (trackIndex, vol) => {
    setComposition((prev) => {
      const next = { ...prev };
      next.tracks = prev.tracks.map((t, ti) =>
        ti === trackIndex ? { ...t, volume: vol / 100 } : t
      );
      return next;
    });
  };

  const toggleTrackMute = (trackIndex) => {
    setComposition((prev) => {
      const next = { ...prev };
      next.tracks = prev.tracks.map((t, ti) =>
        ti === trackIndex ? { ...t, muted: !t.muted } : t
      );
      return next;
    });
  };

  const clearTrack = (trackIndex) => {
    setComposition((prev) => {
      const next = { ...prev };
      next.tracks = prev.tracks.map((t, ti) =>
        ti === trackIndex
          ? { ...t, pattern: new Array(t.pattern.length).fill(0) }
          : t
      );
      return next;
    });
  };

  const applyPattern = (trackIndex, patternData) => {
    if (!patternData) return;
    setComposition((prev) => {
      const next = { ...prev };
      next.tracks = prev.tracks.map((t, ti) =>
        ti === trackIndex ? { ...t, pattern: [...patternData.pattern] } : t
      );
      return next;
    });
  };

  const saveComposition = () => {
    if (!composition.name || !composition.name.trim()) {
      alert("Masukkan nama komposisi dulu.");
      return;
    }
    const data = {
      ...composition,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    onSaveComposition?.(data);
    alert("Komposisi tersimpan!");
  };

  // Visualizer bars array (Gen-Z neon)
  const visualBars = Array.from({ length: 8 }).map((_, i) => {
    const base = (visualizerLevel / 100) * 60;
    const variance = Math.max(4, Math.round(base * Math.random()));
    return Math.min(100, variance + Math.random() * 40);
  });

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${className}`}
      style={{ background: "linear-gradient(180deg,#0b0710aa,#0f0b12cc)" }}
    >
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-[linear-gradient(180deg,#05030a,rgba(255,255,255,0.02))] rounded-3xl shadow-2xl border border-white/6 overflow-hidden">
          {/* Header */}
          <div className="p-6 flex items-start justify-between border-b border-white/6 bg-gradient-to-r from-[#2b0332]/10 to-[#34243a]/6">
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
                <span className="text-2xl">🎼</span> Studio Komposisi
              </h2>
              <p className="text-sm text-pink-200/80 mt-1">
                Buat & rekam komposisi gamelan — setiap beat langsung bunyi
                sesuai instrumen.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Settings & Transport */}
          <div className="p-6 border-b border-white/6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Input
                label="Nama Komposisi"
                value={composition.name}
                onChange={(e) =>
                  setComposition((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Judul karya..."
              />
              <div>
                <label className="block text-xs text-white/80 mb-1">
                  Tempo (BPM)
                </label>
                <input
                  type="range"
                  min="40"
                  max="220"
                  value={composition.tempo}
                  onChange={(e) =>
                    setComposition((p) => ({
                      ...p,
                      tempo: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <div className="text-sm text-white/70 mt-1">
                  {composition.tempo} BPM
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">
                  Skala
                </label>
                <select
                  value={composition.scale}
                  onChange={(e) =>
                    setComposition((p) => ({ ...p, scale: e.target.value }))
                  }
                  className="w-full p-2 bg-[#0f0b12] border border-white/8 rounded"
                >
                  {Object.entries(scales).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.name}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-white/60 mt-1">
                  {scales[composition.scale].description}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={() => {
                    togglePlay();
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" onClick={stopPlayback}>
                  <Icon name="Square" size={16} /> Stop
                </Button>
                <Button variant="outline" onClick={saveComposition}>
                  <Icon name="Save" size={16} /> Simpan
                </Button>
              </div>
            </div>

            {/* Visualizer */}
            <div className="flex items-end gap-1 h-12 mt-2">
              {visualBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${Math.max(4, (h / 100) * 100)}%`,
                    background: `linear-gradient(180deg, rgba(255,60,160,0.95), rgba(255,190,60,0.9))`,
                    transition: "height 140ms ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sequencer Tracks */}
          <div className="p-6 space-y-4">
            {composition.tracks.map((track, ti) => {
              const patternLen = track.pattern.length || 16;
              return (
                <div
                  key={track.id}
                  className="bg-[#0b0610]/60 rounded-2xl p-4 border border-white/4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center text-black font-bold">
                        {track.instrumentName?.[0] || "I"}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {track.instrumentName}
                        </div>
                        <div className="text-xs text-white/60">
                          Vol: {Math.round((track.volume || 1) * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={Math.round((track.volume || 1) * 100)}
                        onChange={(e) =>
                          updateTrackVolume(ti, parseInt(e.target.value))
                        }
                      />
                      <Button
                        variant={track.muted ? "destructive" : "ghost"}
                        size="sm"
                        onClick={() => toggleTrackMute(ti)}
                      >
                        <Icon
                          name={track.muted ? "VolumeX" : "Volume2"}
                          size={16}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearTrack(ti)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                      <select
                        className="bg-transparent border border-white/6 text-white/80 rounded px-2 py-1"
                        onChange={(e) => {
                          const pat = patterns.find(
                            (p) => p.name === e.target.value
                          );
                          if (pat) applyPattern(ti, pat);
                        }}
                      >
                        <option value="">Pola</option>
                        {patterns.map((p) => (
                          <option key={p.name} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* beat grid with inline gridTemplateColumns */}
                  <div
                    className="grid gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${patternLen}, minmax(0, 1fr))`,
                    }}
                  >
                    {track.pattern.map((b, bi) => {
                      const isActiveBeat = currentBeat === bi && isPlaying;
                      return (
                        <button
                          key={bi}
                          onClick={() => toggleBeat(ti, bi)}
                          className={`h-10 rounded-md transition-transform duration-150 flex items-center justify-center text-xs ${
                            b === 1
                              ? "bg-gradient-to-br from-pink-500 to-amber-400 text-black shadow-lg"
                              : "bg-white/6 border border-white/8 text-white/70"
                          } ${
                            isActiveBeat
                              ? "scale-105 ring-2 ring-amber-400 animate-pulse"
                              : ""
                          } ${track.muted ? "opacity-50" : ""}`}
                        >
                          {bi % 4 === 0 ? (
                            <span className="font-bold text-[11px]">
                              {Math.floor(bi / 4) + 1}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer: scale reference */}
          <div className="p-6 border-t border-white/6 bg-[#08040a]/80">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold">
                  Referensi Skala: {scales[composition.scale].name}
                </div>
                <div className="flex gap-2 mt-2">
                  {scales[composition.scale].notes.map((n, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80"
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-white/60">
                <span className="mr-4">Tempo: {composition.tempo} BPM</span>
                <Button
                  variant="outline"
                  onClick={() => {
                    setComposition((prev) => ({
                      ...prev,
                      tracks: prev.tracks.map((t) => ({
                        ...t,
                        pattern: new Array(t.pattern.length).fill(0),
                      })),
                    }));
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompositionStudio;
