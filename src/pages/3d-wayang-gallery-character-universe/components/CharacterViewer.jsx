import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CharacterViewer = ({ character, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [scale, setScale] = useState(1);
  const viewerRef = useRef(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'stories', label: 'Stories', icon: 'BookOpen' },
    { id: 'family', label: 'Family Tree', icon: 'Users' },
    { id: 'symbolism', label: 'Symbolism', icon: 'Eye' }
  ];

  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle(prev => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const handleRotationToggle = () => {
    setIsRotating(!isRotating);
  };

  const handleAudioPlay = () => {
    setAudioPlaying(!audioPlaying);
    // Mock audio functionality
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3 text-foreground">
                Profil Karakter
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {character?.fullDescription}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    Tipe Karakter
                  </div>
                  <div className="font-medium text-foreground capitalize">
                    {character?.type}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    Popularitas
                  </div>
                  <div className="font-medium text-foreground">
                    {character?.popularity}%
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3 text-foreground">
                Ajarkan Filsafat
              </h4>
              <div className="space-y-3">
                {character?.teachings?.map((teaching, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <Icon
                      name="Quote"
                      size={16}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="text-foreground font-medium mb-1">
                        {teaching?.principle}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {teaching?.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stories':
        return (
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg text-foreground">
              Penampilan Cerita
            </h4>
            {character?.storyAppearances?.map((story, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-foreground">
                    {story?.title}
                  </h5>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {story?.origin}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {story?.role}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{story?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{story?.otherCharacters} Karakter</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'family':
        return (
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg text-foreground">
              Koneksi Keluarga
            </h4>
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary-foreground font-bold text-lg">
                    {character?.name?.charAt(0)}
                  </span>
                </div>
                <div className="font-medium text-foreground">
                  {character?.name}
                </div>
              </div>

              <div className="space-y-4">
                {character?.familyTree?.map((relation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground font-medium text-sm">
                          {relation?.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {relation?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {relation?.relationship}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'symbolism':
        return (
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg text-foreground">
              Simbolisme Budaya
            </h4>
            {character?.symbolism?.map((symbol, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={symbol?.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-2">
                      {symbol?.element}
                    </h5>
                    <p className="text-muted-foreground text-sm mb-3">
                      {symbol?.meaning}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                        {symbol?.significance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-cultural z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onClose}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {character?.name}
                </h1>
                <p className="text-muted-foreground">
                  {character?.type} • {character?.origins?.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost">
                <Icon name="Share" size={16} />
              </Button>
              <Button variant="ghost">
                <Icon name="Heart" size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer */}
            <div className="space-y-4">
              <div
                ref={viewerRef}
                className="relative bg-gradient-to-b from-muted/30 to-muted/60 rounded-lg aspect-square overflow-hidden"
              >
                <Image
                  src={character?.image}
                  alt={character?.name}
                  className="w-full h-full object-cover transition-transform duration-cultural-slow"
                  style={{
                    transform: `rotate(${rotationAngle}deg) scale(${scale})`,
                  }}
                />

                {/* 3D Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2">
                    <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                      <Icon name="ZoomIn" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                      <Icon name="ZoomOut" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Lighting indicator */}
                <div className="absolute top-4 right-4">
                  <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                    <Icon
                      name="Lightbulb"
                      size={16}
                      className="text-primary gamelan-pulse"
                    />
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {character?.storyCount}
                  </div>
                  <div className="text-xs text-muted-foreground">Cerita</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {character?.familyConnections}
                  </div>
                  <div className="text-xs text-muted-foreground">Hubungan</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {character?.popularity}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Popularitas
                  </div>
                </div>
              </div>
            </div>

            {/* Content Panel */}
            <div className="space-y-6">
              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex space-x-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab?.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterViewer;