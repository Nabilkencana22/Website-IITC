import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CertificateCard = ({ certificate, className = '' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'earned': return 'text-success';
      case 'in_progress': return 'text-warning';
      case 'locked': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'earned': return 'CheckCircle';
      case 'in_progress': return 'Clock';
      case 'locked': return 'Lock';
      default: return 'Circle';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden shadow-cultural hover:shadow-puppet transition-all duration-cultural-normal group ${className}`}>
      {/* Certificate Preview */}
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-cultural-gold/10 to-accent/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center border-2 ${
              certificate?.status === 'earned' ?'bg-success/20 border-success text-success' 
                : certificate?.status === 'in_progress' ?'bg-warning/20 border-warning text-warning' :'bg-muted/20 border-muted-foreground text-muted-foreground'
            }`}>
              <Icon name={getStatusIcon(certificate?.status)} size={24} />
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Certificate of Completion
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            certificate?.status === 'earned' ?'bg-success/20 text-success border border-success/30'
              : certificate?.status === 'in_progress' ?'bg-warning/20 text-warning border border-warning/30' :'bg-muted/20 text-muted-foreground border border-muted-foreground/30'
          }`}>
            {certificate?.status?.replace('_', ' ')}
          </span>
        </div>

        {/* Earned Date */}
        {certificate?.status === 'earned' && certificate?.earnedDate && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-shadow-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-xs text-foreground">{certificate?.earnedDate}</span>
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-cultural-normal">
            {certificate?.title}
          </h3>
          {certificate?.status === 'earned' && (
            <Icon name="Award" size={20} className="text-warning" />
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {certificate?.description}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Requirements:</h4>
          <div className="space-y-2">
            {certificate?.requirements?.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon 
                  name={req?.completed ? "CheckCircle" : "Circle"} 
                  size={14} 
                  className={req?.completed ? "text-success" : "text-muted-foreground"}
                />
                <span className={req?.completed ? "text-foreground" : "text-muted-foreground"}>
                  {req?.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        {certificate?.status === 'in_progress' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{certificate?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-cultural-gold h-2 rounded-full transition-all duration-cultural-slow"
                style={{ width: `${certificate?.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {certificate?.skills?.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={certificate?.status === 'earned' ? "outline" : "default"}
          fullWidth
          disabled={certificate?.status === 'locked'}
          className="group-hover:shadow-cultural transition-shadow duration-cultural-normal"
        >
          {certificate?.status === 'earned' ? (
            <>
              <Icon name="Download" size={16} className="mr-2" />
              Download Certificate
            </>
          ) : certificate?.status === 'in_progress' ? (
            <>
              <Icon name="Play" size={16} className="mr-2" />
              Continue Learning
            </>
          ) : (
            <>
              <Icon name="Lock" size={16} className="mr-2" />
              Requirements Not Met
            </>
          )}
        </Button>

        {/* Additional Info */}
        {certificate?.status === 'earned' && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Certificate ID: {certificate?.id}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Verified</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;