import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ 
  isActive = false, 
  onClose, 
  userProgress = {},
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});

  // Mock progress data
  const mockProgress = {
    level: 12,
    experience: 2450,
    nextLevelXP: 3000,
    totalPlayTime: 45.5, // hours
    songsLearned: 23,
    compositionsCreated: 8,
    collaborativeSessions: 15,
    rhythmAccuracy: 87.5,
    favoriteInstrument: 'Saron',
    currentStreak: 7 // days
  };

  const mockAchievements = [
    {
      id: 1,
      name: "Langkah Pertama",
      description: "Selesaikan pelajaran gamelan pertama Anda",
      icon: "Award",
      unlocked: true,
      unlockedAt: "2025-01-15",
      rarity: "common",
    },
    {
      id: 2,
      name: "Master Ritme",
      description: "Mencapai 90% akurasi dalam permainan ritme",
      icon: "Target",
      unlocked: false,
      progress: 87.5,
      target: 90,
      rarity: "rare",
    },
    {
      id: 3,
      name: "Komposer",
      description: "Buat 10 komposisi orisinal",
      icon: "Music",
      unlocked: false,
      progress: 8,
      target: 10,
      rarity: "epic",
    },
    {
      id: 4,
      name: "Duta Budaya",
      description: "Bagikan 5 komposisi dengan komunitas",
      icon: "Share2",
      unlocked: true,
      unlockedAt: "2025-02-20",
      rarity: "rare",
    },
    {
      id: 5,
      name: "Pemimpin Ensemble",
      description: "Menyelenggarakan 20 sesi kolaboratif",
      icon: "Users",
      unlocked: false,
      progress: 15,
      target: 20,
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Siswa yang berdedikasi",
      description: "Berlatih selama 7 hari berturut-turut",
      icon: "Calendar",
      unlocked: true,
      unlockedAt: "2025-03-01",
      rarity: "uncommon",
    },
  ];

  const skillCategories = [
    {
      name: "Ritme & Waktu",
      level: 8,
      progress: 75,
      skills: [
        { name: "Dasar Pola", level: 10, mastered: true },
        { name: "Ritme Kompleks", level: 7, mastered: false },
        { name: "Sinkopasi", level: 6, mastered: false },
      ],
    },
    {
      name: "Master Instrument",
      level: 6,
      progress: 60,
      skills: [
        { name: "Teknik Gong", level: 8, mastered: false },
        { name: "Bermain Saron", level: 9, mastered: true },
        { name: "Ritme Kendang", level: 4, mastered: false },
      ],
    },
    {
      name: "Komposisi",
      level: 5,
      progress: 45,
      skills: [
        { name: "Skala Pengetahuan", level: 7, mastered: false },
        { name: "Pengaturan", level: 5, mastered: false },
        { name: "Kreativitas", level: 6, mastered: false },
      ],
    },
    {
      name: "Pengetahuan Budaya",
      level: 7,
      progress: 70,
      skills: [
        { name: "Sejarah", level: 8, mastered: false },
        { name: "Tradisi", level: 7, mastered: false },
        { name: "Filsafat", level: 6, mastered: false },
      ],
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "composition",
      title: 'Diciptakan "Melodi Senja"',
      timestamp: "2 jam yang lalu",
      icon: "Music",
      xp: 150,
    },
    {
      id: 2,
      type: "rhythm_game",
      title: "Tantangan Ritme Lanjutan Selesai",
      timestamp: "1 hari Yang lalu",
      icon: "Target",
      xp: 100,
    },
    {
      id: 3,
      type: "collaboration",
      title: "bergabung dalam sesi dengan 4 musisi",
      timestamp: "2 hari yang lalu",
      icon: "Users",
      xp: 75,
    },
    {
      id: 4,
      type: "achievement",
      title: 'Mahasiswa Yang "Berdedikasi"',
      timestamp: "3 hari yang lalu",
      icon: "Award",
      xp: 200,
    },
  ];

  useEffect(() => {
    if (isActive) {
      setStats(mockProgress);
      setAchievements(mockAchievements);
    }
  }, [isActive]);

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'text-gray-400 border-gray-400',
      uncommon: 'text-green-400 border-green-400',
      rare: 'text-blue-400 border-blue-400',
      epic: 'text-purple-400 border-purple-400',
      legendary: 'text-yellow-400 border-yellow-400'
    };
    return colors?.[rarity] || colors?.common;
  };

  const getActivityIcon = (type) => {
    const icons = {
      composition: 'Music',
      rhythm_game: 'Target',
      collaboration: 'Users',
      achievement: 'Award',
      lesson: 'BookOpen'
    };
    return icons?.[type] || 'Activity';
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
                  Pelacak Kemajuan
                </h2>
                <p className="text-muted-foreground font-cultural-body">
                  Lacak perjalanan belajar gamelan Anda
                </p>
              </div>
              <Button variant="ghost" onClick={onClose}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            {/* Level Progress */}
            <div className="mt-6 p-4 bg-muted/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-cultural-cta">
                  Level {stats?.level}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stats?.experience}/{stats?.nextLevelXP} XP
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-cultural-gold h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats?.experience / stats?.nextLevelXP) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Ringkasan", icon: "BarChart3" },
                { id: "achievements", name: "Pencapaian", icon: "Award" },
                { id: "skills", name: "Keterampilan", icon: "TrendingUp" },
                { id: "activity", name: "Aktivitas", icon: "Activity" },
              ]?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center gap-2 py-4 px-2 border-b-2 font-cultural-cta text-sm
                    transition-colors duration-200
                    ${
                      activeTab === tab?.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  {tab?.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <Icon
                      name="Clock"
                      size={32}
                      className="text-primary mx-auto mb-2"
                    />
                    <div className="text-2xl font-cultural-cta">
                      {stats?.totalPlayTime}jam
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Waktu Bermain
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <Icon
                      name="Music"
                      size={32}
                      className="text-accent mx-auto mb-2"
                    />
                    <div className="text-2xl font-cultural-cta">
                      {stats?.songsLearned}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lagu yang Dipelajari
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <Icon
                      name="Edit3"
                      size={32}
                      className="text-secondary mx-auto mb-2"
                    />
                    <div className="text-2xl font-cultural-cta">
                      {stats?.compositionsCreated}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Komposisi
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <Icon
                      name="Users"
                      size={32}
                      className="text-success mx-auto mb-2"
                    />
                    <div className="text-2xl font-cultural-cta">
                      {stats?.collaborativeSessions}
                    </div>
                    <div className="text-sm text-muted-foreground">Sesi</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h3 className="text-lg font-cultural-heading mb-4">
                      Performa
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-cultural-cta">
                            Akurasi Ritme
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {stats?.rhythmAccuracy}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-success h-2 rounded-full"
                            style={{ width: `${stats?.rhythmAccuracy}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-cultural-cta">
                          Runtutan saat ini
                        </span>
                        <div className="flex items-center gap-1">
                          <Icon
                            name="Flame"
                            size={16}
                            className="text-accent"
                          />
                          <span className="text-sm">
                            {stats?.currentStreak} Hari
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-cultural-cta">
                          instrument Favorit
                        </span>
                        <span className="text-sm text-primary">
                          {stats?.favoriteInstrument}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded-xl p-6">
                    <h3 className="text-lg font-cultural-heading mb-4">
                      Prestasi Terbaru
                    </h3>
                    <div className="space-y-3">
                      {achievements
                        ?.filter((a) => a?.unlocked)
                        ?.slice(0, 3)
                        ?.map((achievement) => (
                          <div
                            key={achievement?.id}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-8 h-8 rounded border ${getRarityColor(
                                achievement?.rarity
                              )} flex items-center justify-center`}
                            >
                              <Icon name={achievement?.icon} size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-cultural-cta">
                                {achievement?.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {achievement?.unlockedAt}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements?.map((achievement) => (
                  <div
                    key={achievement?.id}
                    className={`
                      bg-muted/30 rounded-xl p-6 border-2 transition-all duration-200
                      ${
                        achievement?.unlocked
                          ? `${getRarityColor(achievement?.rarity)} shadow-lg`
                          : "border-muted-foreground/20 opacity-60"
                      }
                    `}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full border-2 ${getRarityColor(
                          achievement?.rarity
                        )} flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon name={achievement?.icon} size={32} />
                      </div>
                      <h3 className="font-cultural-heading mb-2">
                        {achievement?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {achievement?.description}
                      </p>

                      {achievement?.unlocked ? (
                        <div className="text-xs text-success font-cultural-cta">
                          Terbuka {achievement?.unlockedAt}
                        </div>
                      ) : achievement?.progress !== undefined ? (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Proses</span>
                            <span>
                              {achievement?.progress}/{achievement?.target}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${
                                  (achievement?.progress /
                                    achievement?.target) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          Terkunci
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                {skillCategories?.map((category, index) => (
                  <div key={index} className="bg-muted/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-cultural-heading">
                        {category?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-cultural-cta">
                          Level {category?.level}
                        </span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${category?.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category?.skills?.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="bg-muted/30 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-cultural-cta">
                              {skill?.name}
                            </span>
                            {skill?.mastered && (
                              <Icon
                                name="CheckCircle"
                                size={16}
                                className="text-success"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Level {skill?.level}
                            </span>
                            <div className="flex-1 bg-muted rounded-full h-1">
                              <div
                                className={`h-1 rounded-full ${
                                  skill?.mastered ? "bg-success" : "bg-primary"
                                }`}
                                style={{
                                  width: `${(skill?.level / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-4">
                {recentActivity?.map((activity) => (
                  <div
                    key={activity?.id}
                    className="bg-muted/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon
                          name={getActivityIcon(activity?.type)}
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cultural-cta">{activity?.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {activity?.timestamp}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-cultural-cta text-primary">
                          +{activity?.xp} XP
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;