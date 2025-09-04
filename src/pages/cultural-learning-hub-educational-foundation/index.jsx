import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';

// Import components
import LearningPathCard from './components/LearningPathCard';
import ExpertCard from './components/ExpertCard';
import ResourceCard from './components/ResourceCard';
import ProgressTracker from './components/ProgressTracker';
import QuizCard from './components/QuizCard';
import CertificateCard from './components/CertificateCard';

const CulturalLearningHub = () => {
  const [activeTab, setActiveTab] = useState('paths');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for learning paths
  const learningPaths = [
    {
      id: 1,
      title: "Introduction to Wayang Kulit",
      description: "Discover the ancient art of Indonesian shadow puppetry, its history, cultural significance, and basic techniques.",
      level: "Beginner",
      duration: "4 weeks",
      enrolled: "2,847",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      features: ["Video Lessons", "Interactive Quizzes", "Cultural Context", "Expert Interviews"],
      progress: 0
    },
    {
      id: 2,
      title: "Wayang Character Universe",
      description: "Deep dive into the rich mythology and symbolism of wayang characters from Mahabharata and Ramayana epics.",
      level: "Intermediate",
      duration: "6 weeks",
      enrolled: "1,923",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      features: ["3D Character Gallery", "Mythology Stories", "Symbol Analysis", "Family Trees"],
      progress: 35
    },
    {
      id: 3,
      title: "Dalang Mastery Techniques",
      description: "Advanced training in voice techniques, puppet manipulation, and storytelling methods used by master dalang.",
      level: "Advanced",
      duration: "8 weeks",
      enrolled: "756",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      features: ["Voice Training", "Puppet Manipulation", "Performance Practice", "Master Classes"],
      progress: 0,
      isLocked: true
    },
    {
      id: 4,
      title: "Gamelan & Musical Heritage",
      description: "Explore the intricate world of gamelan music and its integral role in wayang performances.",
      level: "Beginner",
      duration: "5 weeks",
      enrolled: "1,456",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      features: ["Instrument Guide", "Rhythm Patterns", "Virtual Practice", "Ensemble Play"],
      progress: 78
    }
  ];

  // Mock data for experts
  const experts = [
    {
      id: 1,
      name: "Ki Manteb Sudarsono",
      title: "Master Dalang",
      location: "Yogyakarta, Indonesia",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.9,
      expertise: ["Wayang Kulit", "Voice Techniques", "Traditional Stories"],
      bio: "Renowned dalang with over 40 years of experience in traditional wayang kulit performances. Master of classical Javanese storytelling and puppet manipulation techniques.",
      students: "3,247",
      courses: "12",
      experience: "40+",
      isOnline: true,
      nextAvailable: "Tomorrow 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Sari Kusumawati",
      title: "Cultural Historian",
      location: "Jakarta, Indonesia",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.8,
      expertise: ["Cultural History", "Mythology", "Academic Research"],
      bio: "Leading scholar in Indonesian cultural studies with extensive research on wayang traditions and their contemporary relevance in modern society.",
      students: "1,892",
      courses: "8",
      experience: "25+",
      isOnline: false,
      nextAvailable: "Dec 15, 3:00 PM"
    },
    {
      id: 3,
      name: "Pak Bambang Wijaya",
      title: "Gamelan Master",
      location: "Solo, Indonesia",
      avatar: "https://randomuser.me/api/portraits/men/58.jpg",
      rating: 4.9,
      expertise: ["Gamelan", "Musical Composition", "Traditional Instruments"],
      bio: "Master musician specializing in gamelan orchestration for wayang performances. Expert in traditional Javanese musical scales and rhythm patterns.",
      students: "2,156",
      courses: "15",
      experience: "35+",
      isOnline: true,
      nextAvailable: "Today 7:00 PM"
    }
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "The Art of Shadow Puppetry",
      description: "Comprehensive documentary exploring the history and techniques of wayang kulit",
      type: "video",
      duration: "45 min",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      views: "12.5K",
      likes: "892",
      uploadDate: "2 weeks ago",
      tags: ["History", "Techniques", "Documentary"],
      isPremium: false
    },
    {
      id: 2,
      title: "Wayang Character Guide",
      description: "Complete reference guide to major wayang characters and their symbolism",
      type: "pdf",
      size: "15.2 MB",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      views: "8.7K",
      likes: "654",
      uploadDate: "1 month ago",
      tags: ["Characters", "Reference", "Mythology"],
      isPremium: true
    },
    {
      id: 3,
      title: "Traditional Gamelan Melodies",
      description: "Collection of authentic gamelan recordings from master musicians",
      type: "audio",
      duration: "2h 15min",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      views: "5.3K",
      likes: "423",
      uploadDate: "3 days ago",
      tags: ["Music", "Gamelan", "Traditional"],
      isPremium: false
    },
    {
      id: 4,
      title: "Interactive Character Quiz",
      description: "Test your knowledge of wayang characters and their stories",
      type: "quiz",
      duration: "15 min",
      thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
      views: "15.2K",
      likes: "1.2K",
      uploadDate: "1 week ago",
      tags: ["Quiz", "Interactive", "Learning"],
      isPremium: false
    }
  ];

  // Mock user progress data
  const userProgress = {
    level: 3,
    overallProgress: 67,
    streak: 12,
    totalTime: 45,
    certificates: 2,
    rank: "Cultural Explorer",
    lessonsCompleted: 24,
    charactersLearned: 15,
    storiesCompleted: 8,
    knowledgePoints: 1250
  };

  // Mock quiz data
  const sampleQuiz = {
    id: 1,
    title: "Wayang Character Knowledge",
    timeLimit: 10,
    questions: [
      {
        question: "Who is the main hero of the Mahabharata epic in wayang kulit?",
        options: ["Arjuna", "Bima", "Yudhistira", "Karna"],
        correctAnswer: 0
      },
      {
        question: "What does the color gold typically represent in wayang characters?",
        options: ["Evil", "Nobility", "Wisdom", "Strength"],
        correctAnswer: 1
      },
      {
        question: "Which instrument leads the gamelan orchestra in wayang performances?",
        options: ["Saron", "Kendang", "Gong", "Gender"],
        correctAnswer: 1
      }
    ]
  };

  // Mock certificates data
  const certificates = [
    {
      id: "CERT001",
      title: "Wayang Kulit Fundamentals",
      description: "Basic understanding of wayang kulit history, characters, and cultural significance",
      status: "earned",
      earnedDate: "Nov 15, 2024",
      progress: 100,
      requirements: [
        { title: "Complete Introduction Course", completed: true },
        { title: "Pass Character Quiz", completed: true },
        { title: "Submit Cultural Essay", completed: true }
      ],
      skills: ["Cultural History", "Character Recognition", "Basic Terminology"]
    },
    {
      id: "CERT002",
      title: "Gamelan Music Appreciation",
      description: "Understanding of gamelan instruments, scales, and their role in wayang performances",
      status: "in_progress",
      progress: 75,
      requirements: [
        { title: "Learn Instrument Types", completed: true },
        { title: "Practice Rhythm Patterns", completed: true },
        { title: "Complete Musical Theory", completed: false }
      ],
      skills: ["Musical Theory", "Instrument Knowledge", "Cultural Context"]
    },
    {
      id: "CERT003",
      title: "Advanced Dalang Techniques",
      description: "Master-level certification in dalang performance and storytelling methods",
      status: "locked",
      progress: 0,
      requirements: [
        { title: "Complete Intermediate Courses", completed: false },
        { title: "Voice Training Certification", completed: false },
        { title: "Performance Evaluation", completed: false }
      ],
      skills: ["Voice Techniques", "Puppet Manipulation", "Storytelling", "Performance"]
    }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'history', label: 'History & Culture' },
    { value: 'characters', label: 'Characters & Mythology' },
    { value: 'performance', label: 'Performance Arts' },
    { value: 'music', label: 'Gamelan & Music' }
  ];

  const tabs = [
    { id: 'paths', label: 'Learning Paths', icon: 'BookOpen' },
    { id: 'experts', label: 'Expert Teachers', icon: 'Users' },
    { id: 'resources', label: 'Resources', icon: 'Library' },
    { id: 'progress', label: 'My Progress', icon: 'TrendingUp' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' }
  ];

  const handleQuizComplete = (score) => {
    console.log(`Quiz completed with score: ${score}%`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cultural-gold/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Educational Foundation
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Cultural Learning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-cultural-gold">
                Hub
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive educational resources and structured learning pathways to master Indonesian wayang kulit traditions from beginner to advanced levels.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Start Learning Journey
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-12 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Learners", value: "12,500+", icon: "Users" },
              { label: "Expert Teachers", value: "45", icon: "Award" },
              { label: "Learning Hours", value: "50,000+", icon: "Clock" },
              { label: "Certificates Issued", value: "3,200+", icon: "Trophy" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center mb-12">
            <div className="flex bg-muted/30 rounded-xl p-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-cultural-normal ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-cultural'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          {(activeTab === 'paths' || activeTab === 'resources') && (
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-8">
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder={`Search ${activeTab === 'paths' ? 'learning paths' : 'resources'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>
              <Select
                options={levelOptions}
                value={selectedLevel}
                onChange={setSelectedLevel}
                placeholder="Select Level"
                className="w-full lg:w-48"
              />
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Category"
                className="w-full lg:w-48"
              />
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'paths' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {learningPaths?.map((path) => (
                <LearningPathCard
                  key={path?.id}
                  path={path}
                  progress={path?.progress}
                  isLocked={path?.isLocked}
                />
              ))}
            </div>
          )}

          {activeTab === 'experts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {experts?.map((expert) => (
                <ExpertCard key={expert?.id} expert={expert} />
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources?.map((resource) => (
                <ResourceCard key={resource?.id} resource={resource} />
              ))}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ProgressTracker userProgress={userProgress} />
              </div>
              <div>
                <QuizCard quiz={sampleQuiz} onComplete={handleQuizComplete} />
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {certificates?.map((certificate) => (
                <CertificateCard key={certificate?.id} certificate={certificate} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-cultural-gold/5 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Begin Your Cultural Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners discovering the rich heritage of Indonesian wayang kulit traditions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
            >
              <Icon name="Compass" size={20} className="mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-shadow-black border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-cultural-gold rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                    <path d="M12 2L8 8h8l-4-6zM8 8v8l4-2 4 2V8H8zM6 18h12v2H6v-2z"/>
                    <circle cx="10" cy="12" r="1"/>
                    <circle cx="14" cy="12" r="1"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">Wayang Interactive</h3>
                  <p className="text-sm text-muted-foreground">Cultural Learning Hub</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Preserving and sharing Indonesian cultural heritage through innovative digital education and immersive learning experiences.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Youtube']?.map((social) => (
                  <button key={social} className="text-muted-foreground hover:text-primary transition-colors duration-cultural-normal">
                    <Icon name={social} size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Learning</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/3d-wayang-gallery-character-universe" className="hover:text-primary transition-colors">Character Gallery</Link></li>
                <li><Link to="/virtual-dalang-theater-performance-experience" className="hover:text-primary transition-colors">Virtual Theater</Link></li>
                <li><Link to="/interactive-story-paths-narrative-adventures" className="hover:text-primary transition-colors">Story Adventures</Link></li>
                <li><Link to="/gamelan-playground-musical-exploration" className="hover:text-primary transition-colors">Gamelan Playground</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} Wayang Interactive. All rights reserved. Preserving culture through innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CulturalLearningHub;