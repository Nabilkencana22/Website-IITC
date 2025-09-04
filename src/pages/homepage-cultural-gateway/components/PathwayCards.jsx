import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathwayCards = () => {
  const pathways = [
    {
      id: 1,
      title: "Temukan Karakter",
      subtitle: "Galeri 3D Wayang",
      description: "Jelajahi koleksi karakter wayang dengan model 3D interaktif, pelajari sejarah dan filosofi di balik setiap tokoh legendaris.",
      icon: "Users",
      color: "from-blue-600 to-indigo-800",
      bgColor: "bg-blue-600/10",
      borderColor: "border-blue-600/20",
      route: "/3d-wayang-gallery-character-universe",
      features: ["50+ Karakter 3D", "Sejarah Lengkap", "Hubungan Keluarga"],
      badge: "Populer"
    },
    {
      id: 2,
      title: "Pelajari Seni Dalang",
      subtitle: "Akademi Virtual",
      description: "Kuasai teknik dalang tradisional melalui modul pembelajaran interaktif dengan panduan suara dan gerakan puppet.",
      icon: "GraduationCap",
      color: "from-emerald-600 to-teal-800",
      bgColor: "bg-emerald-600/10",
      borderColor: "border-emerald-600/20",
      route: "/virtual-dalang-theater-performance-experience",
      features: ["Teknik Suara", "Gerakan Puppet", "Sertifikat"],
      badge: "Baru"
    },
    {
      id: 3,
      title: "Cerita Interaktif",
      subtitle: "Petualangan Naratif",
      description: "Masuki dunia epik Mahabharata dan Ramayana dengan cerita pilihan-Anda-sendiri yang mengubah alur dan karakter.",
      icon: "BookOpen",
      color: "from-purple-600 to-pink-800",
      bgColor: "bg-purple-600/10",
      borderColor: "border-purple-600/20",
      route: "/interactive-story-paths-narrative-adventures",
      features: ["25+ Cerita", "Multiple Ending", "Pilihan Moral"],
      badge: "Trending"
    },
    {
      id: 4,
      title: "Cipta & Bagikan",
      subtitle: "Workshop Kreatif",
      description: "Rancang karakter wayang Anda sendiri, buat cerita personal, dan bagikan kreasi dengan komunitas global.",
      icon: "Palette",
      color: "from-orange-600 to-red-800",
      bgColor: "bg-orange-600/10",
      borderColor: "border-orange-600/20",
      route: "/cultural-learning-hub-educational-foundation",
      features: ["Desain Karakter", "Editor Cerita", "Komunitas"],
      badge: "Kreatif"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Compass" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Pilih Jalur Petualangan Anda</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Empat Pintu Masuk ke
            <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text">
              Dunia Wayang
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Setiap jalur dirancang khusus untuk minat dan gaya belajar yang berbeda. 
            Mulai dari mana saja dan jelajahi seluruh platform sesuai kecepatan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pathways?.map((pathway, index) => (
            <div
              key={pathway?.id}
              className={`group relative bg-card border ${pathway?.borderColor} rounded-2xl p-6 hover:shadow-puppet transition-all duration-cultural-normal puppet-hover`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              {pathway?.badge && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-gradient-to-r from-primary to-cultural-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-cultural">
                    {pathway?.badge}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 ${pathway?.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-cultural-normal`}>
                <Icon name={pathway?.icon} size={32} className={`bg-gradient-to-br ${pathway?.color} bg-clip-text text-transparent`} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                    {pathway?.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {pathway?.subtitle}
                  </p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pathway?.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {pathway?.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to={pathway?.route} className="block pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all duration-cultural-normal"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Mulai Eksplorasi
                  </Button>
                </Link>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pathway?.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-cultural-normal`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-muted/20 to-muted/10 border border-border/50 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Tidak Yakin Harus Mulai dari Mana?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ikuti kuis singkat untuk mendapatkan rekomendasi jalur pembelajaran yang sesuai dengan minat dan tujuan Anda.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10 font-cta"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Ambil Kuis Rekomendasi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathwayCards;