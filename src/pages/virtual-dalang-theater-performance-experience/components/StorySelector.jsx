import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StorySelector = ({ selectedStory, onStorySelect, onStartPerformance }) => {
  const stories = [
    {
      id: "bharatayuddha",
      title: "Bharatayuddha",
      subtitle: "Perang Besar",
      description: `Rasakan pertempuran epik antara saudara Pandawa dan Kurawa.\nSaksikan dilema moral Arjuna dan bimbingan ilahi Krishna.\nPelajari tentang dharma, kewajiban, dan konsekuensi dari perang.`,
      duration: "12-15 Menit",
      difficulty: "Lanjutan",
      scenes: 3,
      characters: ["Arjuna", "Kresna", "Duryudana", "Bima", "Karna"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Wayang_Painting_of_Bharatayudha_Battle.jpg/1920px-Wayang_Painting_of_Bharatayudha_Battle.jpg",
      cultural_context: "Epik sentral dari filosofi Jawa",
      themes: ["Kewajiban vs Keinginan, Petunjuk Ilahi, Konflik Moral"],
    },
    {
      id: "ramayana",
      title: "Ramayana",
      subtitle: "Perjalanan Pangeran",
      description: `Ikuti pencarian Rama untuk menyelamatkan Sita dari raja iblis Rahwana.\nBergabunglah dengan misi heroik Hanuman melintasi lautan.\nTemukan tema kesetiaan, pengabdian, dan kemenangan kebaikan atas kejahatan.`,
      duration: "10-12 Menit",
      difficulty: "Menengah",
      scenes: 3,
      characters: ["Rama", "Sita", "Rahwana", "Hanuman", "Jatayu"],
      image:
        "https://prod-c2i.s3.amazonaws.com/articles/16001618515f60883b2ef38.jpg",
      cultural_context: "Kisah tercinta tentang kepahlawanan dan pengabdian",
      themes: ["Cinta & Kesetiaan", "Baik vs Jahat", "Intervensi Ilahi"],
    },
    {
      id: "folklore",
      title: "Cerita Rakyat Jawa",
      subtitle: "Kebijaksanaan Semar",
      description: `Pelajari pelajaran hidup melalui humor dan kebijaksanaan Semar.\nRasakan nilai-nilai desa tradisional dan harmoni komunitas.\nNikmati cerita ringan yang sempurna untuk memahami humor wayang.`,
      duration: "8-10 Menit",
      difficulty: "Pemula",
      scenes: 2,
      characters: ["Semar", "Gareng", "Petruk", "Bagong"],
      image:
        "https://tse1.mm.bing.net/th/id/OIP.5dZ3k7Bqxip-CghpJ-ZnIAHaE6?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      cultural_context: "Kearifan tradisional melalui komedi",
      themes: ["Nilai Komunitas, Kebijaksanaan & Humor, Harmoni Sosial"],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula': return 'text-success bg-success/10 border-success/20';
      case 'Menengah': return 'text-warning bg-warning/10 border-warning/20';
      case 'Lanjutan': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Pilih Pertunjukan Anda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pilih dari cerita wayang klasik, masing-masing menawarkan wawasan
          budaya yang unik dan pengalaman belajar interaktif. Sempurna untuk
          memahami warisan Indonesia melalui pertunjukan wayang tradisional.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stories?.map((story) => (
          <div
            key={story?.id}
            className={`group relative bg-card border rounded-lg overflow-hidden transition-all duration-cultural-normal cursor-pointer puppet-hover ${
              selectedStory === story?.id
                ? "border-primary shadow-cultural ring-2 ring-primary/20"
                : "border-border hover:border-primary/50 hover:shadow-puppet"
            }`}
            onClick={() => onStorySelect(story?.id)}
          >
            {/* Story Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={story?.image}
                alt={story?.title}
                className="w-full h-full object-cover transition-transform duration-cultural-normal group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/80 via-transparent to-transparent"></div>

              {/* Difficulty Badge */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                  story?.difficulty
                )}`}
              >
                {story?.difficulty}
              </div>

              {/* Selection Indicator */}
              {selectedStory === story?.id && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-cultural">
                  <Icon
                    name="Check"
                    size={14}
                    className="text-primary-foreground"
                  />
                </div>
              )}
            </div>

            {/* Story Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {story?.title}
                </h3>
                <p className="text-sm text-primary font-medium">
                  {story?.subtitle}
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {story?.description?.split("\n")?.[0]}
              </p>

              {/* Story Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {story?.duration}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Film" size={12} className="mr-1" />
                    {story?.scenes} Bagian
                  </span>
                </div>
                <span className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {story?.characters?.length}
                </span>
              </div>

              {/* Cultural Context */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-cultural-gold font-medium mb-1">
                  Konteks Budaya
                </p>
                <p className="text-xs text-muted-foreground">
                  {story?.cultural_context}
                </p>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-1">
                {story?.themes?.slice(0, 2)?.map((theme, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-full"
                  >
                    {theme}
                  </span>
                ))}
                {story?.themes?.length > 2 && (
                  <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-full">
                    +{story?.themes?.length - 2} Lainnya
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      {selectedStory && (
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button
            variant="outline"
            iconName="BookOpen"
            iconPosition="left"
            onClick={() => {
              const story = stories?.find((s) => s?.id === selectedStory);
              alert(
                `Konteks Kebudayaan\n\n${
                  story?.cultural_context
                }\n\nTema: ${story?.themes?.join(", ")}`
              );
            }}
          >
            Telusuri Lainnya
          </Button>
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            onClick={onStartPerformance}
            className="bg-gradient-to-r from-primary to-cultural-gold hover:from-primary/90 hover:to-cultural-gold/90 shadow-cultural"
          >
            Mulai Pertunjukan
          </Button>
        </div>
      )}
    </div>
  );
};

export default StorySelector;