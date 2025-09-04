import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoryCompletion = ({ completionData, onRestart, onNewStory, onShare }) => {
  const [showPathDetails, setShowPathDetails] = useState(false);

  const { story, path, ending, completedAt } = completionData;

  const getEndingType = (ending) => {
    if (ending?.type === 'heroic') return { color: 'text-success', bg: 'bg-success/10', icon: 'Crown' };
    if (ending?.type === 'tragic') return { color: 'text-error', bg: 'bg-error/10', icon: 'Heart' };
    if (ending?.type === 'wisdom') return { color: 'text-primary', bg: 'bg-primary/10', icon: 'Lightbulb' };
    if (ending?.type === 'neutral') return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Balance' };
    return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'Circle' };
  };

  const endingStyle = getEndingType(ending);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Completion Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-cultural-gold rounded-full flex items-center justify-center shadow-puppet">
            <Icon name="CheckCircle" size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Story Complete!
          </h1>
          <p className="text-muted-foreground">
            You've reached the end of your journey through "{story?.title}"
          </p>
        </div>

        {/* Ending Card */}
        <div className="bg-card border border-border rounded-lg shadow-puppet overflow-hidden mb-6">
          {ending?.image && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={ending?.image}
                alt={ending?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/80 via-transparent to-transparent" />
              
              {/* Ending Type Badge */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${endingStyle?.bg} backdrop-blur-sm`}>
                  <Icon name={endingStyle?.icon} size={16} className={endingStyle?.color} />
                  <span className={`text-sm font-medium ${endingStyle?.color}`}>
                    {ending?.type?.charAt(0)?.toUpperCase() + ending?.type?.slice(1)} Ending
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-3">
              {ending?.title}
            </h2>
            <p className="text-card-foreground leading-relaxed mb-4">
              {ending?.description}
            </p>

            {/* Cultural Lesson */}
            {ending?.culturalLesson && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Icon name="Star" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary mb-1">Cultural Wisdom</h4>
                    <p className="text-sm text-card-foreground">
                      {ending?.culturalLesson}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Character Outcomes */}
            {ending?.characterOutcomes && ending?.characterOutcomes?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-card-foreground mb-3">Character Fates</h4>
                <div className="space-y-2">
                  {ending?.characterOutcomes?.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {outcome?.character?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-card-foreground">
                          {outcome?.character}:
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {outcome?.fate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Journey Statistics */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
          <h3 className="text-lg font-heading font-bold text-card-foreground mb-4">
            Your Journey Statistics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {path?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Choices Made
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cultural-gold mb-1">
                {story?.chapters?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Chapters Read
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {ending?.rarity || 'Common'}
              </div>
              <div className="text-xs text-muted-foreground">
                Ending Rarity
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {Math.floor(Math.random() * 45) + 15}m
              </div>
              <div className="text-xs text-muted-foreground">
                Reading Time
              </div>
            </div>
          </div>

          {/* Path Details Toggle */}
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setShowPathDetails(!showPathDetails)}
            iconName={showPathDetails ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-muted-foreground hover:text-foreground"
          >
            {showPathDetails ? 'Hide' : 'Show'} Journey Path
          </Button>

          {/* Path Details */}
          {showPathDetails && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="space-y-3">
                {path?.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">
                        <span className="font-medium">Chapter {step?.chapter + 1}:</span> {step?.choice?.text}
                      </p>
                      {step?.choice?.consequence && (
                        <p className="text-xs text-muted-foreground mt-1">
                          → {step?.choice?.consequence}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            fullWidth
            onClick={onRestart}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Try Different Path
          </Button>
          
          <Button
            variant="default"
            fullWidth
            onClick={onNewStory}
            iconName="BookOpen"
            iconPosition="left"
            className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90"
          >
            New Story
          </Button>
          
          <Button
            variant="secondary"
            fullWidth
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
          >
            Share Journey
          </Button>
        </div>

        {/* Completion Time */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Completed on {new Date(completedAt)?.toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCompletion;