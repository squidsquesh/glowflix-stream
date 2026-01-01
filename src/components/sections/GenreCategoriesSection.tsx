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
  { name: 'Action', icon: Swords, color: 'bg-red-500' },
  { name: 'Comedy', icon: Laugh, color: 'bg-amber-500' },
  { name: 'Drama', icon: Theater, color: 'bg-purple-500' },
  { name: 'Horror', icon: Ghost, color: 'bg-slate-500' },
  { name: 'Sci-Fi', icon: Rocket, color: 'bg-cyan-500' },
  { name: 'Romance', icon: Heart, color: 'bg-rose-500' },
  { name: 'Thriller', icon: Crosshair, color: 'bg-emerald-500' },
  { name: 'Animation', icon: Sparkles, color: 'bg-violet-500' },
];

export default function GenreCategoriesSection() {
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/movies?genre=${genre.toLowerCase()}`);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            Browse by Genre
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Find the perfect movie for your mood
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenreClick(genre.name)}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-xl ${genre.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <genre.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {genre.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
