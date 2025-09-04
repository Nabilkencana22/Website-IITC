import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertCard = ({ expert, className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-cultural hover:shadow-puppet transition-all duration-cultural-normal group ${className}`}>
      {/* Expert Profile */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={expert?.avatar}
              alt={expert?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {expert?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-cultural-normal">
            {expert?.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-1">{expert?.title}</p>
          <p className="text-xs text-muted-foreground">{expert?.location}</p>
        </div>

        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} className="text-warning fill-current" />
          <span className="text-sm font-medium text-foreground">{expert?.rating}</span>
        </div>
      </div>
      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {expert?.expertise?.map((skill, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      {/* Bio */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {expert?.bio}
      </p>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-border/50">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{expert?.students}</div>
          <div className="text-xs text-muted-foreground">Students</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{expert?.courses}</div>
          <div className="text-xs text-muted-foreground">Courses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{expert?.experience}</div>
          <div className="text-xs text-muted-foreground">Years</div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          className="flex-1"
        >
          <Icon name="MessageCircle" size={14} className="mr-2" />
          Connect
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Icon name="Calendar" size={14} className="mr-2" />
          Schedule
        </Button>
      </div>
      {/* Next Available */}
      {expert?.nextAvailable && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Next available:</span>
            <span className="text-foreground font-medium">{expert?.nextAvailable}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertCard;