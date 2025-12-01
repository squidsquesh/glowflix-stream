import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoviePoster3D from '@/components/3d/MoviePoster3D';

// Import all generated posters
import poster1 from '@/assets/poster-1.jpg';
import poster2 from '@/assets/poster-2.jpg';
import poster3 from '@/assets/poster-3.jpg';
import poster4 from '@/assets/poster-4.jpg';
import poster5 from '@/assets/poster-5.jpg';

const movies = [
  { id: 1, title: 'Nexus Dawn', genre: 'Action', rating: 8.5, poster: poster1 },
  { id: 2, title: 'Quantum Shift', genre: 'Sci-Fi', rating: 9.1, poster: poster2 },
  { id: 3, title: 'Golden Realm', genre: 'Fantasy', rating: 8.8, poster: poster3 },
  { id: 4, title: 'Midnight Echoes', genre: 'Drama', rating: 8.2, poster: poster4 },
  { id: 5, title: 'Stellar Odyssey', genre: 'Adventure', rating: 8.9, poster: poster5 },
  { id: 6, title: 'Nexus Dawn', genre: 'Action', rating: 8.5, poster: poster1 },
  { id: 7, title: 'Quantum Shift', genre: 'Sci-Fi', rating: 9.1, poster: poster2 },
  { id: 8, title: 'Golden Realm', genre: 'Fantasy', rating: 8.8, poster: poster3 },
];

export default function MovieCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  // Auto-scroll carousel based on page scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (containerRef.current) {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        const scrollPosition = progress * maxScroll * 0.8; // Smooth scroll
        containerRef.current.scrollLeft = scrollPosition;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, y }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Featured Movies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated collection of blockbuster movies and hidden gems, ready for you to watch with friends.
          </p>
        </motion.div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="border-primary/50 hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="border-primary/50 hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={scrollToTop}
            className="border-primary/50 hover:bg-primary/10"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>

        {/* Movie Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={`${movie.id}-${index}`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[250px] group cursor-pointer"
            >
              <div className="relative h-[375px] mb-4">
                <MoviePoster3D 
                  posterUrl={movie.poster}
                  className="w-full h-full"
                />
                
                {/* Movie info overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl flex flex-col justify-end p-4"
                >
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                        {movie.rating}
                      </span>
                      <span className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded">
                        {movie.genre}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary smooth-transition">
                  {movie.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {movie.genre} • Rating: {movie.rating}/10
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </motion.section>
  );
}