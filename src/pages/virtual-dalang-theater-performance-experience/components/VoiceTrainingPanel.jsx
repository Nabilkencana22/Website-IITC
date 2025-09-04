import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceTrainingPanel = ({ isOpen, onClose, selectedCharacter }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [playingMaster, setPlayingMaster] = useState(false);
  const [playingUser, setPlayingUser] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const voiceCharacteristics = {
    arjuna: {
      name: 'Arjuna',
      type: 'Refined Hero',
      pitch: 'Medium-High',
      tempo: 'Moderate',
      style: 'Noble and contemplative',
      sample_text: `Kresna, aku bingung melihat saudara-saudaraku di medan perang.\nApakah benar aku harus berperang melawan mereka?`,
      techniques: [
        'Smooth, flowing delivery',
        'Slight vibrato on emotional words',
        'Pauses for contemplation',
        'Rising intonation for questions'
      ]
    },
    semar: {
      name: 'Semar',
      type: 'Divine Clown',
      pitch: 'Low-Medium',
      tempo: 'Variable',
      style: 'Wise yet humorous',
      sample_text: `Heh heh heh... Anak-anakku, hidup itu seperti wayang.\nAda yang di depan layar, ada yang di belakang.`,
      techniques: [
        'Characteristic chuckle (heh heh heh)',
        'Warm, fatherly tone',
        'Playful rhythm changes',
        'Emphasis on wisdom words'
      ]
    },
    rahwana: {
      name: 'Rahwana',
      type: 'Demon King',
      pitch: 'Deep',
      tempo: 'Slow and Powerful',
      style: 'Commanding and fierce',
      sample_text: `Aku Rahwana, raja Alengka yang perkasa!\nTidak ada yang dapat mengalahkan kekuatanku!`,
      techniques: [
        'Deep, resonant voice',
        'Dramatic pauses',
        'Forceful consonants',
        'Intimidating crescendos'
      ]
    }
  };

  const currentCharacter = voiceCharacteristics?.[selectedCharacter] || voiceCharacteristics?.arjuna;

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef?.current);
      setRecordingTime(0);
    }

    return () => clearInterval(timerRef?.current);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef?.current?.push(event?.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysisResult({
            pitch_accuracy: Math.floor(Math.random() * 30) + 70,
            tempo_match: Math.floor(Math.random() * 25) + 75,
            pronunciation: Math.floor(Math.random() * 20) + 80,
            emotional_delivery: Math.floor(Math.random() * 35) + 65,
            overall_score: Math.floor(Math.random() * 20) + 75,
            feedback: [
              'Good pitch control in the opening phrase',
              'Try to slow down during emotional moments',
              'Excellent pronunciation of traditional terms',
              'Work on building more dramatic tension'
            ]
          });
        }, 2000);
      };

      mediaRecorderRef?.current?.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.stop();
      mediaRecorderRef?.current?.stream?.getTracks()?.forEach(track => track?.stop());
      setIsRecording(false);
    }
  };

  const playMasterSample = () => {
    setPlayingMaster(true);
    // Simulate audio playback
    setTimeout(() => setPlayingMaster(false), 8000);
  };

  const playUserRecording = () => {
    if (recordedAudio) {
      setPlayingUser(true);
      const audio = new Audio(recordedAudio);
      audio.onended = () => setPlayingUser(false);
      audio?.play();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-cultural z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-puppet max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Latihan Suara - {currentCharacter?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Latih teknik suara dalang dengan umpan balik yang didukung AI
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Character Voice Profile */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h3 className="font-heading font-semibold text-foreground">
              Profil Suara Karakter
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Tipe:</span>
                <p className="font-medium text-foreground">
                  {currentCharacter?.type}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Pitch:</span>
                <p className="font-medium text-foreground">
                  {currentCharacter?.pitch}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Tempo:</span>
                <p className="font-medium text-foreground">
                  {currentCharacter?.tempo}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Gaya:</span>
                <p className="font-medium text-foreground">
                  {currentCharacter?.style}
                </p>
              </div>
            </div>
          </div>

          {/* Practice Text */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-foreground">
              Teks Latihan
            </h3>
            <div className="bg-parchment/10 border border-cultural-gold/20 rounded-lg p-4">
              <p className="text-foreground font-cultural-accent leading-relaxed whitespace-pre-line">
                {currentCharacter?.sample_text}
              </p>
            </div>
          </div>

          {/* Voice Techniques */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-foreground">
              Teknik Kunci
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentCharacter?.techniques?.map((technique, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-primary flex-shrink-0"
                  />
                  <span className="text-muted-foreground">{technique}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Master Sample */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground">
                Contoh Utama
              </h3>
              <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Rekaman dalan profesional
                  </span>
                  <span className="text-xs text-muted-foreground">0:08</span>
                </div>
                <Button
                  variant={playingMaster ? "secondary" : "default"}
                  fullWidth
                  iconName={playingMaster ? "Square" : "Play"}
                  iconPosition="left"
                  onClick={
                    playingMaster
                      ? () => setPlayingMaster(false)
                      : playMasterSample
                  }
                  disabled={playingMaster}
                >
                  {playingMaster
                    ? "Playing Master Sample..."
                    : "Play Master Sample"}
                </Button>
              </div>
            </div>

            {/* User Recording */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground">
                Rekaman kamu
              </h3>
              <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {isRecording
                      ? "Recording..."
                      : recordedAudio
                      ? "Recording Complete"
                      : "No Recording"}
                  </span>
                  {isRecording && (
                    <span className="text-xs text-error font-mono">
                      {formatTime(recordingTime)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    fullWidth
                    iconName={isRecording ? "Square" : "Mic"}
                    iconPosition="left"
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>

                  {recordedAudio && (
                    <Button
                      variant="outline"
                      iconName={playingUser ? "Square" : "Play"}
                      onClick={
                        playingUser
                          ? () => setPlayingUser(false)
                          : playUserRecording
                      }
                      disabled={playingUser}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Results */}
          {analysisResult && (
            <div className="space-y-4 bg-background/50 rounded-lg p-4 border border-border">
              <h3 className="font-heading font-semibold text-foreground">
                Hasil analisi AI
              </h3>

              {/* Score Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "Pitch", value: analysisResult?.pitch_accuracy },
                  { label: "Tempo", value: analysisResult?.tempo_match },
                  {
                    label: "Pronunciation",
                    value: analysisResult?.pronunciation,
                  },
                  {
                    label: "Emotion",
                    value: analysisResult?.emotional_delivery,
                  },
                  { label: "Overall", value: analysisResult?.overall_score },
                ]?.map((metric, index) => (
                  <div key={index} className="text-center space-y-1">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        metric?.value
                      )}`}
                    >
                      {metric?.value}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metric?.label}
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          metric?.value >= 85
                            ? "bg-success"
                            : metric?.value >= 70
                            ? "bg-warning"
                            : "bg-error"
                        }`}
                        style={{ width: `${metric?.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  Umpan Balik yang Detil
                </h4>
                <div className="space-y-1">
                  {analysisResult?.feedback?.map((feedback, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <Icon
                        name="MessageCircle"
                        size={14}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-muted-foreground">{feedback}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={() => {
                    setRecordedAudio(null);
                    setAnalysisResult(null);
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Save"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-cultural-gold"
                >
                  Simpan proses
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceTrainingPanel;