import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, SkipForward } from "lucide-react";
import MoviePoster3D from "@/components/3d/MoviePoster3D";

// Sample movie data (in real app, this would come from an API)
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, rating: 8.8, poster: "/src/assets/poster-1.jpg" },
  { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0, poster: "/src/assets/poster-2.jpg" },
  { id: 3, title: "Pulp Fiction", genre: "Crime", year: 1994, rating: 8.9, poster: "/src/assets/poster-3.jpg" },
  { id: 4, title: "The Matrix", genre: "Sci-Fi", year: 1999, rating: 8.7, poster: "/src/assets/poster-4.jpg" },
  { id: 5, title: "Goodfellas", genre: "Crime", year: 1990, rating: 8.7, poster: "/src/assets/poster-5.jpg" },
];

export default function WatchAlone() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const movie = movies.find(m => m.id === parseInt(movieId || ""));
  const suggestedMovies = movies.filter(m => m.id !== parseInt(movieId || "")).slice(0, 8);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const watchMovie = (movieId: number) => {
    navigate(`/watch-alone/${movieId}`);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => navigate('/movies')}>Back to Movies</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/movies')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movies
            </Button>
            <div>
              <h1 className="text-xl font-bold">{movie.title}</h1>
              <p className="text-sm text-muted-foreground">{movie.genre} • {movie.year}</p>
            </div>
          </div>
          <Badge variant="secondary">★ {movie.rating}</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    poster={movie.poster}
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="space-y-2">
                      {/* Progress Bar */}
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      
                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={togglePlay}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMute}
                            className="text-white hover:bg-white/20"
                          >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </Button>
                          <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleFullscreen}
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{movie.title}</h2>
                      <p className="text-muted-foreground">{movie.genre} • {movie.year}</p>
                    </div>
                    <Badge>★ {movie.rating}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Experience this incredible {movie.genre.toLowerCase()} masterpiece in stunning quality. 
                    Immerse yourself in the story and enjoy every moment of this cinematic journey.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Up Next</h3>
                <div className="space-y-4">
                  {suggestedMovies.slice(0, 3).map((suggestedMovie) => (
                    <div
                      key={suggestedMovie.id}
                      className="flex gap-3 cursor-pointer group"
                      onClick={() => watchMovie(suggestedMovie.id)}
                    >
                      <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                          src={suggestedMovie.poster}
                          alt={suggestedMovie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {suggestedMovie.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {suggestedMovie.genre} • {suggestedMovie.year}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs text-muted-foreground">{suggestedMovie.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">More Like This</h3>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedMovies.slice(3, 7).map((suggestedMovie) => (
                    <div
                      key={suggestedMovie.id}
                      className="cursor-pointer group"
                      onClick={() => watchMovie(suggestedMovie.id)}
                    >
                      <div className="w-full aspect-[3/4] bg-muted rounded overflow-hidden mb-2">
                        <img
                          src={suggestedMovie.poster}
                          alt={suggestedMovie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-medium text-xs group-hover:text-primary transition-colors line-clamp-2">
                        {suggestedMovie.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{suggestedMovie.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}