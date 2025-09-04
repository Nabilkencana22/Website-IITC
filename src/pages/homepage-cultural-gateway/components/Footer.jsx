import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Jelajahi",
      links: [
        { name: "Galeri 3D Wayang", path: "/3d-wayang-gallery-character-universe" },
        { name: "Teater Virtual", path: "/virtual-dalang-theater-performance-experience" },
        { name: "Gamelan Playground", path: "/gamelan-playground-musical-exploration" }
      ]
    },
    {
      title: "Komunitas",
      links: [
        { name: "Forum Diskusi", path: "#" },
        { name: "Galeri Kreasi", path: "#" },
        { name: "Event & Workshop", path: "#" },
        { name: "Dalang Muda", path: "#" }
      ]
    },
    {
      title: "Dukungan",
      links: [
        { name: "Pusat Bantuan", path: "#" },
        { name: "Panduan Pengguna", path: "#" },
        { name: "FAQ", path: "#" },
        { name: "Kontak Kami", path: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" },
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-shadow-black border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              to="/homepage-cultural-gateway"
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-cultural-gold rounded-full flex items-center justify-center shadow-puppet">
                <img src="img/4.svg" alt="" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Wayang Interactive
                </h3>
                <p className="text-xs text-muted-foreground">
                  Kebijaksanaan Kuno Bertemu Keajaiban Digital
                </p>
              </div>
            </Link>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Platform digital terdepan untuk melestarikan dan menghidupkan
              kembali seni wayang kulit Indonesia melalui teknologi interaktif
              yang inovatif dan pengalaman pembelajaran yang mendalam.
            </p>

            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-cultural-normal"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="lg:col-span-1">
              <h4 className="font-heading font-semibold text-foreground mb-4">
                {section?.title}
              </h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <Link
                      to={link?.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-cultural-normal text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Wayang Interactive. Seluruh hak cipta
                dilindungi.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-cultural-normal"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-cultural-normal"
                >
                  Syarat Layanan
                </Link>
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-cultural-normal"
                >
                  Kebijakan Cookie
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="MapPin"
                  size={16}
                  className="text-muted-foreground"
                />
                <span className="text-xs text-muted-foreground">
                  SMK Telkom Malang, Indonesia
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Icon
                  name="Globe"
                  size={16}
                  className="text-muted-foreground"
                />
                <span className="text-xs text-muted-foreground">
                  Bahasa Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cultural Attribution */}
      <div className="bg-shadow-black border-t border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground/80">
              Dibuat untuk melestarikan warisan budaya Indonesia.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;