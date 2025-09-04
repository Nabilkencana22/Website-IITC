import React, { useState, useEffect, useMemo, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const SubtitleDisplay = ({
  isVisible,
  currentTime,
  selectedStory,
  currentScene,
  // Default ke bahasa Jawa sesuai permintaan
  language = "javanese",
  // Opsional: kalau parent ngirim isPlaying, kita hormati; kalau tidak, TTS tetap nyala halus
  isPlaying = true,
}) => {
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const spokenOnceRef = useRef(false);

  // ====== DATA SUBTITLE DENGAN BAHASA JAWA ======
  // Catatan: Kita tetap simpan Indonesian & English agar toggle terjemahan tetap bekerja.
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

  // ====== HITUNG SUBTITLE AKTIF ======
  useEffect(() => {
    const storySubtitles = subtitleData?.[selectedStory]?.[currentScene] || [];
    const activeSubtitle = storySubtitles?.find(
      (subtitle) =>
        currentTime >= subtitle?.start && currentTime < subtitle?.end
    );
    setCurrentSubtitle(activeSubtitle);
    // reset flag supaya setiap baris anyar bisa dibacakan
    spokenOnceRef.current = false;
  }, [currentTime, selectedStory, currentScene, subtitleData]);

  // ====== AUTO DUBBING (TTS) BAHASA JAWA ======
  useEffect(() => {
    if (!isVisible || !currentSubtitle || !isPlaying) return;
    if (!("speechSynthesis" in window)) return;

    // pilih text sesuai language
    const text =
      language === "javanese"
        ? currentSubtitle?.javanese
        : language === "indonesian"
        ? currentSubtitle?.indonesian
        : currentSubtitle?.english;

    if (!text || spokenOnceRef.current) return;

    // stop suara sebelumnya dulu agar tidak tumpang tindih
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    // Cari voice Jawa -> fallback ID -> EN
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices() || [];
      // coba jv-ID (kalau tersedia)
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
    utter.onstart = () => (spokenOnceRef.current = true);

    // Safari/Chrome kadang butuh jeda mikro utk load voices
    const speakNow = () => window.speechSynthesis.speak(utter);
    if (window.speechSynthesis.getVoices().length === 0) {
      // trigger load voices
      window.speechSynthesis.onvoiceschanged = () => speakNow();
    } else {
      speakNow();
    }

    // Bersih-bersih ketika unmount atau baris berganti
    return () => window.speechSynthesis.cancel();
  }, [currentSubtitle, isVisible, isPlaying, language]);

  if (!isVisible || !currentSubtitle) return null;

  // ====== PROGRESS DOTS ======
  const dots = subtitleData?.[selectedStory]?.[currentScene] || [];

  // ====== VARIAN ANIMASI ======
  const panelVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 8, scale: 0.98 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedStory}-${currentScene}-${currentSubtitle?.start}`}
        className="absolute bottom-20 left-4 right-4 z-20"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariants}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="bg-black/65 backdrop-blur-xl rounded-2xl border border-amber-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-4 md:p-5 space-y-3">
          {/* Header mini */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-amber-300/80">
              <Icon name="Captions" size={14} />
              <span>Subtitel Wayang</span>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Toggle catatan budaya */}
              <Button
                variant="ghost"
                size="xs"
                iconName="BookOpen"
                onClick={() => setShowNotes((v) => !v)}
                className={`text-[11px] ${
                  showNotes ? "text-amber-300" : "text-muted-foreground"
                } hover:text-foreground`}
              >
                {showNotes ? "Catatan Nyala" : "Catatan Mati"}
              </Button>

              {/* Toggle terjemahan */}
              <Button
                variant="ghost"
                size="xs"
                iconName={showTranslation ? "ChevronUp" : "ChevronDown"}
                onClick={() => setShowTranslation((v) => !v)}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                {showTranslation
                  ? "Sembunyikan Terjemahan"
                  : "Lihat Terjemahan"}
              </Button>
            </div>
          </div>

          {/* Teks utama */}
          <div className="text-center space-y-2">
            <motion.p
              key={currentSubtitle?.javanese}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="text-lg md:text-xl leading-relaxed font-cultural-accent text-neutral-50"
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
                  transition={{ duration: 0.2 }}
                  className="space-y-1 border-t border-border/60 pt-2"
                >
                  <p className="text-sm text-neutral-300 italic">
                    {currentSubtitle?.english}
                  </p>
                  <p className="text-[13px] text-neutral-400">
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
                className="border-t border-border/60 pt-3"
              >
                <div className="flex items-start gap-2">
                  <Icon
                    name="Sparkles"
                    size={14}
                    className="text-amber-300 mt-0.5"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-amber-300">
                      Cathetan Budaya
                    </p>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentSubtitle?.cultural_note}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kontrol subtitel */}
          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Icon name="Clock" size={12} />
              <span>
                {Math.floor(currentSubtitle?.start)}s –{" "}
                {Math.floor(currentSubtitle?.end)}s
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Baca ulang baris sekarang */}
              <Button
                variant="ghost"
                size="xs"
                iconName="Volume2"
                className="text-neutral-300 hover:text-white"
                onClick={() => {
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
                  window.speechSynthesis.speak(utter);
                }}
              />

              {/* Salin teks */}
              <Button
                variant="ghost"
                size="xs"
                iconName="Copy"
                className="text-neutral-300 hover:text-white"
                onClick={() => {
                  const lines = [
                    `Jawa: ${currentSubtitle?.javanese}`,
                    `Indonesia: ${currentSubtitle?.indonesian}`,
                    `English: ${currentSubtitle?.english}`,
                    `Catatan: ${currentSubtitle?.cultural_note}`,
                  ].join("\n");
                  navigator.clipboard?.writeText(lines);
                  // Minimal notifikasi
                  try {
                    // gunakan browser alert sederhana (aman tanpa dep)
                    alert("Teks subtitel disalin.");
                  } catch (_) {}
                }}
              />
            </div>
          </div>

          {/* Indikator progress (dot) */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {dots.map((s, i) => {
              const isActive = currentTime >= s.start && currentTime < s.end;
              const isPassed = currentTime >= s.end;
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-amber-400 scale-125 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                      : isPassed
                      ? "bg-amber-400/50"
                      : "bg-neutral-500/40"
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
