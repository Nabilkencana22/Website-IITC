import React, { useState, useEffect, useMemo, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const SubtitleDisplay = ({
  isVisible,
  currentTime,
  selectedStory,
  currentScene,
  language = "javanese",
  isPlaying = true,
}) => {
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [ttsStatus, setTtsStatus] = useState("idle"); // idle, speaking, paused
  const spokenOnceRef = useRef(false);

  // Data subtitle dengan bahasa Jawa
  const subtitleData = useMemo(
    () => ({
      bharatayuddha: {
        1: [
          {
            start: 0,
            end: 6,
            javanese: "Kresna, aku ndeleng sedulurku ing medan perang iki.",
            indonesian: "Kresna, aku weruh para sadulurku ana ing palagan iki.",
            english: "Krishna, I see my brothers on this battlefield.",
            cultural_note:
              "Arjuna ngaturaké dhawuhe kanthi ajrih lan ajrih-asih marang Kresna, nggambarake sesambungan ilahi.",
          },
          {
            start: 6,
            end: 10,
            javanese: "Hatiku gemetar melihat mereka yang harus kulawan.",
            indonesian:
              "Atiku gumeter mirsani wong-wong sing kudu tak tandingi.",
            english: "My heart trembles seeing those I must fight against.",
            cultural_note:
              "Iki nggambarake dilema moral utama ing epos Bharatayuddha.",
          },
          {
            start: 10,
            end: 14,
            javanese:
              "Apakah benar aku harus berperang melawan keluargaku sendiri?",
            indonesian:
              "Apa pantes yen aku kudu perang nglawan kulawargaku dhewe?",
            english: "Is it right that I should fight against my own family?",
            cultural_note:
              "Pitakon bab dharma (kawajiban) lan tresna kulawarga ing kawicaksanan Jawa.",
          },
          {
            start: 14,
            end: 18,
            javanese: "Kresna, tunjukkan aku jalan yang benar.",
            indonesian: "Kresna, tulung tuntun aku marang dalan kang bener.",
            english: "Krishna, show me the righteous path.",
            cultural_note:
              "Arjuna nyuwun pitedah ilahi, tema inti ing filsafat wayang.",
          },
        ],
      },
      ramayana: {
        1: [
          {
            start: 0,
            end: 6,
            javanese:
              "Sita, permaisuriku yang cantik, telah diculik oleh Rahwana.",
            indonesian:
              "Sita, permaisuriku kang endah, wis diculik déning Rahwana.",
            english: "Sita, my beautiful queen, has been kidnapped by Rahwana.",
            cultural_note: "Susahé Rama dadi pambuka tumindak nylametaké Sita.",
          },
          {
            start: 6,
            end: 10,
            javanese:
              "Aku akan mengejar raja raksasa itu hingga ke ujung dunia.",
            indonesian:
              "Aku bakal ngoyak raja buta kuwi nganti tekan pucuking jagad.",
            english: "I will chase that demon king to the ends of the earth.",
            cultural_note: "Nuduhaké tekad lan kesetiaan Rama sing ora goyah.",
          },
          {
            start: 10,
            end: 16,
            javanese: "Hanuman, bantulah aku mencari jejak Sita.",
            indonesian: "Hanuman, tulung goleki tilasing Sita.",
            english: "Hanuman, help me find traces of Sita.",
            cultural_note: "Wiwtitaning legenda kasetyan lan bakti Hanuman.",
          },
        ],
      },
      folklore: {
        1: [
          {
            start: 0,
            end: 6,
            javanese:
              "Heh heh heh... Anak-anakku, dengarlah nasihat Bapak Semar.",
            indonesian:
              "Heh heh heh... Le, putu-putuku, rungokna piwulangé Bapa Semar.",
            english:
              "Heh heh heh... My children, listen to Father Semar's advice.",
            cultural_note:
              "Guyu khas Semar lan sapaan kebapaan marang putra-putrane.",
          },
          {
            start: 6,
            end: 10,
            javanese: "Hidup itu seperti pertunjukan wayang.",
            indonesian: "Urip kuwi koyo pentas wayang, le.",
            english: "Life is like a wayang performance.",
            cultural_note:
              "Tetesan kawicaksanan: urip minangka bayang-bayang lan peran.",
          },
          {
            start: 10,
            end: 16,
            javanese:
              "Ada yang bermain di depan layar, ada yang bekerja di belakang.",
            indonesian:
              "Ana sing ndelok ing ngarep kelir, ana sing nyambut gawe ana mburi.",
            english: "Some play in front of the screen, some work behind it.",
            cultural_note:
              "Piwulang ngenani peran lan pandhangan urip kang béda-béda.",
          },
        ],
      },
    }),
    []
  );

  // Hitung subtitle aktif
  useEffect(() => {
    const storySubtitles = subtitleData?.[selectedStory]?.[currentScene] || [];
    const activeSubtitle = storySubtitles?.find(
      (subtitle) =>
        currentTime >= subtitle?.start && currentTime < subtitle?.end
    );
    setCurrentSubtitle(activeSubtitle);
    spokenOnceRef.current = false;
  }, [currentTime, selectedStory, currentScene, subtitleData]);

  // Auto dubbing (TTS) bahasa Jawa
  useEffect(() => {
    if (!isVisible || !currentSubtitle || !isPlaying) return;
    if (!("speechSynthesis" in window)) return;

    // Pilih text sesuai language
    const text =
      language === "javanese"
        ? currentSubtitle?.javanese
        : language === "indonesian"
        ? currentSubtitle?.indonesian
        : currentSubtitle?.english;

    if (!text || spokenOnceRef.current) return;

    // Stop suara sebelumnya
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    setTtsStatus("speaking");

    // Cari voice Jawa -> fallback ID -> EN
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices() || [];
      // Coba jv-ID (kalau tersedia)
      let voice =
        voices.find((v) => /jv[-_]JV/i.test(v.lang)) ||
        voices.find((v) => /id[-_]ID/i.test(v.lang)) ||
        voices.find((v) => /en[-_]/i.test(v.lang));
      return voice || null;
    };

    const voice = pickVoice();
    if (voice) utter.voice = voice;

    utter.lang =
      voice?.lang ||
      (language === "javanese"
        ? "jv-JV"
        : language === "indonesian"
        ? "id-ID"
        : "en-US");

    // Kecepatan agak pelan supaya artikulasi jelas
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    // Mark supaya 1 baris cuma dibacakan sekali
    utter.onstart = () => {
      spokenOnceRef.current = true;
      setTtsStatus("speaking");
    };

    utter.onend = () => setTtsStatus("idle");
    utter.onerror = () => setTtsStatus("idle");

    // Safari/Chrome kadang butuh jeda mikro utk load voices
    const speakNow = () => window.speechSynthesis.speak(utter);
    if (window.speechSynthesis.getVoices().length === 0) {
      // Trigger load voices
      window.speechSynthesis.onvoiceschanged = () => speakNow();
    } else {
      speakNow();
    }

    // Bersih-bersih ketika unmount atau baris berganti
    return () => {
      window.speechSynthesis.cancel();
      setTtsStatus("idle");
    };
  }, [currentSubtitle, isVisible, isPlaying, language]);

  // Handle copy text
  const handleCopyText = () => {
    const lines = [
      `Jawa: ${currentSubtitle?.javanese}`,
      `Indonesia: ${currentSubtitle?.indonesian}`,
      `English: ${currentSubtitle?.english}`,
      `Catatan: ${currentSubtitle?.cultural_note}`,
    ].join("\n");

    navigator.clipboard?.writeText(lines).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Handle TTS replay
  const handleTTSReplay = () => {
    if (!currentSubtitle) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const text =
      language === "javanese"
        ? currentSubtitle?.javanese
        : language === "indonesian"
        ? currentSubtitle?.indonesian
        : currentSubtitle?.english;

    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices() || [];
    const voice =
      voices.find((v) => /jv[-_]ID/i.test(v.lang)) ||
      voices.find((v) => /id[-_]ID/i.test(v.lang)) ||
      voices.find((v) => /en[-_]/i.test(v.lang));

    if (voice) utter.voice = voice;

    utter.lang =
      voice?.lang ||
      (language === "javanese"
        ? "jv-ID"
        : language === "indonesian"
        ? "id-ID"
        : "en-US");

    utter.rate = 0.9;
    setTtsStatus("speaking");

    utter.onend = () => setTtsStatus("idle");
    utter.onerror = () => setTtsStatus("idle");

    window.speechSynthesis.speak(utter);
  };

  if (!isVisible || !currentSubtitle) return null;

  // Progress dots
  const dots = subtitleData?.[selectedStory]?.[currentScene] || [];

  // Varians animasi
  const panelVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedStory}-${currentScene}-${currentSubtitle?.start}`}
        className="absolute bottom-24 left-4 right-4 z-30"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="bg-gradient-to-b from-amber-950/90 to-amber-900/90 backdrop-blur-2xl rounded-2xl border border-amber-500/40 shadow-2xl p-5 md:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300/90 font-semibold">
              <Icon name="Captions" size={16} />
              <span>Subtitel Wayang</span>
              <div className="flex items-center gap-1 ml-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs font-normal normal-case">
                  {language === "javanese"
                    ? "Basa Jawa"
                    : language === "indonesian"
                    ? "Bahasa Indonesia"
                    : "English"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle catatan budaya */}
              <Button
                variant="ghost"
                size="sm"
                iconName="BookOpen"
                onClick={() => setShowNotes((v) => !v)}
                className={`p-2 rounded-full ${
                  showNotes
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
                tooltip={
                  showNotes ? "Sembunyikan catatan" : "Tampilkan catatan"
                }
              />

              {/* Toggle terjemahan */}
              <Button
                variant="ghost"
                size="sm"
                iconName={showTranslation ? "ChevronUp" : "ChevronDown"}
                onClick={() => setShowTranslation((v) => !v)}
                className="p-2 rounded-full bg-white/5 text-muted-foreground hover:text-foreground"
                tooltip={
                  showTranslation
                    ? "Sembunyikan terjemahan"
                    : "Tampilkan terjemahan"
                }
              />
            </div>
          </div>

          {/* Teks utama */}
          <div className="text-center space-y-3">
            <motion.p
              key={currentSubtitle?.javanese}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl md:text-2xl leading-relaxed font-cultural font-medium text-amber-50"
            >
              {language === "javanese"
                ? currentSubtitle?.javanese
                : language === "indonesian"
                ? currentSubtitle?.indonesian
                : currentSubtitle?.english}
            </motion.p>

            {/* Terjemahan (EN + ID) */}
            <AnimatePresence initial={false}>
              {showTranslation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 border-t border-amber-500/30 pt-3"
                >
                  <p className="text-sm text-amber-100/90 italic">
                    {currentSubtitle?.english}
                  </p>
                  <p className="text-sm text-amber-200/80">
                    {currentSubtitle?.indonesian}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Catatan Budaya */}
          <AnimatePresence initial={false}>
            {showNotes && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="border-t border-amber-500/30 pt-3"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name="Sparkles"
                    size={16}
                    className="text-amber-300 mt-0.5 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-amber-300">
                      Catatan Budaya
                    </p>
                    <p className="text-sm text-amber-100/90 leading-relaxed">
                      {currentSubtitle?.cultural_note}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kontrol dan informasi */}
          <div className="flex items-center justify-between pt-3 border-t border-amber-500/30">
            <div className="flex items-center gap-3 text-sm text-amber-200/80">
              <div className="flex items-center gap-1.5">
                <Icon name="Clock" size={14} />
                <span>
                  {Math.floor(currentSubtitle?.start)}s –{" "}
                  {Math.floor(currentSubtitle?.end)}s
                </span>
              </div>

              {/* Status TTS */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    ttsStatus === "speaking"
                      ? "bg-green-400 animate-pulse"
                      : "bg-amber-400/60"
                  }`}
                ></div>
                <span className="text-xs">
                  {ttsStatus === "speaking" ? "Sedang berbicara" : "Siap"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Baca ulang baris sekarang */}
              <Button
                variant="ghost"
                size="sm"
                iconName={ttsStatus === "speaking" ? "VolumeX" : "Volume2"}
                className="p-2 rounded-full bg-white/5 text-amber-200 hover:text-amber-50 hover:bg-amber-500/20"
                onClick={handleTTSReplay}
                tooltip="Dengarkan kembali"
              />

              {/* Salin teks */}
              <Button
                variant="ghost"
                size="sm"
                iconName={isCopied ? "Check" : "Copy"}
                className={`p-2 rounded-full ${
                  isCopied
                    ? "bg-green-500/20 text-green-300"
                    : "bg-white/5 text-amber-200 hover:text-amber-50 hover:bg-amber-500/20"
                }`}
                onClick={handleCopyText}
                tooltip={isCopied ? "Tersalin!" : "Salin teks"}
              />
            </div>
          </div>

          {/* Indikator progress (dot) */}
          <div className="flex items-center justify-center gap-2 pt-3">
            {dots.map((s, i) => {
              const isActive = currentTime >= s.start && currentTime < s.end;
              const isPassed = currentTime >= s.end;
              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 scale-125 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                      : isPassed
                      ? "bg-amber-400/60"
                      : "bg-amber-800/60"
                  }`}
                  title={`${s.start}s–${s.end}s`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubtitleDisplay;
