import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RhythmGame = ({
  isActive = false,
  onClose,
  onScoreUpdate,
  difficulty = "beginner",
  className = "",
}) => {
  const [gameState, setGameState] = useState("ready"); // ready, playing, paused, finished
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const difficultySettings = {
    beginner: { bpm: 80, patternLength: 4, timeLimit: 90 },
    intermediate: { bpm: 120, patternLength: 8, timeLimit: 60 },
    advanced: { bpm: 160, patternLength: 12, timeLimit: 45 },
  };

  const rhythmPatterns = {
    beginner: [
      [1, 0, 1, 0],
      [1, 1, 0, 1],
      [1, 0, 0, 1],
    ],
    intermediate: [
      [1, 0, 1, 1, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 1, 0, 0],
    ],
    advanced: [
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
      [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
    ],
  };

  useEffect(() => {
    if (isActive && gameState === "ready") {
      generateNewPattern();
    }
  }, [isActive, difficulty]);

  useEffect(() => {
    if (gameState === "playing") {
      const settings = difficultySettings?.[difficulty];
      const beatInterval = (60 / settings?.bpm) * 1000;

      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => (prev + 1) % pattern?.length);
      }, beatInterval);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    };
  }, [gameState, pattern?.length, difficulty]);

  const generateNewPattern = () => {
    const patterns = rhythmPatterns?.[difficulty];
    const randomPattern =
      patterns?.[Math.floor(Math.random() * patterns?.length)];
    setPattern(randomPattern);
    setUserInput(new Array(randomPattern.length)?.fill(null));
    setCurrentBeat(0);
    setTimeLeft(difficultySettings?.[difficulty]?.timeLimit);
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    generateNewPattern();
  };

  const pauseGame = () => {
    if (gameState === "paused") {
      setGameState("playing");
    } else {
      setGameState("paused");
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    }
  };

  const endGame = () => {
    setGameState("finished");
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);
    onScoreUpdate?.(score);
  };

  const handleBeatInput = (beatIndex, shouldHit) => {
    if (gameState !== "playing") return;

    const newInput = [...userInput];
    newInput[beatIndex] = shouldHit ? 1 : 0;
    setUserInput(newInput);

    const expectedBeat = pattern?.[beatIndex];
    const isCorrect =
      (shouldHit && expectedBeat === 1) || (!shouldHit && expectedBeat === 0);

    if (isCorrect) {
      setStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((best) => Math.max(best, newStreak));
        return newStreak;
      });
      setScore((prev) => prev + 10 * (streak + 1));
    } else {
      setStreak(0);
    }

    if (newInput?.every((input) => input !== null)) {
      setTimeout(() => {
        generateNewPattern();
      }, 500);
    }
  };

  const getBeatStatus = (index) => {
    if (userInput?.[index] === null) {
      return currentBeat === index ? "current" : "waiting";
    }
    const expected = pattern?.[index];
    const actual = userInput?.[index];
    return expected === actual ? "correct" : "incorrect";
  };

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-cultural-gold/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-cultural-heading text-foreground">
                Tantangan Ritme
              </h2>
              <p className="text-muted-foreground font-cultural-body capitalize">
                {difficulty} Level
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <Icon name="X" size={24} />
            </Button>
          </div>

          {/* Game Stats */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-cultural-cta">Skor: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="text-sm font-cultural-cta">
                Runtutan: {streak}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-cultural-cta">
                Waktu: {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Music" size={16} className="text-secondary" />
              <span className="text-sm font-cultural-cta">
                BPM: {difficultySettings?.[difficulty]?.bpm}
              </span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="p-8">
          {gameState === "ready" && (
            <div className="text-center py-12">
              <Icon
                name="Play"
                size={64}
                className="text-primary mx-auto mb-4"
              />
              <h3 className="text-xl font-cultural-heading mb-2">
                Siap untuk Bermain?
              </h3>
              <p className="text-muted-foreground mb-6 font-cultural-body">
                Ikuti pola ritme dengan memukul ketukan pada waktu yang tepat.
              </p>
              <Button
                variant="default"
                onClick={startGame}
                className="bg-gradient-to-r from-primary to-cultural-gold"
              >
                Mulai Bermain
              </Button>
            </div>
          )}

          {(gameState === "playing" || gameState === "paused") && (
            <div className="space-y-8">
              {/* Pattern Display */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h4 className="text-lg font-cultural-heading mb-4 text-center">
                  Ikuti Pola Ini
                </h4>
                <div className="flex justify-center gap-2 mb-6">
                  {pattern?.map((beat, index) => (
                    <div
                      key={`beat-${index}`}
                      className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center
                        transition-all duration-200
                        ${
                          getBeatStatus(index) === "current"
                            ? "border-primary bg-primary/20 scale-110"
                            : ""
                        }
                        ${
                          getBeatStatus(index) === "correct"
                            ? "border-success bg-success/20"
                            : ""
                        }
                        ${
                          getBeatStatus(index) === "incorrect"
                            ? "border-destructive bg-destructive/20"
                            : ""
                        }
                        ${
                          getBeatStatus(index) === "waiting"
                            ? "border-muted-foreground/30"
                            : ""
                        }
                      `}
                    >
                      {beat === 1 && (
                        <Icon
                          name="Volume2"
                          size={20}
                          className="text-current"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleBeatInput(currentBeat, true)}
                    disabled={
                      gameState === "paused" ||
                      userInput?.[currentBeat] !== null
                    }
                    className="px-8"
                  >
                    <Icon name="Volume2" size={20} className="mr-2" />
                    Memukul
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => handleBeatInput(currentBeat, false)}
                    disabled={
                      gameState === "paused" ||
                      userInput?.[currentBeat] !== null
                    }
                    className="px-8"
                  >
                    <Icon name="VolumeX" size={20} className="mr-2" />
                    Lewati
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={pauseGame}>
                  <Icon
                    name={gameState === "paused" ? "Play" : "Pause"}
                    size={20}
                    className="mr-2"
                  />
                  {gameState === "paused" ? "Resume" : "Pause"}
                </Button>
                <Button variant="destructive" onClick={endGame}>
                  <Icon name="Square" size={20} className="mr-2" />
                  Akhiri Permainan
                </Button>
              </div>
            </div>
          )}

          {gameState === "finished" && (
            <div className="text-center py-12">
              <Icon
                name="Trophy"
                size={64}
                className="text-primary mx-auto mb-4"
              />
              <h3 className="text-2xl font-cultural-heading mb-2">
                Game Selesai!
              </h3>
              <div className="space-y-2 mb-6">
                <p className="text-lg font-cultural-cta">Skor Akhir: {score}</p>
                <p className="text-muted-foreground font-cultural-body">
                  Runtutan Terbaik: {bestStreak}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setGameState("ready")}>
                  Main Lagi
                </Button>
                <Button variant="default" onClick={onClose}>
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RhythmGame;
