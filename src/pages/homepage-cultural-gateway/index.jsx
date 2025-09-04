import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PathwayCards from './components/PathwayCards';
import CommunityActivity from './components/CommunityActivity';
import GamelanPlayer from './components/GamelanPlayer';
import CulturalPartners from './components/CulturalPartners';
import Footer from './components/Footer';

const HomepageCulturalGateway = () => {
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'id';
    if (savedLanguage !== 'id') {
      localStorage.setItem('language', 'id');
    }

    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Wayang Interactive - Gerbang Budaya Digital Indonesia</title>
        <meta 
          name="description" 
          content="Jelajahi warisan budaya Indonesia melalui pengalaman digital yang memukau. Temukan karakter wayang, pelajari seni dalang, dan ciptakan cerita Anda sendiri dalam platform interaktif yang menghidupkan tradisi berusia berabad-abad." 
        />
        <meta name="keywords" content="wayang, budaya indonesia, dalang, gamelan, cerita interaktif, museum digital, seni tradisional" />
        <meta property="og:title" content="Wayang Interactive - Gerbang Budaya Digital Indonesia" />
        <meta property="og:description" content="Platform digital terdepan untuk melestarikan dan menghidupkan kembali seni wayang kulit Indonesia" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/homepage-cultural-gateway" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <HeroSection />
        {/* <PathwayCards /> */}
        {/* <CommunityActivity /> */}
        <GamelanPlayer />
        <CulturalPartners />
      </main>

      <Footer />
    </div>
  );
};

export default HomepageCulturalGateway;