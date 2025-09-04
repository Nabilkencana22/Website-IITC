import React from 'react';
import Icon from '../../../components/AppIcon';

const StoryStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      icon: 'BookOpen',
      label: 'Stories Completed',
      value: stats?.completedStories,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'GitBranch',
      label: 'Paths Explored',
      value: stats?.pathsExplored,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Trophy',
      label: 'Unique Endings',
      value: stats?.uniqueEndings,
      color: 'text-cultural-gold',
      bgColor: 'bg-cultural-gold/10'
    },
    {
      icon: 'Star',
      label: 'Cultural Insights',
      value: stats?.culturalInsights,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Clock',
      label: 'Reading Time',
      value: stats?.totalReadingTime,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'Users',
      label: 'Characters Met',
      value: stats?.charactersMet,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 shadow-subtle ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-bold text-card-foreground">
          Your Story Journey
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Level {stats?.level}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className="text-center p-3 rounded-lg border border-border hover:border-primary/30 transition-all duration-cultural-normal group"
          >
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full ${item?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-cultural-normal`}>
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`${item?.color} group-hover:scale-110 transition-transform duration-cultural-normal`} 
              />
            </div>
            <div className="text-lg font-bold text-card-foreground mb-1">
              {item?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Progress to Next Level */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress to Level {stats?.level + 1}</span>
          <span className="text-sm font-medium text-card-foreground">
            {stats?.currentLevelProgress}/{stats?.nextLevelRequirement}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-cultural-gold h-2 rounded-full transition-all duration-cultural-normal"
            style={{ width: `${(stats?.currentLevelProgress / stats?.nextLevelRequirement) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {stats?.nextLevelRequirement - stats?.currentLevelProgress} more cultural insights needed
        </p>
      </div>
      {/* Recent Achievements */}
      {stats?.recentAchievements && stats?.recentAchievements?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Achievements</h4>
          <div className="space-y-2">
            {stats?.recentAchievements?.slice(0, 3)?.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                <div className="w-8 h-8 bg-cultural-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" size={16} className="text-cultural-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {achievement?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {achievement?.earnedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryStats;