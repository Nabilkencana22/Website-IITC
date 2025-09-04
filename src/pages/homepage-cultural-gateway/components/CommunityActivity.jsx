import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityActivity = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentActivities = [
    {
      id: 1,
      user: "Sari Dewi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      action: "menyelesaikan cerita",
      target: "Arjuna dan Srikandi",
      time: "2 menit yang lalu",
      type: "story"
    },
    {
      id: 2,
      user: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      action: "membuat karakter baru",
      target: "Gatot Kaca Modern",
      time: "15 menit yang lalu",
      type: "creation"
    },
    {
      id: 3,
      user: "Maya Putri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      action: "menguasai teknik dalang",
      target: "Suara Hanoman",
      time: "1 jam yang lalu",
      type: "learning"
    },
    {
      id: 4,
      user: "Andi Rahman",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      action: "berbagi komposisi gamelan",
      target: "Melodi Perang Bharatayudha",
      time: "3 jam yang lalu",
      type: "music"
    }
  ];

  const topCreators = [
    {
      id: 1,
      name: "Indira Sari",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      creations: 24,
      likes: 1250,
      badge: "Master Dalang"
    },
    {
      id: 2,
      name: "Rizki Pratama",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      creations: 18,
      likes: 890,
      badge: "Storyteller"
    },
    {
      id: 3,
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      creations: 15,
      likes: 675,
      badge: "Character Designer"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'story': return 'BookOpen';
      case 'creation': return 'Palette';
      case 'learning': return 'GraduationCap';
      case 'music': return 'Music';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'story': return 'text-purple-500';
      case 'creation': return 'text-orange-500';
      case 'learning': return 'text-emerald-500';
      case 'music': return 'text-blue-500';
      default: return 'text-primary';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Komunitas Wayang Global</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Bergabung dengan
            <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text">
              Lingkaran Budaya
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Terhubung dengan ribuan penggemar wayang dari seluruh dunia. Berbagi kreasi, 
            belajar bersama, dan lestarikan budaya Indonesia dalam komunitas yang hidup.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Stats */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Statistik Komunitas
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Anggota Aktif</div>
                      <div className="text-lg font-bold text-foreground">1,247</div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-500 font-medium">+12% minggu ini</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cultural-gold/10 rounded-lg flex items-center justify-center">
                      <Icon name="Palette" size={20} className="text-cultural-gold" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Kreasi Dibagikan</div>
                      <div className="text-lg font-bold text-foreground">3,892</div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-500 font-medium">+8% minggu ini</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Heart" size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Apresiasi</div>
                      <div className="text-lg font-bold text-foreground">28,456</div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-500 font-medium">+15% minggu ini</div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
                  <div className="text-sm text-muted-foreground mb-2">Rating Komunitas</div>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon key={star} name="Star" size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('recent')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-cultural-normal ${
                      activeTab === 'recent' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Aktivitas Terbaru
                  </button>
                  <button
                    onClick={() => setActiveTab('creators')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-cultural-normal ${
                      activeTab === 'creators' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Kreator Teratas
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'recent' && (
                  <div className="space-y-4">
                    {recentActivities?.map((activity) => (
                      <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors duration-cultural-normal">
                        <Image
                          src={activity?.avatar}
                          alt={activity?.user}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground">{activity?.user}</span>
                            <Icon 
                              name={getActivityIcon(activity?.type)} 
                              size={14} 
                              className={getActivityColor(activity?.type)} 
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity?.action} <span className="text-foreground font-medium">"{activity?.target}"</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'creators' && (
                  <div className="space-y-4">
                    {topCreators?.map((creator, index) => (
                      <div key={creator?.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors duration-cultural-normal">
                        <div className="relative">
                          <Image
                            src={creator?.avatar}
                            alt={creator?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground">{creator?.name}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {creator?.badge}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{creator?.creations} kreasi</span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Heart" size={12} className="text-accent" />
                              <span>{creator?.likes}</span>
                            </span>
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
      </div>
    </section>
  );
};

export default CommunityActivity;