import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VirtualDalangTheaterPerformanceExperience from './pages/virtual-dalang-theater-performance-experience';
import GamelanPlaygroundPage from './pages/gamelan-playground-musical-exploration';
import WayangGallery from './pages/3d-wayang-gallery-character-universe';
import HomepageCulturalGateway from './pages/homepage-cultural-gateway';
import CulturalLearningHub from './pages/cultural-learning-hub-educational-foundation';
import InteractiveStoryPathsPage from './pages/interactive-story-paths-narrative-adventures';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<WayangGallery />} />
        <Route path="/virtual-dalang-theater-performance-experience" element={<VirtualDalangTheaterPerformanceExperience />} />
        <Route path="/gamelan-playground-musical-exploration" element={<GamelanPlaygroundPage />} />
        <Route path="/3d-wayang-gallery-character-universe" element={<WayangGallery />} />
        <Route path="/homepage-cultural-gateway" element={<HomepageCulturalGateway />} />
        <Route path="/cultural-learning-hub-educational-foundation" element={<CulturalLearningHub />} />
        <Route path="/interactive-story-paths-narrative-adventures" element={<InteractiveStoryPathsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
