import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StoryFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  className = '' 
}) => {
  const storyTypes = [
    { value: 'all', label: 'All Stories' },
    { value: 'Mahabharata', label: 'Mahabharata' },
    { value: 'Ramayana', label: 'Ramayana' },
    { value: 'Javanese Folklore', label: 'Javanese Folklore' },
    { value: 'Sundanese Tales', label: 'Sundanese Tales' },
    { value: 'Balinese Legends', label: 'Balinese Legends' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'difficulty_asc', label: 'Easiest First' },
    { value: 'difficulty_desc', label: 'Hardest First' },
    { value: 'shortest', label: 'Shortest First' },
    { value: 'longest', label: 'Longest First' }
  ];

  const progressOptions = [
    { value: 'all', label: 'All Stories' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const hasActiveFilters = () => {
    return filters?.type !== 'all' || 
           filters?.difficulty !== 'all' || 
           filters?.progress !== 'all' || 
           filters?.search !== '';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 shadow-subtle ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-bold text-card-foreground">
          Filter Stories
        </h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search stories, characters, themes..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-cultural-normal"
            />
            {filters?.search && (
              <button
                onClick={() => onFilterChange('search', '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-cultural-normal"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Story Type */}
        <Select
          label="Story Type"
          options={storyTypes}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          className="w-full"
        />

        {/* Difficulty */}
        <Select
          label="Difficulty"
          options={difficultyLevels}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
          className="w-full"
        />

        {/* Progress */}
        <Select
          label="Progress"
          options={progressOptions}
          value={filters?.progress}
          onChange={(value) => onFilterChange('progress', value)}
          className="w-full"
        />

        {/* Sort */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.showFavorites ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('showFavorites', !filters?.showFavorites)}
            iconName="Heart"
            iconPosition="left"
          >
            Favorites
          </Button>
          <Button
            variant={filters?.showNew ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('showNew', !filters?.showNew)}
            iconName="Sparkles"
            iconPosition="left"
          >
            New Stories
          </Button>
          <Button
            variant={filters?.showRecommended ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('showRecommended', !filters?.showRecommended)}
            iconName="Star"
            iconPosition="left"
          >
            Recommended
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters?.search && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Search: "{filters?.search}"
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Type: {filters?.type}
                <button
                  onClick={() => onFilterChange('type', 'all')}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.difficulty !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Difficulty: {filters?.difficulty}
                <button
                  onClick={() => onFilterChange('difficulty', 'all')}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.progress !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Progress: {filters?.progress?.replace('_', ' ')}
                <button
                  onClick={() => onFilterChange('progress', 'all')}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryFilters;