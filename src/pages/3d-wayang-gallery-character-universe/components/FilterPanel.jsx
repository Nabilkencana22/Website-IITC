import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || "");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const characterTypes = [
    {
      id: "hero",
      label: "Pahlawan",
      count: 45,
      color: "text-green-400",
      icon: "Shield",
      bgColor: "bg-green-500/15",
    },
    {
      id: "villain",
      label: "Penjahat",
      count: 32,
      color: "text-red-400",
      icon: "Skull",
      bgColor: "bg-red-500/15",
    },
    {
      id: "deity",
      label: "Dewa",
      count: 28,
      color: "text-amber-400",
      icon: "Sparkles",
      bgColor: "bg-amber-500/15",
    },
    {
      id: "comic",
      label: "Pelawak",
      count: 18,
      color: "text-purple-400",
      icon: "Laugh",
      bgColor: "bg-purple-500/15",
    },
    {
      id: "neutral",
      label: "Netral",
      count: 23,
      color: "text-slate-400",
      icon: "User",
      bgColor: "bg-slate-500/15",
    },
  ];

  const storyOrigins = [
    { id: "mahabharata", label: "Mahabharata", count: 67, icon: "BookOpen" },
    { id: "ramayana", label: "Ramayana", count: 54, icon: "Book" },
    { id: "javanese", label: "Cerita Jawa", count: 43, icon: "Compass" },
    { id: "sundanese", label: "Cerita Sunda", count: 21, icon: "Mountain" },
    { id: "balinese", label: "Cerita Bali", count: 15, icon: "Palmtree" },
  ];

  const philosophicalThemes = [
    { id: "dharma", label: "Dharma & Kewajiban", count: 38, icon: "Scale" },
    { id: "karma", label: "Karma & Keadilan", count: 42, icon: "Balance" },
    { id: "wisdom", label: "Kebijaksanaan", count: 35, icon: "Lightbulb" },
    { id: "love", label: "Cinta & Pengabdian", count: 29, icon: "Heart" },
    { id: "power", label: "Kekuasaan", count: 31, icon: "Crown" },
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
    if (filters?.minPopularity > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between bg-amber-900/30 backdrop-blur-md border-amber-600/40 hover:bg-amber-800/40 hover:border-amber-500/50 transition-all rounded-xl py-3"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={18} className="text-amber-300" />
            <span className="font-medium text-amber-100">Filter Karakter</span>
            {activeFilterCount > 0 && (
              <span className="bg-amber-500 text-amber-950 text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                {activeFilterCount}
              </span>
            )}
          </div>
          <Icon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="text-amber-300"
          />
        </Button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{
              opacity: 0,
              x: isMobile ? -20 : 0,
              height: isMobile ? 0 : "auto",
            }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{
              opacity: 0,
              x: isMobile ? -20 : 0,
              height: isMobile ? 0 : "auto",
            }}
            transition={{ duration: 0.3 }}
            className="bg-amber-900/30 backdrop-blur-xl border border-amber-600/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-amber-600/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-amber-100 text-lg flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-700/30 rounded-xl flex items-center justify-center">
                    <Icon name="Sliders" size={20} className="text-amber-300" />
                  </div>
                  <span>Filter Karakter</span>
                </h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-amber-300 hover:text-amber-100 hover:bg-amber-700/30 rounded-lg px-3 py-2"
                  >
                    <Icon name="X" size={14} className="mr-2" />
                    Hapus Semua
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari karakter wayang..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-3 rounded-xl border-amber-600/40 bg-amber-950/50 text-amber-100 placeholder-amber-400/60 focus:ring-2 focus:ring-amber-400 focus:border-amber-400/50 transition-all"
                />
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400/70"
                />
              </div>
            </div>

            <div className="p-5 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Character Types */}
              <div>
                <h4 className="font-semibold text-amber-100 mb-4 flex items-center text-base">
                  <Icon
                    name="Users"
                    size={18}
                    className="mr-3 text-amber-300"
                  />
                  Tipe Karakter
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {characterTypes.map((type) => {
                    const isActive = filters?.types?.includes(type.id);
                    return (
                      <motion.label
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                          isActive
                            ? "bg-amber-700/30 border-amber-500/50 shadow-md"
                            : "bg-amber-900/20 border-amber-700/30 hover:bg-amber-800/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${type.bgColor} flex items-center justify-center`}
                          >
                            <Icon
                              name={type.icon}
                              size={16}
                              className={type.color}
                            />
                          </div>
                          <span className="text-amber-100 text-sm font-medium">
                            {type.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold ${type.color}`}>
                            {type.count}
                          </span>
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => handleTypeToggle(type.id)}
                            className="rounded border-amber-600/50 text-amber-500 focus:ring-amber-400 cursor-pointer w-4 h-4"
                          />
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Story Origins */}
              <div>
                <h4 className="font-semibold text-amber-100 mb-4 flex items-center text-base">
                  <Icon
                    name="BookOpen"
                    size={18}
                    className="mr-3 text-amber-300"
                  />
                  Asal Usul Cerita
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {storyOrigins.map((origin) => {
                    const isActive = filters?.origins?.includes(origin.id);
                    return (
                      <motion.label
                        key={origin.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                          isActive
                            ? "bg-amber-700/30 border-amber-500/50 shadow-md"
                            : "bg-amber-900/20 border-amber-700/30 hover:bg-amber-800/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-800/30 flex items-center justify-center">
                            <Icon
                              name={origin.icon}
                              size={16}
                              className="text-amber-300"
                            />
                          </div>
                          <span className="text-amber-100 text-sm font-medium">
                            {origin.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-amber-300/80 font-medium">
                            {origin.count}
                          </span>
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => handleOriginToggle(origin.id)}
                            className="rounded border-amber-600/50 text-amber-500 focus:ring-amber-400 cursor-pointer w-4 h-4"
                          />
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Philosophical Themes */}
              <div>
                <h4 className="font-semibold text-amber-100 mb-4 flex items-center text-base">
                  <Icon
                    name="Brain"
                    size={18}
                    className="mr-3 text-amber-300"
                  />
                  Tema Filosofis
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {philosophicalThemes.map((theme) => {
                    const isActive = filters?.themes?.includes(theme.id);
                    return (
                      <motion.label
                        key={theme.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                          isActive
                            ? "bg-amber-700/30 border-amber-500/50 shadow-md"
                            : "bg-amber-900/20 border-amber-700/30 hover:bg-amber-800/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-800/30 flex items-center justify-center">
                            <Icon
                              name={theme.icon}
                              size={16}
                              className="text-amber-300"
                            />
                          </div>
                          <span className="text-amber-100 text-sm font-medium">
                            {theme.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-amber-300/80 font-medium">
                            {theme.count}
                          </span>
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => handleThemeToggle(theme.id)}
                            className="rounded border-amber-600/50 text-amber-500 focus:ring-amber-400 cursor-pointer w-4 h-4"
                          />
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Popularity Range */}
              <div>
                <h4 className="font-semibold text-amber-100 mb-4 flex items-center text-base">
                  <Icon
                    name="TrendingUp"
                    size={18}
                    className="mr-3 text-amber-300"
                  />
                  Popularitas Minimum
                </h4>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters?.minPopularity || 0}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          minPopularity: parseInt(e.target.value),
                        })
                      }
                      className="
                        w-full h-2 rounded-full cursor-pointer appearance-none
                        bg-amber-800/30 [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-amber-300
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-amber-100
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:transition-transform
                      "
                      style={{
                        background: `linear-gradient(to right, rgb(245 158 11) ${
                          filters?.minPopularity || 0
                        }%, rgb(99 102 241 / 0.3) ${
                          filters?.minPopularity || 0
                        }%)`,
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-sm text-amber-300 font-medium bg-amber-900/40 px-3 py-1.5 rounded-full">
                      Minimal {filters?.minPopularity || 0}% Popularitas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="p-4 border-t border-amber-600/30 bg-amber-800/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-300">
                    {activeFilterCount} filter aktif
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-amber-300 hover:text-amber-100 rounded-xl text-xs"
                  >
                    Reset Filter
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
