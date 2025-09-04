import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, className = '' }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'pdf': return 'FileText';
      case 'audio': return 'Headphones';
      case 'interactive': return 'MousePointer';
      case 'quiz': return 'HelpCircle';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-error';
      case 'pdf': return 'text-warning';
      case 'audio': return 'text-primary';
      case 'interactive': return 'text-success';
      case 'quiz': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden shadow-cultural hover:shadow-puppet transition-all duration-cultural-normal group ${className}`}>
      {/* Thumbnail */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={resource?.thumbnail}
          alt={resource?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-cultural-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/60 to-transparent"></div>
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-shadow-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <Icon 
              name={getTypeIcon(resource?.type)} 
              size={12} 
              className={getTypeColor(resource?.type)}
            />
            <span className="text-xs text-foreground capitalize">{resource?.type}</span>
          </div>
        </div>

        {/* Duration/Size */}
        <div className="absolute top-3 right-3">
          <div className="bg-shadow-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-xs text-foreground">{resource?.duration || resource?.size}</span>
          </div>
        </div>

        {/* Play Button Overlay */}
        {resource?.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-cultural-normal">
            <div className="bg-primary/90 rounded-full p-3">
              <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-cultural-normal line-clamp-2">
            {resource?.title}
          </h3>
          {resource?.isPremium && (
            <Icon name="Crown" size={16} className="text-warning flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {resource?.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{resource?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ThumbsUp" size={12} />
              <span>{resource?.likes}</span>
            </div>
          </div>
          <span>{resource?.uploadDate}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {resource?.tags?.slice(0, 2)?.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 bg-muted/50 text-xs text-muted-foreground rounded"
            >
              {tag}
            </span>
          ))}
          {resource?.tags?.length > 2 && (
            <span className="px-2 py-0.5 bg-muted/50 text-xs text-muted-foreground rounded">
              +{resource?.tags?.length - 2}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant={resource?.isPremium ? "outline" : "default"}
          size="sm"
          fullWidth
          className="group-hover:shadow-cultural transition-shadow duration-cultural-normal"
        >
          {resource?.type === 'video' ? (
            <>
              <Icon name="Play" size={14} className="mr-2" />
              Watch Now
            </>
          ) : resource?.type === 'pdf' ? (
            <>
              <Icon name="Download" size={14} className="mr-2" />
              Download
            </>
          ) : resource?.type === 'audio' ? (
            <>
              <Icon name="Headphones" size={14} className="mr-2" />
              Listen
            </>
          ) : resource?.type === 'quiz' ? (
            <>
              <Icon name="Play" size={14} className="mr-2" />
              Take Quiz
            </>
          ) : (
            <>
              <Icon name="ExternalLink" size={14} className="mr-2" />
              Open
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;