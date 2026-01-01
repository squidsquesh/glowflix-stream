import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Swords, 
  Laugh, 
  Drama, 
  Ghost, 
  Rocket, 
  Heart, 
  Crosshair, 
  Sparkles 
} from 'lucide-react';

const genres = [
  { name: 'Action', icon: Swords, gradient: 'from-red-500/20 to-orange-500/20', hoverGradient: 'hover:from-red-500/30 hover:to-orange-500/30' },
  { name: 'Comedy', icon: Laugh, gradient: 'from-yellow-500/20 to-amber-500/20', hoverGradient: 'hover:from-yellow-500/30 hover:to-amber-500/30' },
  { name: 'Drama', icon: Drama, gradient: 'from-purple-500/20 to-pink-500/20', hoverGradient: 'hover:from-purple-500/30 hover:to-pink-500/30' },
  { name: 'Horror', icon: Ghost, gradient: 'from-slate-500/20 to-gray-500/20', hoverGradient: 'hover:from-slate-500/30 hover:to-gray-500/30' },
  { name: 'Sci-Fi', icon: Rocket, gradient: 'from-cyan-500/20 to-blue-500/20', hoverGradient: 'hover:from-cyan-500/30 hover:to-blue-500/30' },
  { name: 'Romance', icon: Heart, gradient: 'from-rose-500/20 to-pink-500/20', hoverGradient: 'hover:from-rose-500/30 hover:to-pink-500/30' },
  { name: 'Thriller', icon: Crosshair, gradient: 'from-emerald-500/20 to-teal-500/20', hoverGradient: 'hover:from-emerald-500/30 hover:to-teal-500/30' },
  { name: 'Animation', icon: Sparkles, gradient: 'from-indigo-500/20 to-violet-500/20', hoverGradient: 'hover:from-indigo-500/30 hover:to-violet-500/30' },
];

export default function GenreCategoriesSection() {
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/movies?genre=${genre.toLowerCase()}`);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Browse by Genre
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect movie for your mood. Explore our curated collections across all genres.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => handleGenreClick(genre.name)}
              className={`
                cursor-pointer rounded-2xl p-6 lg:p-8 
                bg-gradient-to-br ${genre.gradient} ${genre.hoverGradient}
                border border-border/50 hover:border-primary/50
                transition-all duration-300 group
                hover:shadow-lg hover:shadow-primary/10
              `}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <genre.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
