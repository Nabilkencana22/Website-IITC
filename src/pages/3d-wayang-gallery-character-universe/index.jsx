import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import GalleryHeader from "./components/GalleryHeader";
import FilterPanel from "./components/FilterPanel";
import CharacterGrid from "./components/CharacterGrid";
import CharacterViewer from "./components/CharacterViewer";

const WayangGallery = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    types: [],
    origins: [],
    themes: [],
    minPopularity: 0,
  });
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Mock character data
  const characters = [
    {
      id: 1,
      name: "Arjuna",
      type: "hero",
      description:
        "Pemanah terampil dan saudara ketiga Pandawa, dikenal karena pengabdiannya dan kebaikannya.",
      fullDescription: `Arjuna adalah salah satu tokoh utama dalam epos Mahabharata, dikenal sebagai pemanah terbaik di zamannya. Sebagai putra ketiga Pandu, ia memiliki sifat yang teguh dalam menjalankan dharma dan kebenaran. Dalam pewayangan, Arjuna digambarkan sebagai sosok yang tampan, berbudi luhur, dan memiliki kemampuan spiritual yang tinggi.\n\nKarakter Arjuna mengajarkan tentang pentingnya kesetiaan, keberanian dalam menghadapi tantangan, dan kemampuan untuk tetap tenang dalam situasi sulit. Filosofi hidupnya berpusat pada konsep dharma - menjalankan kewajiban dengan penuh tanggung jawab tanpa mengharapkan hasil.`,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.gJ6Y7GfuKynFDdD5ouGLrgHaIC?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      origins: ["Mahabharata"],
      storyCount: 23,
      familyConnections: 12,
      popularity: 95,
      isNew: false,
      themes: ["dharma", "wisdom", "love"],
      teachings: [
        {
          principle: "Dharma dan Kewajiban",
          explanation:
            "Arjuna mengajarkan pentingnya menjalankan kewajiban tanpa mengharapkan hasil, sesuai dengan ajaran Bhagavad Gita.",
        },
        {
          principle: "Ketenangan Batin",
          explanation:
            "Dalam menghadapi dilema moral, Arjuna menunjukkan pentingnya mencari ketenangan dan kebijaksanaan.",
        },
      ],
      storyAppearances: [
        {
          title: "Bharatayuddha",
          origin: "Mahabharata",
          role: "Panglima perang Pandawa yang memimpin dalam perang besar melawan Kurawa",
          duration: "3 jam",
          otherCharacters: 15,
        },
        {
          title: "Arjuna Wiwaha",
          origin: "Javanese",
          role: "Pahlawan yang menyelamatkan para bidadari dari gangguan raksasa",
          duration: "2 jam",
          otherCharacters: 8,
        },
      ],
      familyTree: [
        { name: "Pandu", relationship: "Ayah" },
        { name: "Kunti", relationship: "Ibu" },
        { name: "Yudhishthira", relationship: "Kakak" },
        { name: "Bhima", relationship: "Kakak" },
        { name: "Nakula", relationship: "Adik" },
        { name: "Sahadeva", relationship: "Adik" },
      ],
      symbolism: [
        {
          element: "Warna Putih",
          meaning:
            "Melambangkan kesucian hati dan kemurnian niat dalam setiap tindakan",
          significance: "Spiritual",
          icon: "Heart",
        },
        {
          element: "Panah dan Busur",
          meaning:
            "Simbol ketepatan dalam mengambil keputusan dan fokus pada tujuan",
          significance: "Wisdom",
          icon: "Target",
        },
      ],
    },
    {
      id: 2,
      name: "Ravana",
      type: "villain",
      description:
        "Raja raksasa sepuluh kepala dari Lanka, dikenal karena pengetahuannya yang sangat besar dan kejatuhannya yang tragis.",
      fullDescription: `Ravana adalah raja raksasa berkepala sepuluh yang memerintah kerajaan Alengka. Meskipun dikenal sebagai antagonis dalam Ramayana, Ravana sebenarnya adalah sosok yang kompleks - seorang brahmana yang sangat terpelajar, ahli dalam berbagai ilmu pengetahuan, dan pemimpin yang kuat.\n\nKarakter Ravana mengajarkan tentang bahaya kesombongan dan nafsu yang tidak terkendali. Meski memiliki kekuatan dan pengetahuan yang luar biasa, keangkuhannya dan obsesinya terhadap Sita akhirnya membawa kehancuran bagi dirinya dan kerajaannya.`,
      image: "https://hadisukirno.co.id/images/produk/Rahwana-Solo-1.jpg",
      origins: ["Ramayana"],
      storyCount: 18,
      familyConnections: 8,
      popularity: 87,
      isNew: false,
      themes: ["power", "karma"],
      teachings: [
        {
          principle: "Bahaya Kesombongan",
          explanation:
            "Ravana menunjukkan bagaimana kesombongan dan keangkuhan dapat menghancurkan bahkan yang paling berkuasa.",
        },
        {
          principle: "Konsekuensi Perbuatan",
          explanation:
            "Setiap tindakan memiliki konsekuensi, dan kekuasaan tidak dapat melindungi dari hukum karma.",
        },
      ],
      storyAppearances: [
        {
          title: "Ramayana",
          origin: "Ramayana",
          role: "Raja Alengka yang menculik Sita dan berperang melawan Rama",
          duration: "4 jam",
          otherCharacters: 20,
        },
      ],
      familyTree: [
        { name: "Vishrava", relationship: "Ayah" },
        { name: "Kaikesi", relationship: "Ibu" },
        { name: "Kumbhakarna", relationship: "Adik" },
        { name: "Vibhishana", relationship: "Adik" },
      ],
      symbolism: [
        {
          element: "Sepuluh Kepala",
          meaning:
            "Melambangkan pengetahuan yang luas namun juga kesombongan yang berlebihan",
          significance: "Knowledge",
          icon: "Brain",
        },
      ],
    },
    {
      id: 3,
      name: "Hanuman",
      type: "deity",
      description:
        "Dewa monyet yang setia, simbol keberanian, kekuatan, dan pengabdian yang tak tergoyahkan.",
      fullDescription: `Hanuman adalah dewa berbentuk kera putih yang dikenal karena kesetiaannya yang luar biasa kepada Rama. Dalam tradisi wayang, Hanuman digambarkan sebagai sosok yang memiliki kekuatan supernatural, kemampuan terbang, dan kebijaksanaan yang mendalam.\n\nSebagai simbol bhakti (devotion), Hanuman mengajarkan tentang pentingnya kesetiaan, keberanian dalam menghadapi tantangan, dan pengabdian tanpa pamrih. Karakternya menunjukkan bahwa kekuatan sejati datang dari hati yang murni dan niat yang tulus.`,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.SWS_sz3HqR0XG2rXiMdX1gHaFS?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      origins: ["Ramayana", "Javanese Folklore"],
      storyCount: 15,
      familyConnections: 6,
      popularity: 92,
      isNew: true,
      themes: ["love", "wisdom", "dharma"],
      teachings: [
        {
          principle: "Bhakti dan Kesetiaan",
          explanation:
            "Hanuman menunjukkan bentuk tertinggi dari pengabdian dan kesetiaan kepada yang benar.",
        },
        {
          principle: "Keberanian Tanpa Pamrih",
          explanation:
            "Keberanian sejati muncul ketika kita bertindak untuk kebaikan orang lain, bukan untuk diri sendiri.",
        },
      ],
      storyAppearances: [
        {
          title: "Hanuman Obong",
          origin: "Ramayana",
          role: "Utusan Rama yang membakar Alengka dan mencari Sita",
          duration: "2.5 jam",
          otherCharacters: 12,
        },
      ],
      familyTree: [
        { name: "Vayu", relationship: "Ayah Spiritual" },
        { name: "Anjana", relationship: "Ibu" },
        { name: "Rama", relationship: "Guru/Tuan" },
      ],
      symbolism: [
        {
          element: "Warna Putih",
          meaning: "Kesucian hati dan kemurnian niat dalam pengabdian",
          significance: "Devotion",
          icon: "Heart",
        },
        {
          element: "Ekor Panjang",
          meaning:
            "Kemampuan untuk menjangkau yang tidak mungkin dengan kesetiaan",
          significance: "Strength",
          icon: "Zap",
        },
      ],
    },
    {
      id: 4,
      name: "Semar",
      type: "comic",
      description:
        "Pelayan badut bijak, perwujudan filosofi Jawa dan kebijaksanaan ilahi dalam bentuk yang sederhana.",
      fullDescription: `Semar adalah tokoh unik dalam pewayangan Jawa yang tidak ditemukan dalam epos India asli. Ia adalah penjelmaan dewa yang memilih hidup sebagai abdi atau pelayan para kesatria. Meskipun berpenampilan sederhana dan sering menjadi sumber humor, Semar sebenarnya adalah sosok yang paling bijaksana.\n\nDalam filosofi Jawa, Semar mewakili rakyat jelata yang memiliki kebijaksanaan mendalam. Ia mengajarkan bahwa kebijaksanaan sejati tidak selalu datang dari penampilan yang megah, tetapi dari hati yang tulus dan pengalaman hidup yang mendalam.`,
      image:
        "https://1.bp.blogspot.com/-s_gjRPi4lzI/XUJdwDT13FI/AAAAAAAAAKU/G8it1IKEhkUjRCQvSGN1Xd89X--Dsj9gwCLcBGAs/s1600/semar.jpg",
      origins: ["Javanese Folklore"],
      storyCount: 35,
      familyConnections: 4,
      popularity: 88,
      isNew: false,
      themes: ["wisdom", "dharma"],
      teachings: [
        {
          principle: "Kebijaksanaan dalam Kesederhanaan",
          explanation:
            "Semar mengajarkan bahwa kebijaksanaan sejati sering datang dalam bentuk yang sederhana dan tidak menyombongkan diri.",
        },
        {
          principle: "Melayani dengan Tulus",
          explanation:
            "Pengabdian yang tulus kepada kebenaran adalah bentuk tertinggi dari kehidupan spiritual.",
        },
      ],
      storyAppearances: [
        {
          title: "Semar Mbangun Kayangan",
          origin: "Javanese",
          role: "Penasihat bijaksana yang membantu para kesatria memahami makna kehidupan",
          duration: "3 jam",
          otherCharacters: 10,
        },
      ],
      familyTree: [
        { name: "Gareng", relationship: "Anak" },
        { name: "Petruk", relationship: "Anak" },
        { name: "Bagong", relationship: "Anak" },
      ],
      symbolism: [
        {
          element: "Bentuk Tubuh Unik",
          meaning:
            "Menggambarkan bahwa kesempurnaan spiritual tidak terikat pada penampilan fisik",
          significance: "Wisdom",
          icon: "Eye",
        },
      ],
    },
    {
      id: 5,
      name: "Srikandi",
      type: "hero",
      description:
        "Putri pejuang, simbol pemberdayaan perempuan dan keberanian dalam pertempuran.",
      fullDescription: `Srikandi adalah putri Drupada yang terkenal sebagai prajurit wanita pemberani dalam Mahabharata. Dalam pewayangan Jawa, ia digambarkan sebagai sosok yang tidak hanya cantik tetapi juga memiliki kemampuan berperang yang luar biasa, terutama dalam memanah.\n\nKarakter Srikandi menjadi simbol pemberdayaan perempuan dalam budaya Jawa. Ia menunjukkan bahwa perempuan dapat menjadi prajurit yang tangguh sambil tetap mempertahankan sifat feminin dan kebijaksanaannya. Srikandi mengajarkan tentang keberanian, kemandirian, dan pentingnya memperjuangkan keadilan.`,
      image:
        "https://i.pinimg.com/736x/20/d2/15/20d215e224d3f8f7bdaa5ba8f3ebc4a2--kulit-produk.jpg",
      origins: ["Mahabharata", "Javanese Folklore"],
      storyCount: 12,
      familyConnections: 8,
      popularity: 78,
      isNew: true,
      themes: ["dharma", "power"],
      teachings: [
        {
          principle: "Keberanian Perempuan",
          explanation:
            "Srikandi menunjukkan bahwa keberanian dan kekuatan tidak mengenal gender.",
        },
        {
          principle: "Keseimbangan Kekuatan dan Kelembutan",
          explanation:
            "Seorang prajurit sejati dapat menggabungkan kekuatan fisik dengan kebijaksanaan dan kasih sayang.",
        },
      ],
      storyAppearances: [
        {
          title: "Srikandi Maguru Manah",
          origin: "Javanese",
          role: "Prajurit wanita yang belajar ilmu perang untuk membalas dendam",
          duration: "2.5 jam",
          otherCharacters: 14,
        },
      ],
      familyTree: [
        { name: "Drupada", relationship: "Ayah" },
        { name: "Arjuna", relationship: "Suami" },
        { name: "Abhimanyu", relationship: "Anak Tiri" },
      ],
      symbolism: [
        {
          element: "Busur dan Panah",
          meaning:
            "Ketepatan dalam mengambil keputusan dan fokus pada tujuan yang benar",
          significance: "Strength",
          icon: "Target",
        },
      ],
    },
    {
      id: 6,
      name: "Gatotkaca",
      type: "hero",
      description:
        "Prajurit terbang dengan tulang besi dan otot kawat, putra Bhima.",
      fullDescription: `Gatotkaca adalah putra Bhima dengan Hidimbi, seorang raksasi. Ia memiliki kemampuan supernatural berupa tulang besi dan otot kawat, serta dapat terbang tanpa sayap. Dalam pewayangan, Gatotkaca digambarkan sebagai prajurit yang sangat kuat dan setia kepada keluarga Pandawa.\n\nKarakter Gatotkaca mengajarkan tentang kesetiaan kepada keluarga, keberanian dalam menghadapi musuh yang lebih kuat, dan pengorbanan untuk kebaikan yang lebih besar. Meskipun memiliki darah raksasa, ia memilih untuk berjuang di pihak kebenaran.`,
      image: "https://thumbs.dreamstime.com/b/javanese-puppet-4719926.jpg",
      origins: ["Mahabharata", "Javanese Folklore"],
      storyCount: 16,
      familyConnections: 10,
      popularity: 85,
      isNew: false,
      themes: ["dharma", "power"],
      teachings: [
        {
          principle: "Kesetiaan Keluarga",
          explanation:
            "Gatotkaca menunjukkan pentingnya kesetiaan dan pengorbanan untuk keluarga.",
        },
        {
          principle: "Kekuatan dengan Tanggung Jawab",
          explanation:
            "Kekuatan besar harus digunakan untuk melindungi yang lemah dan menegakkan keadilan.",
        },
      ],
      storyAppearances: [
        {
          title: "Gatotkaca Winisuda",
          origin: "Javanese",
          role: "Pangeran muda yang membuktikan kemampuannya sebagai prajurit",
          duration: "2 jam",
          otherCharacters: 11,
        },
      ],
      familyTree: [
        { name: "Bhima", relationship: "Ayah" },
        { name: "Hidimbi", relationship: "Ibu" },
        { name: "Arjuna", relationship: "Paman" },
      ],
      symbolism: [
        {
          element: "Kemampuan Terbang",
          meaning:
            "Kebebasan spiritual dan kemampuan melampaui keterbatasan fisik",
          significance: "Freedom",
          icon: "Zap",
        },
      ],
    },
  ];




  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseViewer = () => {
    setSelectedCharacter(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      types: [],
      origins: [],
      themes: [],
      minPopularity: 0,
    });
  };

  const handleRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters?.length);
    setSelectedCharacter(characters?.[randomIndex]);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Close filter panel when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterPanelOpen && !event?.target?.closest(".filter-panel")) {
        setIsFilterPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterPanelOpen]);

  return (
    <>
      <Helmet>
        <title>Galeri Wayang - Alam Karakter | Wayang Interaktif</title>
        <meta
          name="description"
          content="Explore our comprehensive collection of traditional Indonesian wayang characters through interactive 3D models. Discover their stories, relationships, and cultural significance."
        />
        <meta
          name="keywords"
          content="wayang, 3D gallery, Indonesian culture, traditional puppets, character database, mythology"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Gallery Header */}
            <GalleryHeader
              totalCharacters={characters?.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onRandomCharacter={handleRandomCharacter}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Panel */}
              <div className="lg:col-span-1 filter-panel">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  isOpen={isFilterPanelOpen}
                  onToggle={toggleFilterPanel}
                />
              </div>

              {/* Character Grid */}
              <div className="lg:col-span-3">
                <CharacterGrid
                  characters={characters}
                  filters={filters}
                  selectedCharacter={selectedCharacter}
                  onCharacterSelect={handleCharacterSelect}
                  viewMode={viewMode}
                  sortBy={sortBy}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Character Viewer Modal */}
        {selectedCharacter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background overlay + blur */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            {/* Modal content */}
            <div className="relative z-10 max-w-4xl w-full mx-4">
              <CharacterViewer
                character={selectedCharacter}
                onClose={handleCloseViewer}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WayangGallery;
