import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const GalleryHeader = ({ totalCharacters, sortBy, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: "name", label: "Nama (A-Z)", icon: "ArrowUpAZ" },
    { value: "popularity", label: "Terpopuler", icon: "TrendingUp" },
    { value: "newest", label: "Terbaru", icon: "Clock" },
  ];

  const stats = [
    {
      value: totalCharacters || 6,
      label: "Total Karakter",
      color: "text-amber-400",
      icon: "Users",
      gradient: "from-amber-500 to-amber-300",
    },
    {
      value: 3,
      label: "Pahlawan",
      color: "text-green-400",
      icon: "Shield",
      gradient: "from-green-500 to-green-300",
    },
    {
      value: 1,
      label: "Dewa",
      color: "text-purple-400",
      icon: "Sparkles",
      gradient: "from-purple-500 to-purple-300",
    },
    {
      value: 7,
      label: "Cerita",
      color: "text-blue-400",
      icon: "BookOpen",
      gradient: "from-blue-500 to-blue-300",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl p-8 mb-10 border border-amber-200/20 bg-gradient-to-br from-amber-950/90 to-amber-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500 to-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-full blur-3xl"></div>
      </div>

      {/* Pattern overlay - traditional batik inspired */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" >
          <img src="https://img.freepik.com/premium-vector/indonesian-traditional-style-batik-pattern-damask-pattern-textile_481716-304.jpg?w=2000" alt="" />
          <defs>
            <pattern
              id="batikPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L40,40 M-40,40 L40,-40"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.2" />
              <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batikPattern)" />
        </svg>
      </div>

      {/* Wayang silhouette decoration */}
      <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="/wayang_interactive/public/img/"
        >
          <path
            d="M30,10 C40,5 60,5 70,10 C80,20 80,40 70,50 C60,60 40,60 30,50 C20,40 20,20 30,10 Z"
            fill="currentColor"
          />
          <path
            d="M25,55 C15,65 15,85 25,95 C35,100 65,100 75,95 C85,85 85,65 75,55 C65,45 35,45 25,55 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Header Top */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        {/* Title and Description */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-300 rounded-2xl flex items-center justify-center shadow-lg group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 rounded-lg flex items-center justify-center ">
                <img
                  src="img/4.svg"
                  alt="Wayang Icon"
                  className="w-12 h-12 filter brightness-0 invert"
                />
              </div>
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold text-amber-50 tracking-tight mb-1 font-cultural"
              >
                Galeri Wayang
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-amber-200/80 text-sm font-medium"
              >
                Warisan Budaya Indonesia • {totalCharacters} Karakter
                Tradisional
              </motion.p>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-amber-100/90 max-w-2xl leading-relaxed text-lg"
          >
            Jelajahi kekayaan seni wayang Indonesia melalui koleksi karakter
            tradisional yang dipersembahkan dalam{" "}
            <span className="font-semibold text-amber-300">
              museum digital interaktif
            </span>
            . Temukan cerita, filosofi, dan makna budaya di balik setiap tokoh
            wayang yang menjadi warisan leluhur.
          </motion.p>
        </div>

        {/* Sort Dropdown */}
        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <Button
            variant="outline"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full sm:w-auto justify-between min-w-[180px] rounded-xl bg-amber-900/30 border-amber-400/30 hover:bg-amber-800/40 hover:border-amber-300/40 text-amber-100"
          >
            <div className="flex items-center space-x-2 ">
              <Icon
                name={
                  sortOptions.find((opt) => opt.value === sortBy)?.icon ||
                  "ArrowUpDown"
                }
                size={16}
                className="text-amber-300"
              />
              <span className="font-medium">
                {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                  "Urutkan"}
              </span>
            </div>
            <Icon
              name={isSortOpen ? "ChevronUp" : "ChevronDown"}
              size={14}
              className="transition-transform text-amber-300"
            />
          </Button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-56 bg-amber-900/95 backdrop-blur-md border border-amber-400/30 rounded-xl shadow-2xl z-20 overflow-hidden"
              >
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center space-x-4 px-3 py-3 rounded-xl text-sm transition-all duration-200 ${
                        sortBy === option.value
                          ? "bg-amber-500/20 text-amber-300 font-semibold"
                          : "text-amber-100 hover:bg-amber-800/50 hover:text-amber-50"
                      }`}
                    >
                      <Icon
                        name={option.icon}
                        size={16}
                        className="text-amber-300"
                      />
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <Icon
                          name="Check"
                          size={14}
                          className="ml-auto text-amber-300"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-amber-400/20 relative z-10"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.2 }}
            className="text-center group p-4 rounded-xl bg-amber-900/30 backdrop-blur-sm hover:bg-amber-800/40 transition-all duration-300 cursor-pointer border border-amber-400/10 hover:border-amber-300/20"
          >
            <div className="flex flex-col items-center">
              <div
                className={`text-3xl font-bold ${stat.color} mb-2 flex items-center justify-center gap-2`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-md`}
                >
                  <Icon name={stat.icon} size={18} className="text-amber-50" />
                </div>
                {stat.value}
              </div>
              <div className="text-xs font-medium text-amber-200/80 tracking-wide uppercase mt-1">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Cultural Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center mt-8 pt-6 border-t border-amber-400/20"
      >
        <p className="text-amber-300/80 italic text-sm font-cultural">
          "Wayang adalah cermin jiwa Nusantara, menghubungkan masa lalu dengan
          masa kini"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GalleryHeader;
