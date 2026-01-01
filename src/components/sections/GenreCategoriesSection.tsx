import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Swords, 
  Laugh, 
  Theater, 
  Ghost, 
  Rocket, 
  Heart, 
  Crosshair, 
  Sparkles 
} from 'lucide-react';

const genres = [
  { name: 'Action', icon: Swords },
  { name: 'Comedy', icon: Laugh },
  { name: 'Drama', icon: Theater },
  { name: 'Horror', icon: Ghost },
  { name: 'Sci-Fi', icon: Rocket },
  { name: 'Romance', icon: Heart },
  { name: 'Thriller', icon: Crosshair },
  { name: 'Animation', icon: Sparkles },
];

export default function GenreCategoriesSection() {
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/movies?genre=${genre.toLowerCase()}`);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Categories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Browse by Genre
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenreClick(genre.name)}
              className="relative flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300 relative z-10">
                <genre.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground relative z-10">
                {genre.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
