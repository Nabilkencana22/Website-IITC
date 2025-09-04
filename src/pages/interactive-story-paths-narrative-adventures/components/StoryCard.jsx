import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoryCard = ({ story, onSelect, className = '' }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getProgressWidth = (progress) => {
    return `${Math.min(progress, 100)}%`;
  };

  return (
    <div className={`group bg-card border border-border rounded-lg overflow-hidden shadow-puppet hover:shadow-cultural transition-all duration-cultural-normal puppet-hover ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={story?.coverImage}
          alt={story?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-cultural-normal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/80 via-transparent to-transparent" />
        
        {/* Story Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-cta rounded-full backdrop-blur-sm">
            {story?.type}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getDifficultyColor(story?.difficulty)}`}>
            {story?.difficulty}
          </span>
        </div>

        {/* Progress Indicator */}
        {story?.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-primary transition-all duration-cultural-normal"
              style={{ width: getProgressWidth(story?.progress) }}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-heading font-bold text-card-foreground group-hover:text-primary transition-colors duration-cultural-normal line-clamp-2">
            {story?.title}
          </h3>
          {story?.isNew && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex-shrink-0">
              New
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {story?.description}
        </p>

        {/* Story Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            <span>{story?.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="GitBranch" size={12} />
            <span>{story?.pathsCount} paths</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Trophy" size={12} />
            <span>{story?.endingsCount} endings</span>
          </div>
        </div>

        {/* Characters Preview */}
        <div className="flex items-center mb-4">
          <span className="text-xs text-muted-foreground mr-2">Characters:</span>
          <div className="flex -space-x-2">
            {story?.mainCharacters?.slice(0, 3)?.map((character, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium"
                title={character?.name}
              >
                {character?.name?.charAt(0)}
              </div>
            ))}
            {story?.mainCharacters?.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium">
                +{story?.mainCharacters?.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          fullWidth
          onClick={() => onSelect(story)}
          className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90"
        >
          {story?.progress > 0 ? 'Continue Story' : 'Begin Adventure'}
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;