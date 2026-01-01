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
    <section className="py-24 lg:py-32 bg-card/50">
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenreClick(genre.name)}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <genre.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-base font-medium text-foreground">
                {genre.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
