import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CulturalPartners = () => {
  const partners = [
    {
      id: 1,
      name: "Museum Wayang Jakarta",
      logo: "https://tse4.mm.bing.net/th/id/OIP.jSf25NyLUjfQkqV1jD0VPgHaD5?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      type: "Museum",
      description: "Kolaborasi untuk digitalisasi koleksi wayang bersejarah",
    },
    {
      id: 2,
      name: "Taman Budaya Yogyakarta",
      logo: "https://jogjaheritagesociety.org/wp-content/uploads/2020/12/4-tby-1-dyan-scaled.jpg",
      type: "Pusat Budaya",
      description: "Program pelatihan dalang dan workshop tradisional",
    },
    {
      id: 3,
      name: "Institut Seni Budaya Indonesia",
      logo: "https://pustakaarsipkampar.id/wp-content/uploads/2023/04/isbi.jpg",
      type: "Institusi Pendidikan",
      description: "Penelitian dan dokumentasi seni pertunjukan wayang",
    },
    {
      id: 4,
      name: "Museum Gubug Wayang Mojokerto",
      logo: "https://gubug-wayang.com/wp-content/uploads/2018/01/video-v1.jpg",
      type: "Museum",
      description: "Jaringan dalang generasi baru di seluruh Indonesia",
    },
  ];

  const achievements = [
    {
      icon: "Award",
      title: "Menuju Anugerah Inovasi Budaya Digital",
      subtitle:
        "Target untuk diakui oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      color: "text-primary",
    },
    {
      icon: "Globe",
      title: "Calon Platform Pelestarian Budaya Terbaik",
      subtitle: "Berorientasi pada pencapaian ASEAN Digital Heritage Awards",
      color: "text-cultural-gold",
    },
    {
      icon: "Users",
      title: "Membangun Komunitas Pelestari Budaya Terbesar",
      subtitle: "Bersama masyarakat dan generasi muda Indonesia",
      color: "text-accent",
    },
  ];

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Ki Dalang Purbo Asmoro",
  //     title: "Master Dalang Tradisional",
  //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  //     quote: "Platform ini berhasil menjembatani tradisi kuno dengan teknologi modern. Generasi muda kini dapat belajar seni dalang dengan cara yang menyenangkan."
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Sari Kusuma",
  //     title: "Ahli Budaya Jawa, Universitas Gadjah Mada",
  //     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  //     quote: "Wayang Interactive mempertahankan autentisitas budaya sambil membuatnya relevan untuk era digital. Ini adalah masa depan pelestarian budaya."
  //   }
  // ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Handshake" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Dipercaya oleh Institusi Budaya
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Cagar
            <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text">
              Budaya Autentik
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Berikut rujukan dari cagar budaya autentik dan ahli wayang terkemuka
            demi menjaga keaslian serta kualitas konten budaya yang kami
            sajikan.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners?.map((partner) => (
            <div
              key={partner?.id}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-puppet transition-all duration-cultural-normal puppet-hover"
            >
              <div className="w-25 h-25 bg-muted/20 rounded-xl mx-auto mb-4 overflow-hidden">
                <Image
                  src={partner?.logo}
                  alt={partner?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading font-bold text-foreground mb-3">
                {partner?.name}
              </h3>

              <div className="text-xm bg-primary/20 text-primary px-2 py-1 rounded-full mb-3 inline-block">
                {partner?.type}
              </div>

              <p className="text-sm text-muted-foreground">
                {partner?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-muted/10 to-muted/5 border border-border rounded-3xl p-8 mb-16">
          <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
            Visi & Komitmen
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements?.map((achievement, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon
                    name={achievement?.icon}
                    size={32}
                    className={achievement?.color}
                  />
                </div>

                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {achievement?.title}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {achievement?.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start space-x-4 mb-4">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-heading font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.title}
                  </p>
                </div>
              </div>
              
              <blockquote className="text-muted-foreground italic">
                "{testimonial?.quote}"
              </blockquote>
              
              <div className="flex justify-end mt-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon key={star} name="Star" size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 bg-card border border-border rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-emerald-500" />
              <span className="text-sm text-muted-foreground">
                Warisan Terjaga
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Berlandaskan Nilai Budaya Luhur
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-accent" />
              <span className="text-sm text-muted-foreground">
                Moklet Go Global
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalPartners;