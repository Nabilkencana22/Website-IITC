import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || "");

  const characterTypes = [
    { id: "hero", label: "Heroes", count: 45, color: "text-success" },
    { id: "villain", label: "Villains", count: 32, color: "text-destructive" },
    { id: "deity", label: "Deities", count: 28, color: "text-cultural-gold" },
    { id: "comic", label: "Comic Relief", count: 18, color: "text-accent" },
    {
      id: "neutral",
      label: "Neutral",
      count: 23,
      color: "text-muted-foreground",
    },
  ];

  const storyOrigins = [
    { id: "mahabharata", label: "Mahabharata", count: 67 },
    { id: "ramayana", label: "Ramayana", count: 54 },
    { id: "javanese", label: "Javanese Folklore", count: 43 },
    { id: "sundanese", label: "Sundanese Tales", count: 21 },
    { id: "balinese", label: "Balinese Stories", count: 15 },
  ];

  const philosophicalThemes = [
    { id: "dharma", label: "Dharma & Duty", count: 38 },
    { id: "karma", label: "Karma & Justice", count: 42 },
    { id: "wisdom", label: "Wisdom & Knowledge", count: 35 },
    { id: "love", label: "Love & Devotion", count: 29 },
    { id: "power", label: "Power & Leadership", count: 31 },
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFilterChange({ ...filters, search: value });
  };

  const handleTypeToggle = (typeId) => {
    const currentTypes = filters?.types || [];
    const newTypes = currentTypes?.includes(typeId)
      ? currentTypes?.filter((t) => t !== typeId)
      : [...currentTypes, typeId];
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleOriginToggle = (originId) => {
    const currentOrigins = filters?.origins || [];
    const newOrigins = currentOrigins?.includes(originId)
      ? currentOrigins?.filter((o) => o !== originId)
      : [...currentOrigins, originId];
    onFilterChange({ ...filters, origins: newOrigins });
  };

  const handleThemeToggle = (themeId) => {
    const currentThemes = filters?.themes || [];
    const newThemes = currentThemes?.includes(themeId)
      ? currentThemes?.filter((t) => t !== themeId)
      : [...currentThemes, themeId];
    onFilterChange({ ...filters, themes: newThemes });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.types?.length) count += filters?.types?.length;
    if (filters?.origins?.length) count += filters?.origins?.length;
    if (filters?.themes?.length) count += filters?.themes?.length;
    return count;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between bg-background/70 backdrop-blur-md border-primary/40 hover:bg-background/90 transition-all"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span className="font-medium">Filter</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow-sm">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`bg-card/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl transition-all duration-500 ${
          isOpen || window.innerWidth >= 1024 ? "block" : "hidden"
        } lg:block`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-lg flex items-center space-x-2">
              <Icon name="Sliders" size={18} className="text-primary" />
              <span>Filter Karakter</span>
            </h3>
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-destructive hover:bg-destructive/10"
              >
                <Icon name="X" size={14} />
                Hapus Semua
              </Button>
            )}
          </div>

          {/* Search */}
          <Input
            type="search"
            placeholder="🔍 Cari Karakter..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4 rounded-xl border-border bg-background/70 focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="p-4 space-y-8">
          {/* Character Types */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm uppercase tracking-wide">
              <Icon name="Users" size={16} className="mr-2 text-primary" />
              Tipe Karakter
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {characterTypes?.map((type) => (
                <label
                  key={type?.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters?.types?.includes(type?.id) || false}
                      onChange={() => handleTypeToggle(type?.id)}
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground">
                      {type?.label}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${type?.color}`}>
                    {type?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Story Origins */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm uppercase tracking-wide">
              <Icon name="BookOpen" size={16} className="mr-2 text-primary" />
              Asal Usul Cerita
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {storyOrigins?.map((origin) => (
                <label
                  key={origin?.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters?.origins?.includes(origin?.id) || false}
                      onChange={() => handleOriginToggle(origin?.id)}
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground">
                      {origin?.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {origin?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Philosophical Themes */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm uppercase tracking-wide">
              <Icon name="Brain" size={16} className="mr-2 text-primary" />
              Tema Filosofis
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {philosophicalThemes?.map((theme) => (
                <label
                  key={theme?.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters?.themes?.includes(theme?.id) || false}
                      onChange={() => handleThemeToggle(theme?.id)}
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground">
                      {theme?.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {theme?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Popularity Range */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm uppercase tracking-wide">
              <Icon name="TrendingUp" size={16} className="mr-2 text-primary" />
              Rentang Popularitas
            </h4>

            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters?.minPopularity || 0}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    minPopularity: parseInt(e?.target?.value),
                  })
                }
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-from,#f99e0cff) ${
                    filters?.minPopularity || 0
                  }%, #e5e7eb ${filters?.minPopularity || 0}%)`,
                }}
                className="
        w-full h-2 rounded-full cursor-pointer appearance-none 
        transition-all duration-300 focus:outline-none

        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:rounded-full

        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-5
        [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-md
        [&::-webkit-slider-thumb]:border-2
        [&::-webkit-slider-thumb]:border-primary
        [&::-webkit-slider-thumb]:hover:scale-110
        [&::-webkit-slider-thumb]:transition-transform
        [&::-webkit-slider-thumb]:relative
        [&::-webkit-slider-thumb]:top-1/2
        [&::-webkit-slider-thumb]:-translate-y-1/2

        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:rounded-full

        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:w-5
        [&::-moz-range-thumb]:h-5
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:shadow-md
        [&::-moz-range-thumb]:border-2
        [&::-moz-range-thumb]:border-primary
        [&::-moz-range-thumb]:hover:scale-110
        [&::-moz-range-thumb]:transition-transform
        [&::-moz-range-thumb]:relative
        [&::-moz-range-thumb]:top-1/2
        [&::-moz-range-thumb]:-translate-y-1/2
      "
              />

              <div className="text-center">
                <span className="text-sm text-primary font-medium">
                  Min: {filters?.minPopularity || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
