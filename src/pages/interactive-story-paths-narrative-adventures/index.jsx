import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StoryCard from './components/StoryCard';
import StoryReader from './components/StoryReader';
import StoryFilters from './components/StoryFilters';
import StoryStats from './components/StoryStats';
import StoryCompletion from './components/StoryCompletion';

const InteractiveStoryPathsPage = () => {
  const [currentView, setCurrentView] = useState('library'); // library, reading, completion
  const [selectedStory, setSelectedStory] = useState(null);
  const [completionData, setCompletionData] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    difficulty: 'all',
    progress: 'all',
    sortBy: 'newest',
    showFavorites: false,
    showNew: false,
    showRecommended: false
  });

  // Mock stories data
  const mockStories = [
    {
      id: 1,
      title: "The Kurukshetra Dilemma",
      description: "Navigate the moral complexities of the great war through Arjuna\'s eyes. Face impossible choices between duty and compassion in this epic tale of righteousness.",
      type: "Mahabharata",
      difficulty: "Advanced",
      estimatedTime: "45-60 min",
      pathsCount: 12,
      endingsCount: 8,
      progress: 0,
      isNew: true,
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Arjuna", role: "Protagonist" },
        { name: "Krishna", role: "Guide" },
        { name: "Duryodhana", role: "Antagonist" },
        { name: "Bhishma", role: "Elder" }
      ],
      chapters: [
        {
          title: "The Battlefield Awakens",
          content: `The morning mist clings to the vast plains of Kurukshetra as two mighty armies face each other. You are Arjuna, the greatest archer of your time, standing in your chariot with Krishna as your charioteer.\n\nAs you survey the battlefield, you see familiar faces on both sides - teachers, cousins, friends who are now enemies. Your bow, Gandiva, feels heavy in your hands. The conch shells are about to sound, signaling the beginning of the war that will determine the fate of the kingdom.\n\nKrishna notices your hesitation and speaks softly, "The time for doubt has passed, Arjuna. What troubles your warrior heart?"`,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
          location: "Kurukshetra Battlefield",
          culturalNote: "The Kurukshetra war represents the eternal struggle between dharma (righteousness) and adharma (unrighteousness). This moment captures the universal human dilemma of duty versus personal feelings.",
          characterThought: {
            character: "Arjuna",
            thought: "How can I fight against those who taught me, who raised me? Yet, if I don't fight, injustice will prevail. What is the right path?"
          },
          choices: [
            {
              text: "Express your doubts about fighting family and teachers",
              consequence: "Krishna will share the wisdom of the Bhagavad Gita",
              culturalContext: "This choice leads to one of the most important philosophical discussions in Hindu literature",
              characterImpact: [
                { character: "Krishna", type: "positive", change: "Becomes your spiritual guide" }
              ],
              nextChapter: 1
            },
            {
              text: "Steel yourself and prepare for battle immediately",
              consequence: "You miss the opportunity for spiritual guidance",
              culturalContext: "Acting without understanding dharma can lead to hollow victories",
              characterImpact: [
                { character: "Arjuna", type: "negative", change: "Gains strength but loses wisdom" }
              ],
              nextChapter: 2
            },
            {
              text: "Ask Krishna to drive the chariot between the armies for a closer look",
              consequence: "You\'ll witness the full scope of the conflict",
              culturalContext: "Sometimes we must face our challenges directly to understand them",
              characterImpact: [
                { character: "Krishna", type: "neutral", change: "Respects your need to understand" }
              ],
              nextChapter: 3
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Sita\'s Choice",
      description: "Experience the Ramayana from Sita\'s perspective. Make decisions that will shape her destiny and challenge traditional narratives with your choices.",
      type: "Ramayana",
      difficulty: "Intermediate",
      estimatedTime: "30-45 min",
      pathsCount: 10,
      endingsCount: 6,
      progress: 25,
      isNew: false,
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Sita", role: "Protagonist" },
        { name: "Rama", role: "Husband" },
        { name: "Ravana", role: "Antagonist" },
        { name: "Hanuman", role: "Ally" }
      ],
      chapters: [
        {
          title: "The Golden Deer",
          content: `You are Sita, living peacefully in the forest hermitage with Rama and Lakshmana. The morning sun filters through the trees as you tend to your small garden of herbs and flowers.\n\nSudenly, a magnificent golden deer appears at the edge of the clearing. Its coat shimmers like liquid gold, and its eyes seem almost human. You've never seen anything so beautiful, yet something about it feels... strange.\n\nRama is collecting firewood nearby, and Lakshmana is preparing the morning meal. The deer looks at you directly, as if calling to you.`,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
          location: "Forest Hermitage",
          culturalNote: "The golden deer (Maricha in disguise) represents how temptation often comes in beautiful forms. This moment tests Sita's wisdom and desire.",
          characterThought: {
            character: "Sita",thought: "Such beauty in the wild forest... but why do I feel a chill when I look into its eyes? Should I trust this feeling?"
          },
          choices: [
            {
              text: "Call Rama to see the beautiful deer",consequence: "This will set the events of your abduction in motion",culturalContext: "Sometimes our innocent desires can lead to great trials",
              characterImpact: [
                { character: "Rama", type: "neutral", change: "Will be drawn into the trap" }
              ],
              nextChapter: 1
            },
            {
              text: "Ignore the deer and continue with your morning tasks",consequence: "You avoid the trap but miss an important test",culturalContext: "Wisdom sometimes means resisting beautiful temptations",
              characterImpact: [
                { character: "Sita", type: "positive", change: "Gains wisdom through restraint" }
              ],
              nextChapter: 2
            },
            {
              text: "Approach the deer cautiously to examine it closer",consequence: "You\'ll discover the truth about its nature",
              culturalContext: "Direct investigation can reveal hidden truths",
              characterImpact: [
                { character: "Sita", type: "positive", change: "Develops intuitive powers" }
              ],
              nextChapter: 3
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "The Wise Fool of Majapahit",
      description: "Join Semar, the divine clown-advisor, as he navigates court politics with humor and wisdom. Your wit and timing will determine the kingdom's fate.",type: "Javanese Folklore",
      difficulty: "Beginner",estimatedTime: "20-30 min",pathsCount: 8,endingsCount: 5,progress: 100,isNew: false,coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Semar", role: "Protagonist" },
        { name: "King Brawijaya", role: "Ruler" },
        { name: "Patih Gajah Mada", role: "Minister" },
        { name: "Gareng", role: "Companion" }
      ],
      chapters: []
    },
    {
      id: 4,
      title: "The Last Shadow Master",description: "In a world where wayang kulit is fading, you are the last dalang master. Choose how to preserve this ancient art for future generations.",type: "Sundanese Tales",
      difficulty: "Intermediate",estimatedTime: "35-50 min",pathsCount: 15,endingsCount: 9,progress: 0,isNew: true,coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Dalang Surya", role: "Protagonist" },
        { name: "Dewi Sari", role: "Student" },
        { name: "Ki Bagus", role: "Elder Master" },
        { name: "Modern Director", role: "Challenger" }
      ],
      chapters: []
    },
    {
      id: 5,
      title: "Barong\'s Dance",description: "Experience the eternal battle between good and evil through the sacred Barong dance. Your spiritual choices will determine the cosmic balance.",type: "Balinese Legends",
      difficulty: "Advanced",estimatedTime: "40-55 min",pathsCount: 11,endingsCount: 7,progress: 60,isNew: false,coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Barong", role: "Good Spirit" },
        { name: "Rangda", role: "Evil Witch" },
        { name: "Village Priest", role: "Guide" },
        { name: "Young Dancer", role: "Student" }
      ],
      chapters: []
    },
    {
      id: 6,
      title: "The Merchant\'s Dilemma",description: "Navigate the spice trade routes of ancient Nusantara. Balance profit, ethics, and cultural exchange in this tale of maritime adventure.",type: "Javanese Folklore",
      difficulty: "Beginner",estimatedTime: "25-35 min",pathsCount: 9,endingsCount: 4,progress: 0,isNew: false,coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      mainCharacters: [
        { name: "Pak Dagang", role: "Protagonist" },
        { name: "Captain Laut", role: "Ship Captain" },
        { name: "Princess Tanjung", role: "Royal Customer" },
        { name: "Rival Merchant", role: "Competitor" }
      ],
      chapters: []
    }
  ];

  // Mock user stats
  const mockStats = {
    completedStories: 12,
    pathsExplored: 47,
    uniqueEndings: 23,
    culturalInsights: 156,
    totalReadingTime: "8h 32m",
    charactersMet: 89,
    level: 7,
    currentLevelProgress: 340,
    nextLevelRequirement: 500,
    recentAchievements: [
      {
        title: "Wisdom Seeker",
        description: "Discovered 10 cultural insights in a single story",
        earnedAt: "2 days ago"
      },
      {
        title: "Path Explorer",
        description: "Explored 5 different paths in one story",
        earnedAt: "1 week ago"
      },
      {
        title: "Character Whisperer",
        description: "Met 50 unique characters across all stories",
        earnedAt: "2 weeks ago"
      }
    ]
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      difficulty: 'all',
      progress: 'all',
      sortBy: 'newest',
      showFavorites: false,
      showNew: false,
      showRecommended: false
    });
  };

  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setCurrentView('reading');
  };

  const handleStoryComplete = (completionData) => {
    setCompletionData(completionData);
    setCurrentView('completion');
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
    setSelectedStory(null);
    setCompletionData(null);
  };

  const handleRestartStory = () => {
    setCurrentView('reading');
    setCompletionData(null);
  };

  const handleShareJourney = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: `I just completed "${completionData?.story?.title}" on Wayang Interactive!`,
        text: `Check out my journey through this amazing Indonesian story with ${completionData?.path?.length} choices and a ${completionData?.ending?.type} ending!`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I just completed "${completionData?.story?.title}" on Wayang Interactive! Check out this amazing Indonesian story experience.`;
      navigator.clipboard?.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  const filterStories = (stories) => {
    return stories?.filter(story => {
      // Search filter
      if (filters?.search && !story?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !story?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !story?.mainCharacters?.some(char => char?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()))) {
        return false;
      }

      // Type filter
      if (filters?.type !== 'all' && story?.type !== filters?.type) {
        return false;
      }

      // Difficulty filter
      if (filters?.difficulty !== 'all' && story?.difficulty !== filters?.difficulty) {
        return false;
      }

      // Progress filter
      if (filters?.progress !== 'all') {
        if (filters?.progress === 'not_started' && story?.progress > 0) return false;
        if (filters?.progress === 'in_progress' && (story?.progress === 0 || story?.progress === 100)) return false;
        if (filters?.progress === 'completed' && story?.progress !== 100) return false;
      }

      // Quick filters
      if (filters?.showNew && !story?.isNew) return false;
      if (filters?.showFavorites && !story?.isFavorite) return false;
      if (filters?.showRecommended && !story?.isRecommended) return false;

      return true;
    });
  };

  const sortStories = (stories) => {
    const sorted = [...stories];
    switch (filters?.sortBy) {
      case 'popular':
        return sorted?.sort((a, b) => (b?.popularity || 0) - (a?.popularity || 0));
      case 'difficulty_asc':
        const diffOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return sorted?.sort((a, b) => diffOrder?.[a?.difficulty] - diffOrder?.[b?.difficulty]);
      case 'difficulty_desc':
        const diffOrderDesc = { 'Advanced': 1, 'Intermediate': 2, 'Beginner': 3 };
        return sorted?.sort((a, b) => diffOrderDesc?.[a?.difficulty] - diffOrderDesc?.[b?.difficulty]);
      case 'shortest':
        return sorted?.sort((a, b) => parseInt(a?.estimatedTime) - parseInt(b?.estimatedTime));
      case 'longest':
        return sorted?.sort((a, b) => parseInt(b?.estimatedTime) - parseInt(a?.estimatedTime));
      case 'newest':
      default:
        return sorted?.sort((a, b) => b?.id - a?.id);
    }
  };

  const filteredAndSortedStories = sortStories(filterStories(mockStories));

  if (currentView === 'reading' && selectedStory) {
    return (
      <>
        <Helmet>
          <title>{selectedStory?.title} - Interactive Story Paths | Wayang Interactive</title>
          <meta name="description" content={selectedStory?.description} />
        </Helmet>
        <StoryReader
          story={selectedStory}
          onBack={handleBackToLibrary}
          onComplete={handleStoryComplete}
        />
      </>
    );
  }

  if (currentView === 'completion' && completionData) {
    return (
      <>
        <Helmet>
          <title>Story Complete - {completionData?.story?.title} | Wayang Interactive</title>
          <meta name="description" content={`You've completed ${completionData?.story?.title} with a ${completionData?.ending?.type} ending!`} />
        </Helmet>
        <StoryCompletion
          completionData={completionData}
          onRestart={handleRestartStory}
          onNewStory={handleBackToLibrary}
          onShare={handleShareJourney}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Interactive Story Paths - Narrative Adventures | Wayang Interactive</title>
        <meta name="description" content="Choose-your-own-adventure platform transforming epic Indonesian tales into engaging decision trees with multiple endings and character development arcs." />
        <meta name="keywords" content="interactive stories, Indonesian folklore, Mahabharata, Ramayana, choose your adventure, wayang kulit, cultural education" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Icon name="BookOpen" size={16} />
                <span>Interactive Storytelling Experience</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Interactive Story
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-cultural-gold">
                  Narrative Adventures
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Embark on epic journeys through Indonesian mythology and folklore. Your choices shape the story, 
                determine character fates, and unlock ancient wisdom through interactive decision trees.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
                >
                  Begin Your Adventure
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Info"
                  iconPosition="left"
                >
                  How It Works
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockStories?.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Epic Stories
                </div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-cultural-gold mb-1">
                  {mockStories?.reduce((sum, story) => sum + story?.pathsCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Story Paths
                </div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent mb-1">
                  {mockStories?.reduce((sum, story) => sum + story?.endingsCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Unique Endings
                </div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-success mb-1">
                  {mockStories?.reduce((sum, story) => sum + story?.mainCharacters?.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Characters
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <StoryStats stats={mockStats} />
                
                {/* Featured Story */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <h3 className="text-lg font-heading font-bold text-card-foreground mb-4">
                    Featured Story
                  </h3>
                  <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
                      alt="Featured Story"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white font-medium text-sm">
                        The Kurukshetra Dilemma
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience the moral complexities of the Mahabharata through Arjuna's eyes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Start Reading
                  </Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <StoryFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  className="mb-8"
                />

                {/* Stories Grid */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Story Library
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="BookOpen" size={16} />
                      <span>{filteredAndSortedStories?.length} stories available</span>
                    </div>
                  </div>

                  {filteredAndSortedStories?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredAndSortedStories?.map((story) => (
                        <StoryCard
                          key={story?.id}
                          story={story}
                          onSelect={handleStorySelect}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                        <Icon name="Search" size={24} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No stories found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms to find more stories.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                © {new Date()?.getFullYear()} Wayang Interactive. Preserving Indonesian heritage through interactive storytelling.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InteractiveStoryPathsPage;