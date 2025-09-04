import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LearningPathCard = ({ path, progress = 0, isLocked = false, className = '' }) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`group relative bg-card border border-border rounded-xl overflow-hidden shadow-cultural hover:shadow-puppet transition-all duration-cultural-normal ${className}`}>
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={path?.image}
          alt={path?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-cultural-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/80 via-shadow-black/20 to-transparent"></div>
        
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-shadow-black/60 flex items-center justify-center">
            <div className="bg-card/90 backdrop-blur-sm rounded-full p-4">
              <Icon name="Lock" size={32} className="text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-cta font-semibold ${
            path?.level === 'Beginner' ?'bg-success/20 text-success border border-success/30'
              : path?.level === 'Intermediate' ?'bg-warning/20 text-warning border border-warning/30' :'bg-error/20 text-error border border-error/30'
          }`}>
            {path?.level}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-4 right-4 bg-shadow-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1 text-xs text-foreground">
            <Icon name="Clock" size={12} />
            <span>{path?.duration}</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-cultural-normal">
            {path?.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Users" size={14} />
            <span>{path?.enrolled}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {path?.description}
        </p>

        {/* Progress Bar */}
        {!isLocked && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-cultural-gold h-2 rounded-full transition-all duration-cultural-slow"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {path?.features?.slice(0, 3)?.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
          {path?.features?.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md">
              +{path?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant={isLocked ? "outline" : progress > 0 ? "secondary" : "default"}
          fullWidth
          disabled={isLocked}
          className="group-hover:shadow-cultural transition-shadow duration-cultural-normal"
        >
          {isLocked ? (
            <>
              <Icon name="Lock" size={16} className="mr-2" />
              Unlock Required
            </>
          ) : progress > 0 ? (
            <>
              <Icon name="Play" size={16} className="mr-2" />
              Continue Learning
            </>
          ) : (
            <>
              <Icon name="BookOpen" size={16} className="mr-2" />
              Start Journey
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default LearningPathCard;