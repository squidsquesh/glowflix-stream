import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, TrendingUp, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const trendingSearches = [
  'Action Movies', 'Sci-Fi Classics', 'Fantasy Adventures', 'Comedy Night', 'Horror Thrillers'
];

const recentSearches = [
  'Nexus Dawn', 'Quantum movies', 'Fantasy 2024', 'Golden realm'
];

const quickCategories = [
  { name: 'Popular Now', icon: TrendingUp, color: 'text-red-400' },
  { name: 'Recently Added', icon: Clock, color: 'text-blue-400' },
  { name: 'Top Rated', icon: Star, color: 'text-yellow-400' },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background pt-6 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Discover Movies
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your next favorite movie or explore new genres with our advanced search
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for movies, genres, actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-card/50 border-border/50 focus:border-primary rounded-xl"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Quick Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Quick Browse</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quickCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 smooth-transition cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-4 rounded-xl bg-muted/20 mb-4 group-hover:scale-110 smooth-transition`}>
                        <Icon className={`w-8 h-8 ${category.color}`} />
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary smooth-transition">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trending & Recent Searches */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Trending Searches */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-primary">Trending Searches</h3>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-primary/10 hover:text-primary"
                        onClick={() => setSearchTerm(search)}
                      >
                        <SearchIcon className="w-4 h-4 mr-3 opacity-50" />
                        {search}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Searches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-primary">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-primary/10 hover:text-primary"
                        onClick={() => setSearchTerm(search)}
                      >
                        <Clock className="w-4 h-4 mr-3 opacity-50" />
                        {search}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}