import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link
      to="/homepage-cultural-gateway"
      className="flex items-center space-x-3 group transition-all duration-cultural-normal"
      onClick={closeMobileMenu}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-cultural-normal">
          <img
            src="img/2.svg"
            alt="Budaya Kita Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cultural-gold/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-cultural-normal"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-cultural-normal">
          Budaya Kita
        </h1>
        <p className="text-xs text-muted-foreground font-body">Wayang Kulit</p>
      </div>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-cultural-normal ${
        isScrolled
          ? "bg-background/95 backdrop-blur-cultural border-b border-border shadow-cultural"
          : "bg-background/80 backdrop-blur-sm"
      } ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative px-3 py-2 rounded-lg text-sm font-body font-medium transition-all duration-cultural-normal ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Masuk
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
            >
              Mulai Perjalanan
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-cultural-normal"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size={24}
              className="transition-transform duration-cultural-normal"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-cultural-normal overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 border-t border-border"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-cultural">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-all duration-cultural-normal ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon
                  name={item?.icon}
                  size={20}
                  className={`transition-colors duration-cultural-normal ${
                    isActivePath(item?.path) ? "text-primary" : "text-current"
                  }`}
                />
                <div>
                  <div className="font-medium">{item?.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item?.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-4 py-4 border-t border-border space-y-3">
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-foreground"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Masuk
            </Button>
            <Button
              variant="default"
              fullWidth
              className="justify-start bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
            >
              <Icon name="Compass" size={16} className="mr-2" />
              Mulai Perjalanan Budaya
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
