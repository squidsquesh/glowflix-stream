import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MovieCarousel from "@/components/sections/MovieCarousel";
import GenreCategoriesSection from "@/components/sections/GenreCategoriesSection";
import WatchWithFriendsSection from "@/components/sections/WatchWithFriendsSection";
import CTAFooterSection from "@/components/sections/CTAFooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <MovieCarousel />
      <GenreCategoriesSection />
      <WatchWithFriendsSection />
      <CTAFooterSection />
    </div>
  );
};

export default Index;
