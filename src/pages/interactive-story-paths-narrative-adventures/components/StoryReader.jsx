import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoryReader = ({ story, onBack, onComplete }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [storyPath, setStoryPath] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [isReading, setIsReading] = useState(true);

  const currentChapterData = story?.chapters?.[currentChapter];

  useEffect(() => {
    // Simulate reading time before showing choices
    if (currentChapterData?.choices) {
      const timer = setTimeout(() => {
        setShowChoices(true);
        setIsReading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentChapter, currentChapterData]);

  const handleChoiceSelect = (choice) => {
    const newPath = [...storyPath, {
      chapter: currentChapter,
      choice: choice,
      timestamp: new Date()?.toISOString()
    }];
    
    setStoryPath(newPath);
    setSelectedChoices([...selectedChoices, choice]);
    setShowChoices(false);
    setIsReading(true);

    // Navigate to next chapter based on choice
    if (choice?.nextChapter !== undefined) {
      setCurrentChapter(choice?.nextChapter);
    } else {
      // Story ended
      onComplete({
        story,
        path: newPath,
        ending: choice?.ending,
        completedAt: new Date()?.toISOString()
      });
    }
  };

  const getChoiceConsequence = (choice) => {
    if (choice?.culturalContext) {
      return choice?.culturalContext;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-cultural border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Stories
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-heading font-bold text-foreground">
                {story?.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Chapter {currentChapter + 1} of {story?.chapters?.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" iconName="Bookmark" />
              <Button variant="ghost" iconName="Share" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-cultural-gold h-2 rounded-full transition-all duration-cultural-normal"
              style={{ width: `${((currentChapter + 1) / story?.chapters?.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-lg shadow-puppet overflow-hidden">
          {/* Chapter Image */}
          {currentChapterData?.image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={currentChapterData?.image}
                alt={currentChapterData?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/60 via-transparent to-transparent" />
              
              {/* Chapter Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {currentChapterData?.title}
                </h2>
                {currentChapterData?.location && (
                  <p className="text-sm text-white/80 flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {currentChapterData?.location}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Story Text */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none text-card-foreground">
              <div className="whitespace-pre-line leading-relaxed">
                {currentChapterData?.content}
              </div>
            </div>

            {/* Cultural Context */}
            {currentChapterData?.culturalNote && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary mb-1">Cultural Insight</h4>
                    <p className="text-sm text-card-foreground">
                      {currentChapterData?.culturalNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Character Thoughts */}
            {currentChapterData?.characterThought && (
              <div className="mt-6 p-4 bg-muted/50 border-l-4 border-accent rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Icon name="MessageCircle" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-accent mb-1">
                      {currentChapterData?.characterThought?.character} thinks:
                    </h4>
                    <p className="text-sm text-card-foreground italic">
                      "{currentChapterData?.characterThought?.thought}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Choices Section */}
        {currentChapterData?.choices && (
          <div className="mt-8">
            <div className="text-center mb-6">
              {isReading ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={20} />
                  </div>
                  <span>Reading chapter...</span>
                </div>
              ) : (
                <h3 className="text-xl font-heading font-bold text-foreground">
                  What will you choose?
                </h3>
              )}
            </div>

            {showChoices && (
              <div className="grid gap-4 md:gap-6">
                {currentChapterData?.choices?.map((choice, index) => (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 hover:shadow-cultural transition-all duration-cultural-normal puppet-hover"
                    onClick={() => handleChoiceSelect(choice)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-cultural-normal">
                        <span className="text-sm font-bold text-primary">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-card-foreground font-medium mb-2 group-hover:text-primary transition-colors duration-cultural-normal">
                          {choice?.text}
                        </p>
                        
                        {choice?.consequence && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <Icon name="Zap" size={14} className="inline mr-1" />
                            Consequence: {choice?.consequence}
                          </p>
                        )}

                        {getChoiceConsequence(choice) && (
                          <div className="mt-3 p-3 bg-cultural-gold/10 border border-cultural-gold/20 rounded-md">
                            <p className="text-xs text-cultural-gold">
                              <Icon name="Star" size={12} className="inline mr-1" />
                              Cultural Context: {getChoiceConsequence(choice)}
                            </p>
                          </div>
                        )}

                        {choice?.characterImpact && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {choice?.characterImpact?.map((impact, impactIndex) => (
                              <span
                                key={impactIndex}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  impact?.type === 'positive' ?'bg-success/10 text-success' 
                                    : impact?.type === 'negative' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                                }`}
                              >
                                {impact?.character}: {impact?.change}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <Icon 
                        name="ChevronRight" 
                        size={20} 
                        className="text-muted-foreground group-hover:text-primary transition-colors duration-cultural-normal" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReader;