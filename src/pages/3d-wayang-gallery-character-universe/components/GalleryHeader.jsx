import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GalleryHeader = ({
  totalCharacters,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onRandomCharacter,
}) => {
  const sortOptions = [
    { value: "name", label: "Name (A-Z)", icon: "ArrowUpAZ" },
    { value: "popularity", label: "Most Popular", icon: "TrendingUp" },
    { value: "stories", label: "Most Stories", icon: "BookOpen" },
    { value: "newest", label: "Newest Added", icon: "Clock" },
  ];

  return (
    <div className="relative rounded-2xl p-8 mb-10 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
      {/* Header Top */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Title and Description */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-cultural-gold rounded-xl flex items-center justify-center shadow-lg">
              <img src="img/4.svg" alt="" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Galeri Wayang
              </h1>
              <p className="text-sm text-muted-foreground">
                Karakter Universe • {totalCharacters} Wayang Tradisional
              </p>
            </div>
          </div>
          <p className="text-muted-foreground/90 max-w-2xl leading-relaxed">
            Jelajahi koleksi komprehensif karakter wayang tradisional Indonesia
            melalui model{" "}
            <span className="font-semibold text-primary">3D interaktif</span>.
            Temukan cerita, hubungan, dan signifikansi budaya mereka dalam{" "}
            <span className="italic">museum digital imersif</span>.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted/40 rounded-xl p-1 shadow-inner">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="px-3 rounded-lg"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="px-3 rounded-lg"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              className="w-full sm:w-auto justify-between min-w-[170px] rounded-xl hover:bg-muted/60"
            >
              <div className="flex items-center space-x-2">
                <Icon
                  name={
                    sortOptions?.find((opt) => opt?.value === sortBy)?.icon ||
                    "ArrowUpDown"
                  }
                  size={16}
                />
                <span className="hidden sm:inline font-medium">
                  {sortOptions?.find((opt) => opt?.value === sortBy)?.label ||
                    "Sort by"}
                </span>
                <span className="sm:hidden">Sort</span>
              </div>
              <Icon
                name="ChevronDown"
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
            </Button>

            {/* Dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-56 bg-popover/90 backdrop-blur-md border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onSortChange(option?.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      sortBy === option?.value
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-popover-foreground hover:bg-muted/60 hover:text-primary"
                    }`}
                  >
                    <Icon name={option?.icon} size={16} />
                    <span>{option?.label}</span>
                    {sortBy === option?.value && (
                      <Icon name="Check" size={14} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-white/10">
        {[
          {
            value: 146,
            label: "Total Karakter",
            color: "text-primary",
            icon: "Users",
          },
          {
            value: 45,
            label: "Pahlawan",
            color: "text-success",
            icon: "Shield",
          },
          {
            value: 28,
            label: "Dewa",
            color: "text-cultural-gold",
            icon: "Sparkles",
          },
          {
            value: 73,
            label: "Cerita",
            color: "text-accent",
            icon: "BookOpen",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center group hover:scale-105 transition-transform"
          >
            <div
              className={`text-3xl font-bold ${stat.color} mb-2 flex items-center justify-center gap-2`}
            >
              <Icon name={stat.icon} size={22} />
              {stat.value}
            </div>
            <div className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryHeader;
