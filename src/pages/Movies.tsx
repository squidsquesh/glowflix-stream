import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Play, Youtube, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import MoviePoster3D from '@/components/3d/MoviePoster3D';
import CreateRoomModal from '@/components/modals/CreateRoomModal';
import WatchChoiceModal from '@/components/modals/WatchChoiceModal';
import { useAuth } from '@/App';

// Import posters
import poster1 from '@/assets/poster-1.jpg';
import poster2 from '@/assets/poster-2.jpg';
import poster3 from '@/assets/poster-3.jpg';
import poster4 from '@/assets/poster-4.jpg';
import poster5 from '@/assets/poster-5.jpg';

const movies = [
  { id: 1, title: 'Nexus Dawn', genre: 'Action', year: 2024, rating: 8.5, poster: poster1 },
  { id: 2, title: 'Quantum Shift', genre: 'Sci-Fi', year: 2024, rating: 9.1, poster: poster2 },
  { id: 3, title: 'Golden Realm', genre: 'Fantasy', year: 2023, rating: 8.8, poster: poster3 },
  { id: 4, title: 'Midnight Echoes', genre: 'Drama', year: 2023, rating: 8.2, poster: poster4 },
  { id: 5, title: 'Stellar Odyssey', genre: 'Adventure', year: 2024, rating: 8.9, poster: poster5 },
  { id: 6, title: 'Nexus Dawn 2', genre: 'Action', year: 2024, rating: 8.7, poster: poster1 },
  { id: 7, title: 'Quantum Legacy', genre: 'Sci-Fi', year: 2024, rating: 9.0, poster: poster2 },
  { id: 8, title: 'Golden Realm: Return', genre: 'Fantasy', year: 2024, rating: 8.9, poster: poster3 },
];

const youtubeVideos = [
  { id: 1, title: 'Epic Gaming Moments', genre: 'Gaming', year: 2024, rating: 9.2, poster: poster1 },
  { id: 2, title: 'Tech Reviews 2024', genre: 'Technology', year: 2024, rating: 8.8, poster: poster2 },
  { id: 3, title: 'Music Mashup Mix', genre: 'Music', year: 2024, rating: 9.5, poster: poster3 },
  { id: 4, title: 'Vlog Adventures', genre: 'Lifestyle', year: 2024, rating: 8.3, poster: poster4 },
  { id: 5, title: 'Learning Code Pro', genre: 'Education', year: 2024, rating: 9.1, poster: poster5 },
  { id: 6, title: 'Gaming Live Stream', genre: 'Gaming', year: 2024, rating: 8.9, poster: poster1 },
  { id: 7, title: 'Tech Unboxing', genre: 'Technology', year: 2024, rating: 8.7, poster: poster2 },
  { id: 8, title: 'Music Production', genre: 'Music', year: 2024, rating: 9.0, poster: poster3 },
];

export default function Movies() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isWatchChoiceOpen, setIsWatchChoiceOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<typeof movies[0] | null>(null);
  const [isYouTubeMode, setIsYouTubeMode] = useState(false);

  const movieGenres = ['All', 'Action', 'Sci-Fi', 'Fantasy', 'Drama', 'Adventure'];
  const youtubeGenres = ['All', 'Gaming', 'Technology', 'Music', 'Lifestyle', 'Education'];
  
  const genres = isYouTubeMode ? youtubeGenres : movieGenres;
  const currentContent = isYouTubeMode ? youtubeVideos : movies;
  
  const filteredMovies = currentContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || item.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleMovieClick = (movieId: number) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    const content = currentContent.find(m => m.id === movieId);
    if (content) {
      setSelectedMovie(content);
      setIsWatchChoiceOpen(true);
    }
  };

  const handleModeToggle = (pressed: boolean) => {
    setIsYouTubeMode(pressed);
    setSearchTerm('');
    setSelectedGenre('All');
  };

  const handleWatchTogether = () => {
    setIsWatchChoiceOpen(false);
    setIsCreateRoomOpen(true);
  };

  const handleWatchAlone = () => {
    if (selectedMovie) {
      setIsWatchChoiceOpen(false);
      navigate(`/watch-alone/${selectedMovie.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-6 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-start justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {isYouTubeMode ? 'YouTube Videos' : 'Movie Library'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isYouTubeMode 
                ? 'Choose a video and create a room to watch with friends'
                : 'Choose a movie and create a room to watch with friends'
              }
            </p>
          </div>
          
          {/* YouTube/Movies Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={isYouTubeMode}
                  onPressedChange={handleModeToggle}
                  aria-label="Toggle YouTube mode"
                  className={`h-12 w-12 ${
                    isYouTubeMode 
                      ? 'data-[state=on]:bg-[#FF0000] data-[state=on]:text-white hover:bg-primary/20' 
                      : 'hover:bg-[#FF0000]/20 data-[state=off]:hover:text-[#FF0000]'
                  }`}
                >
                  {isYouTubeMode ? (
                    <Film className="h-6 w-6" />
                  ) : (
                    <Youtube className="h-6 w-6" />
                  )}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isYouTubeMode ? 'Switch to movies' : 'Switch to YouTube videos'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={isYouTubeMode ? "Search videos..." : "Search movies..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Genre filters */}
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "cinema"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className="rounded-full"
              >
                {genre}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`grid gap-6 ${
            isYouTubeMode 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }`}
        >
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative mb-4 ${isYouTubeMode ? 'aspect-video' : 'h-[300px]'}`}>
                <MoviePoster3D 
                  posterUrl={movie.poster}
                  className="w-full h-full"
                  onClick={() => handleMovieClick(movie.id)}
                />
                
                {/* Quick action overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => handleMovieClick(movie.id)}
                    className="scale-90 hover:scale-100"
                  >
                    {isYouTubeMode ? (
                      <>
                        <Youtube className="w-5 h-5 mr-2" />
                        Watch Video
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Watch Movie
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="font-semibold text-base group-hover:text-primary smooth-transition line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                    {movie.rating}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results */}
        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold mb-2">
              {isYouTubeMode ? 'No videos found' : 'No movies found'}
            </h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Watch Choice Modal */}
      {selectedMovie && (
        <WatchChoiceModal
          isOpen={isWatchChoiceOpen}
          onClose={() => {
            setIsWatchChoiceOpen(false);
            setSelectedMovie(null);
          }}
          movieTitle={selectedMovie.title}
          movieId={selectedMovie.id}
          onWatchTogether={handleWatchTogether}
          onWatchAlone={handleWatchAlone}
        />
      )}

      {/* Create Room Modal */}
      {selectedMovie && (
        <CreateRoomModal
          isOpen={isCreateRoomOpen}
          onClose={() => {
            setIsCreateRoomOpen(false);
            setSelectedMovie(null);
          }}
          movieTitle={selectedMovie.title}
          movieId={selectedMovie.id}
        />
      )}
    </div>
  );
}