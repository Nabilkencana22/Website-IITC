import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

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

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Icon name="Handshake" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Dipercaya oleh Institusi Budaya
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cagar
            <span className="block text-transparent bg-gradient-to-r from-primary via-cultural-gold to-accent bg-clip-text animate-gradient-x">
              Budaya Autentik
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Berikut rujukan dari cagar budaya autentik dan ahli wayang terkemuka
            demi menjaga keaslian serta kualitas konten budaya yang kami
            sajikan.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners?.map((partner, index) => (
            <motion.div
              key={partner?.id}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-puppet transition-all duration-cultural-normal puppet-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          className="bg-gradient-to-r from-muted/10 to-muted/5 border border-border rounded-3xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
            Visi & Komitmen
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements?.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse`}
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-8 bg-card border border-border rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <Icon
                name="Shield"
                size={20}
                className="text-emerald-500 animate-pulse"
              />
              <span className="text-sm text-muted-foreground">
                Warisan Terjaga
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon
                name="Award"
                size={20}
                className="text-primary animate-pulse"
              />
              <span className="text-sm text-muted-foreground">
                Berlandaskan Nilai Budaya Luhur
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon
                name="Users"
                size={20}
                className="text-accent animate-pulse"
              />
              <span className="text-sm text-muted-foreground">
                Moklet Go Global
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CulturalPartners;
