import { motion } from "framer-motion";
import { 
  Users, 
  MessageCircle, 
  Mic, 
  User, 
  Sparkles, 
  Play, 
  Bookmark, 
  Search, 
  DollarSign, 
  Gift, 
  Zap,
  Globe,
  Volume2,
  FileText,
  Eye,
  Wifi,
  Cast,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureCategories = [
  {
    title: "Social & Engagement Features",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        icon: Users,
        title: "Watch Party Mode",
        description: "Allow users to sync-watch movies or shows together in real time, with integrated chat, reactions, or video thumbnails of friends."
      },
      {
        icon: MessageCircle,
        title: "In-Stream Chat & Reactions",
        description: "Add live chat and emoji reactions during streams, like Twitch or Disney+ GroupWatch."
      },
      {
        icon: Mic,
        title: "Voice Rooms & Spaces",
        description: "Let users create voice-only chat rooms (like Discord or Clubhouse) for discussions before or after the movie."
      },
      {
        icon: User,
        title: "User Profiles & Status",
        description: "Users can customize profiles, show what they're watching, and set availability status (\"watching\", \"call me\", etc.)"
      }
    ]
  },
  {
    title: "Content & Discovery Features",
    icon: Play,
    color: "from-purple-500 to-pink-500",
    features: [
      {
        icon: Sparkles,
        title: "AI-Powered Recommendation Engine",
        description: "Personalized suggestions using ML based on watch history, friends' activity, and ratings."
      },
      {
        icon: Play,
        title: "Trailers & Teasers Feed",
        description: "A TikTok-style vertical feed for discovering short-form trailers, upcoming releases, or user-generated clips."
      },
      {
        icon: Bookmark,
        title: "Scene Bookmarking & Sharing",
        description: "Let users save or share specific scenes or timestamps."
      },
      {
        icon: Search,
        title: "Smart Search",
        description: "Voice-enabled and fuzzy search by actor, genre, emotion (\"funny action scenes\", \"romantic 90s\"), etc."
      }
    ]
  },
  {
    title: "Monetization & Premium Features",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    features: [
      {
        icon: DollarSign,
        title: "Subscription Tiers / VIP Rooms",
        description: "Paywalled access to exclusive rooms, early releases, or 4K/IMAX quality streams."
      },
      {
        icon: Gift,
        title: "Gifting & Donations",
        description: "In-stream tipping, coins, or gifting to creators during community events or live watch parties."
      },
      {
        icon: Zap,
        title: "Ad Integration",
        description: "Interactive or skippable ads (for free-tier users) based on behavior."
      }
    ]
  },
  {
    title: "AI & Smart Features",
    icon: Sparkles,
    color: "from-orange-500 to-red-500",
    features: [
      {
        icon: Globe,
        title: "Real-Time Subtitles Translation",
        description: "Translate subtitles on the fly using AI for multilingual audiences."
      },
      {
        icon: Volume2,
        title: "AI Voice Dubbing",
        description: "Dub content into the user's preferred language using voice cloning or TTS."
      },
      {
        icon: FileText,
        title: "Smart Summarizer or Recaps",
        description: "AI-generated summaries of past episodes or movies before the next viewing."
      },
      {
        icon: Eye,
        title: "Emotion Recognition (Opt-in)",
        description: "Detect user emotions via webcam and suggest content accordingly (optional, privacy-focused)."
      },
      {
        icon: Wifi,
        title: "Offline Sync Download",
        description: "Watch parties with offline files — sync with others even if only one person has the file."
      },
      {
        icon: Cast,
        title: "Multi-device Casting & Control",
        description: "Control playback across devices, like mobile as remote for desktop or TV."
      },
      {
        icon: Shield,
        title: "Parental Control & Kids Mode",
        description: "Restricted profiles, time-limits, and age-appropriate content filtering."
      }
    ]
  }
];

export default function Future() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="relative container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                The Future of Cinema
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover what's coming next to Cinema Together. These innovative features will revolutionize how we watch, connect, and experience entertainment together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {featureCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="mb-20"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center gap-3 p-3 rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.features.map((feature, featureIndex) => {
                    const FeatureIcon = feature.icon;
                    
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.2 + featureIndex * 0.1 
                        }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                                <FeatureIcon className="w-5 h-5" />
                              </div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base leading-relaxed">
                              {feature.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              These features represent our vision for the next generation of social entertainment. 
              Join us now and be part of the journey as we build the future of cinema together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}