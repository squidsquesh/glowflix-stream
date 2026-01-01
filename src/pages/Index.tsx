import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MovieCarousel from "@/components/sections/MovieCarousel";
import GenreCategoriesSection from "@/components/sections/GenreCategoriesSection";
import WatchWithFriendsSection from "@/components/sections/WatchWithFriendsSection";
import CTAFooterSection from "@/components/sections/CTAFooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      <section id="movies">
        <MovieCarousel />
      </section>
      <section id="genres">
        <GenreCategoriesSection />
      </section>
      <section id="watch-together">
        <WatchWithFriendsSection />
      </section>
      <section id="get-started">
        <CTAFooterSection />
      </section>
    </div>
  );
};

export default Index;
