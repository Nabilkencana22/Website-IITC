import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Gerbang Budaya",
      path: "/homepage-cultural-gateway",
      icon: "Home",
      description: "Discover Indonesian heritage",
    },
    {
      name: "Galeri",
      path: "/3d-wayang-gallery-character-universe",
      icon: "Box",
      description: "Explore puppet characters",
    },
    {
      name: "Teater Virtual",
      path: "/virtual-dalang-theater-performance-experience",
      icon: "Theater",
      description: "Experience performances",
    },
    {
      name: "Playground Gamelan",
      path: "/gamelan-playground-musical-exploration",
      icon: "Music",
      description: "Musical exploration",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <Link
      to="/homepage-cultural-gateway"
      className="flex items-center space-x-3 group transition-all duration-300"
      onClick={closeMobileMenu}
    >
      <motion.div
        className="relative w-12 h-12 rounded-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        <img
          src="img/2.svg"
          alt="Budaya Kita Logo"
          className="w-full h-full object-contain"
        />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-cultural-gold/30 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
      <div className="hidden sm:block">
        <motion.h1
          className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300"
        >
          Budaya Kita
        </motion.h1>
        <motion.p
          className="text-xs text-muted-foreground font-body"
        >
          Wayang Kulit
        </motion.p>
      </div>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-sm"
      } ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`group flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.name}</span>
                  {isActivePath(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full px-4 py-2 transition-all duration-300 shadow-sm"
                >
                  <Icon name="LogIn" size={16} />
                  <span>Masuk</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size={24}
              className="transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <motion.div key={item.path} whileHover={{ scale: 1.02 }}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                      isActivePath(item.path)
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={
                        isActivePath(item.path)
                          ? "text-primary"
                          : "text-current"
                      }
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-4 py-4 border-t border-border space-y-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  fullWidth
                  className="justify-start text-muted-foreground hover:text-foreground"
                >
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Masuk
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
