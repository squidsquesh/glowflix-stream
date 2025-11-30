import { useState } from 'react';
import HeroSection from "@/components/sections/HeroSection";
import MovieCarousel from "@/components/sections/MovieCarousel";
import AuthModal from '@/components/auth/AuthModal';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onAuthClick={() => setAuthModalOpen(true)} />
      <MovieCarousel />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
