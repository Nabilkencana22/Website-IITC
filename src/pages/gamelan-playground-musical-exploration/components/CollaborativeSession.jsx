import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborativeSession = ({ 
  isActive = false, 
  onClose, 
  currentUser = { id: 1, name: 'Kamu', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  className = '' 
}) => {
  const [sessionState, setSessionState] = useState('lobby'); // lobby, waiting, active, ended
  const [sessionCode, setSessionCode] = useState('');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [sessionSettings, setSessionSettings] = useState({
    maxParticipants: 6,
    tempo: 120,
    scale: 'pelog',
    difficulty: 'intermediate'
  });

  const messagesRef = useRef(null);

  // Mock participants data
  const mockParticipants = [
    {
      id: 1,
      name: 'Sari Dewi',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      instrument: 'Gong',
      status: 'ready',
      isHost: true
    },
    {
      id: 2,
      name: 'Budi Santoso',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      instrument: 'Saron',
      status: 'ready',
      isHost: false
    },
    {
      id: 3,
      name: 'Maya Putri',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      instrument: 'Kendang',
      status: 'waiting',
      isHost: false
    }
  ];

  const availableInstruments = [
    {
      id: "gong",
      name: "Gong",
      description: "Nada yang dalam dan resonan",
      color: "from-yellow-600 to-yellow-800",
    },
    {
      id: "saron",
      name: "Saron",
      description: "Metallofon melodi",
      color: "from-gray-400 to-gray-600",
    },
    {
      id: "kendang",
      name: "Kendang",
      description: "Dendang drum",
      color: "from-amber-600 to-amber-800",
    },
    {
      id: "bonang",
      name: "Bonang",
      description: "Lonceng gong",
      color: "from-orange-500 to-orange-700",
    },
    {
      id: "suling",
      name: "Suling",
      description: "Seruling bambu",
      color: "from-green-500 to-green-700",
    },
    {
      id: "rebab",
      name: "Rebab",
      description: "Senar gesek",
      color: "from-blue-500 to-blue-700",
    },
  ];

  useEffect(() => {
    if (isActive) {
      // Simulate joining a session
      setParticipants(mockParticipants);
      setSessionCode('GAME-2025');
      setMessages([
        {
          id: 1,
          user: "System",
          message: "Selamat datang di sesi gamelan kolaboratif!",
          timestamp: new Date(),
          type: "system",
        },
        {
          id: 2,
          user: "Sari Dewi",
          message:
            "Halo semuanya! Siap untuk membuat musik yang indah bersama?",
          timestamp: new Date(Date.now() - 60000),
          type: "chat",
        },
      ]);
    }
  }, [isActive]);

  useEffect(() => {
    if (messagesRef?.current) {
      messagesRef.current.scrollTop = messagesRef?.current?.scrollHeight;
    }
  }, [messages]);

  const createSession = () => {
    setIsHost(true);
    setSessionState('waiting');
    setSessionCode(`GAME-${Math.random()?.toString(36)?.substr(2, 4)?.toUpperCase()}`);
    addSystemMessage(
      "Sesi telah dibuat! Bagikan kode tersebut kepada teman-teman untuk bergabung."
    );
  };

  const joinSession = () => {
    if (!sessionCode?.trim()) {
      alert("Silakan masukkan kode sesi");
      return;
    }
    setSessionState('waiting');
    addSystemMessage(`Bergabung ke sesi ${sessionCode}`);
  };

  const startSession = () => {
    if (!isHost) return;
    setSessionState('active');
    addSystemMessage("Sesi dimulai! Biarkan musik dimulai!");
  };

  const leaveSession = () => {
    setSessionState('lobby');
    setParticipants([]);
    setMessages([]);
    setSelectedInstrument(null);
    onClose();
  };

  const selectInstrument = (instrument) => {
    setSelectedInstrument(instrument);
    addSystemMessage(`Kamu Memilih ${instrument?.name}`);
  };

  const sendMessage = () => {
    if (!newMessage?.trim()) return;

    const message = {
      id: Date.now(),
      user: currentUser?.name,
      message: newMessage,
      timestamp: new Date(),
      type: 'chat'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const addSystemMessage = (text) => {
    const message = {
      id: Date.now(),
      user: 'System',
      message: text,
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, message]);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      sendMessage();
    }
  };

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 bg-background/95 backdrop-blur-cultural z-50 overflow-y-auto ${className}`}
    >
      <div className="min-h-screen p-4">
        <div className="w-full max-w-6xl mx-auto bg-card rounded-2xl shadow-puppet border border-border overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-cultural-gold/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-cultural-heading text-foreground">
                  Sesi Kolaboratif
                </h2>
                <p className="text-muted-foreground font-cultural-body">
                  {sessionState === "lobby"
                    ? "Bergabung atau buat sesi"
                    : `Sesi: ${sessionCode}`}
                </p>
              </div>
              <Button variant="ghost" onClick={onClose}>
                <Icon name="X" size={24} />
              </Button>
            </div>
          </div>

          {/* Lobby */}
          {sessionState === "lobby" && (
            <div className="p-8">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <Icon
                    name="Users"
                    size={64}
                    className="text-primary mx-auto mb-4"
                  />
                  <h3 className="text-xl font-cultural-heading mb-2">
                    Terhubung dengan Musisi
                  </h3>
                  <p className="text-muted-foreground font-cultural-body">
                    Buat atau bergabung dengan sesi untuk bermain gamelan dengan
                    orang lain
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="default"
                    fullWidth
                    onClick={createSession}
                    className="bg-gradient-to-r from-primary to-cultural-gold"
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Buat Sesi Baru
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-muted-foreground">
                        or
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Input
                      label="Session Code"
                      value={sessionCode}
                      onChange={(e) =>
                        setSessionCode(e?.target?.value?.toUpperCase())
                      }
                      placeholder="Enter session code"
                    />
                    <Button variant="outline" fullWidth onClick={joinSession}>
                      <Icon name="LogIn" size={20} className="mr-2" />
                      Bergabung dengan Sesi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Waiting Room */}
          {sessionState === "waiting" && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Participants */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-cultural-heading mb-4">
                      Peserta ({participants?.length}/6)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {participants?.map((participant) => (
                        <div
                          key={participant?.id}
                          className="bg-muted/30 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={participant?.avatar}
                              alt={participant?.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-cultural-cta">
                                  {participant?.name}
                                </span>
                                {participant?.isHost && (
                                  <Icon
                                    name="Crown"
                                    size={16}
                                    className="text-primary"
                                  />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="Music" size={14} />
                                <span>
                                  {participant?.instrument || "No instrument"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-3 h-3 rounded-full ${
                                participant?.status === "ready"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instrument Selection */}
                  <div>
                    <h3 className="text-lg font-cultural-heading mb-4">
                      Pilih Instrumentmu
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableInstruments?.map((instrument) => (
                        <button
                          key={instrument?.id}
                          onClick={() => selectInstrument(instrument)}
                          className={`
                            p-4 rounded-lg border-2 transition-all duration-200
                            ${
                              selectedInstrument?.id === instrument?.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }
                          `}
                        >
                          <div
                            className={`w-8 h-8 rounded bg-gradient-to-br ${instrument?.color} mx-auto mb-2`}
                          ></div>
                          <div className="text-sm font-cultural-cta">
                            {instrument?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {instrument?.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {isHost && (
                    <div className="flex justify-center">
                      <Button
                        variant="default"
                        onClick={startSession}
                        className="bg-gradient-to-r from-primary to-cultural-gold"
                        disabled={participants?.length < 2}
                      >
                        <Icon name="Play" size={20} className="mr-2" />
                        Mulai Sesi
                      </Button>
                    </div>
                  )}
                </div>

                {/* Chat */}
                <div className="bg-muted/20 rounded-xl p-4">
                  <h3 className="text-lg font-cultural-heading mb-4">Pesan</h3>
                  <div
                    ref={messagesRef}
                    className="h-64 overflow-y-auto space-y-2 mb-4"
                  >
                    {messages?.map((message) => (
                      <div
                        key={message?.id}
                        className={`text-sm ${
                          message?.type === "system"
                            ? "text-muted-foreground italic"
                            : ""
                        }`}
                      >
                        <span className="font-cultural-cta">
                          {message?.user}:
                        </span>
                        <span className="ml-2">{message?.message}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e?.target?.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ketik Pesan..."
                      className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm"
                    />
                    <Button variant="ghost" size="sm" onClick={sendMessage}>
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Session */}
          {sessionState === "active" && (
            <div className="p-6">
              <div className="text-center py-12">
                <Icon
                  name="Music"
                  size={64}
                  className="text-primary mx-auto mb-4 animate-pulse"
                />
                <h3 className="text-2xl font-cultural-heading mb-2">
                  Sesi Aktif!
                </h3>
                <p className="text-muted-foreground font-cultural-body mb-6">
                  Mulai {selectedInstrument?.name || "instrument"} dengan{" "}
                  {participants?.length - 1} Musik lainnya
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setSessionState("waiting")}
                  >
                    <Icon name="Settings" size={20} className="mr-2" />
                    Pengaturan
                  </Button>
                  <Button variant="destructive" onClick={leaveSession}>
                    <Icon name="LogOut" size={20} className="mr-2" />
                    Keluar Sesi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeSession;