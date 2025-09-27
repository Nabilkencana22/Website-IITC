import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const VoiceTraining = ({ isOpen, onClose, selectedCharacter }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [audioURL, setAudioURL] = useState("");
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const animationRef = useRef(null);
  const timerRef = useRef(null);

  const characterVoices = {
    arjuna: {
      name: "Arjuna",
      description: "Suara pangeran yang lembut namun tegas",
      pitchRange: "Medium-Tinggi",
      emotion: "Bijaksana dan tenang",
      example: "Aku akan menjalankan dharmaku sebagai ksatria...",
      tips: [
        "Gunakan nada yang stabil dan percaya diri",
        "Pertahankan kelembutan dalam setiap ucapan",
        "Tunjukkan kebijaksanaan melalui intonasi"
      ]
    },
    semar: {
      name: "Semar",
      description: "Suara bijak dengan sentuhan humor",
      pitchRange: "Rendah-Medium",
      emotion: "Bijaksana dan menghibur",
      example: "Nak, hidup ini seperti wayang...",
      tips: [
        "Gunakan nada rendah yang hangat",
        "Sisipkan sedikit senyuman dalam suara",
        "Beri jeda untuk efek dramatis"
      ]
    },
    rahwana: {
      name: "Rahwana",
      description: "Suara berwibawa dan mengintimidasi",
      pitchRange: "Sangat Rendah",
      emotion: "Berkemauan keras dan kuat",
      example: "Tak ada yang bisa menghentikan aku!",
      tips: [
        "Gunakan suara dari diafragma",
        "Pertahankan volume yang konsisten",
        "Tunjukkan kekuatan melalui resonansi"
      ]
    }
  };

  const currentCharacter = characterVoices[selectedCharacter] || characterVoices.arjuna;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        analyzeRecording();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setFeedback("");
      setTrainingComplete(false);

      // Audio level simulation
      animateAudioLevel();

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error("Error accessing microphone:", error);
      setFeedback("Tidak dapat mengakses mikrofon. Pastikan izin sudah diberikan.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const animateAudioLevel = () => {
    const updateLevel = () => {
      setAudioLevel(Math.random() * 100);
      setPitch(Math.random() * 100);
      animationRef.current = requestAnimationFrame(updateLevel);
    };
    animationRef.current = requestAnimationFrame(updateLevel);
  };

  const analyzeRecording = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setTrainingComplete(true);
          generateFeedback();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateFeedback = () => {
    const feedbacks = [
      "Suara Anda sudah cukup baik! Coba perhatikan intonasi pada bagian dramatis.",
      "Volume suara konsisten. Tingkatkan variasi nada untuk karakter yang lebih hidup.",
      "Pengucapan jelas. Beri lebih banyak emosi pada dialog-dialog penting.",
      "Timing yang baik! Sekarang fokus pada ekspresi karakter melalui suara."
    ];
    setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
  };

  const resetTraining = () => {
    setTrainingComplete(false);
    setAudioURL("");
    setFeedback("");
    setProgress(0);
    setCurrentStep(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-amber-950 to-amber-900 rounded-3xl border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20 w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/20 to-amber-500/10 border-b border-amber-500/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Mic" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">
                  Pelatihan Suara
                </h2>
                <p className="text-amber-300">
                  Karakter: <span className="font-semibold">{currentCharacter.name}</span>
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Tutup pelatihan suara"
            >
              <Icon name="X" size={20} className="text-amber-300" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Character Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-900/30 rounded-2xl p-4 border border-amber-500/20"
          >
            <h3 className="text-lg font-semibold text-amber-300 mb-2">
              Profil Suara {currentCharacter.name}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-amber-200/80">Rentang Pitch:</span>
                <div className="text-amber-400 font-medium">{currentCharacter.pitchRange}</div>
              </div>
              <div>
                <span className="text-amber-200/80">Emosi:</span>
                <div className="text-amber-400 font-medium">{currentCharacter.emotion}</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-amber-800/20 rounded-xl">
              <p className="text-amber-200/90 italic">"{currentCharacter.example}"</p>
            </div>
          </motion.div>

          {/* Training Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-amber-300">Tips Suara</h3>
            <div className="space-y-2">
              {currentCharacter.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-amber-800/20 rounded-xl border border-amber-500/10"
                >
                  <Icon name="CheckCircle" size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-amber-200/90 text-sm">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recording Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-amber-300">
              {isRecording ? "Sedang Merekam..." : "Rekam Suara Anda"}
            </h3>

            {/* Audio Visualizer */}
            <div className="bg-amber-900/20 rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-amber-200/80">Level Audio</span>
                <span className="text-amber-400 font-mono">
                  {formatTime(recordingTime)}
                </span>
              </div>

              {/* Audio Bars */}
              <div className="flex items-end justify-center space-x-1 h-20 mb-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isRecording 
                        ? `${Math.max(10, Math.random() * 100)}%`
                        : "10%"
                    }}
                    transition={{ duration: 0.1 }}
                    className="w-2 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-full"
                    style={{ height: isRecording ? `${Math.random() * 100}%` : "10%" }}
                  />
                ))}
              </div>

              {/* Pitch Indicator */}
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-amber-200/80">Pitch:</span>
                <div className="flex-1 bg-amber-800/30 rounded-full h-2">
                  <motion.div
                    animate={{
                      width: isRecording ? `${pitch}%` : "0%"
                    }}
                    className="h-full bg-gradient-to-r from-green-400 to-amber-400 rounded-full"
                  />
                </div>
                <span className="text-amber-400 font-mono">
                  {Math.round(pitch)}%
                </span>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!isRecording && !trainingComplete ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startRecording}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold flex items-center space-x-3 shadow-lg hover:shadow-red-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400/50"
                >
                  <Icon name="Mic" size={20} />
                  <span>Mulai Rekam</span>
                </motion.button>
              ) : isRecording ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopRecording}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-semibold flex items-center space-x-3 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                >
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span>Stop Rekam</span>
                </motion.button>
              ) : null}

              {trainingComplete && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTraining}
                  className="px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-2xl font-semibold flex items-center space-x-3 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                >
                  <Icon name="RefreshCw" size={18} />
                  <span>Coba Lagi</span>
                </motion.button>
              )}
            </div>

            {/* Progress Analysis */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-800/20 rounded-2xl p-4 border border-amber-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-200/80">Menganalisis rekaman...</span>
                    <span className="text-amber-400 font-mono">{progress}%</span>
                  </div>
                  <div className="w-full bg-amber-800/30 rounded-full h-2">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-green-400 to-amber-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Icon name="Sparkles" size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-400 font-semibold mb-1">Feedback Ahli</h4>
                      <p className="text-green-200/90 text-sm leading-relaxed">{feedback}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio Playback */}
            <AnimatePresence>
              {audioURL && trainingComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-800/20 rounded-2xl p-4 border border-amber-500/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-amber-200/80">Rekaman Anda:</span>
                    <audio controls className="h-8">
                      <source src={audioURL} type="audio/wav" />
                      Browser Anda tidak mendukung pemutaran audio.
                    </audio>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 border-t border-amber-500/20 p-4">
          <div className="flex items-center justify-between text-sm text-amber-300/80">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} />
              <span>Rekam minimal 5 detik untuk analisis optimal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Icon name="Volume2" size={14} />
                <span>Gunakan headset untuk hasil terbaik</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceTraining;