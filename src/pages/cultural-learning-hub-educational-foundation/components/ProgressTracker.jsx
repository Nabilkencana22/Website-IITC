import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ userProgress, className = '' }) => {
  const achievements = [
    {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'BookOpen',
      unlocked: userProgress?.lessonsCompleted >= 1,
      progress: Math.min(userProgress?.lessonsCompleted, 1)
    },
    {
      id: 'character_master',
      title: 'Character Master',
      description: 'Learn about 10 wayang characters',
      icon: 'Users',
      unlocked: userProgress?.charactersLearned >= 10,
      progress: userProgress?.charactersLearned / 10
    },
    {
      id: 'story_explorer',
      title: 'Story Explorer',
      description: 'Complete 5 story modules',
      icon: 'Map',
      unlocked: userProgress?.storiesCompleted >= 5,
      progress: userProgress?.storiesCompleted / 5
    },
    {
      id: 'cultural_scholar',
      title: 'Cultural Scholar',
      description: 'Earn 1000 knowledge points',
      icon: 'Award',
      unlocked: userProgress?.knowledgePoints >= 1000,
      progress: userProgress?.knowledgePoints / 1000
    }
  ];

  const stats = [
    {
      label: 'Learning Streak',
      value: userProgress?.streak,
      unit: 'days',
      icon: 'Flame',
      color: 'text-error'
    },
    {
      label: 'Total Time',
      value: userProgress?.totalTime,
      unit: 'hours',
      icon: 'Clock',
      color: 'text-primary'
    },
    {
      label: 'Certificates',
      value: userProgress?.certificates,
      unit: '',
      icon: 'Award',
      color: 'text-warning'
    },
    {
      label: 'Rank',
      value: userProgress?.rank,
      unit: '',
      icon: 'Trophy',
      color: 'text-success'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-cultural ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Your Progress</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Level {userProgress?.level}</span>
        </div>
      </div>
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{userProgress?.overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-cultural-gold h-3 rounded-full transition-all duration-cultural-slow relative overflow-hidden"
            style={{ width: `${userProgress?.overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
            <Icon name={stat?.icon} size={20} className={`mx-auto mb-2 ${stat?.color}`} />
            <div className="text-lg font-bold text-foreground">
              {stat?.value}
              {stat?.unit && <span className="text-sm text-muted-foreground ml-1">{stat?.unit}</span>}
            </div>
            <div className="text-xs text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Achievements */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id}
              className={`flex items-center space-x-4 p-3 rounded-lg border transition-all duration-cultural-normal ${
                achievement?.unlocked 
                  ? 'bg-primary/10 border-primary/20' :'bg-muted/30 border-border'
              }`}
            >
              <div className={`p-2 rounded-full ${
                achievement?.unlocked 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium ${
                  achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement?.title}
                </h4>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                
                {!achievement?.unlocked && achievement?.progress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-cultural-slow"
                        style={{ width: `${Math.min(achievement?.progress * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {achievement?.unlocked && (
                <Icon name="CheckCircle" size={20} className="text-success" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;