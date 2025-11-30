import { useState } from 'react';
import { Quote, ExternalLink } from 'lucide-react';
import { getQuotesByAuthor } from '@/lib/quotes';
import { cn } from '@/lib/utils';

interface Leader {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
}

const leaders: Leader[] = [
  {
    name: "Swami Vivekananda",
    title: "Spiritual Leader & Philosopher",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Swami_Vivekananda_1893_Scanned_Image.jpg",
    description: "Introduced the world to Indian philosophies of Vedanta and Yoga. His teachings on self-belief and service continue to inspire millions."
  },
  {
    name: "APJ Abdul Kalam",
    title: "The Missile Man of India",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/440px-A._P._J._Abdul_Kalam.jpg",
    description: "Former President and aerospace scientist who dreamed big and taught us that dreams are not what you see in sleep, but what keeps you awake."
  },
  {
    name: "Bhagat Singh",
    title: "Revolutionary Freedom Fighter",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Bhagat_Singh_1929.jpg",
    description: "A symbol of courage and sacrifice, his fearless spirit and intellectual approach to revolution inspire generations."
  },
  {
    name: "Chandrashekhar Azad",
    title: "Fearless Revolutionary",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Chandra_Shekhar_Azad_1988_stamp_of_India.jpg",
    description: "Known for his unwavering commitment to freedom, he vowed never to be captured alive and kept his promise until the end."
  },
  {
    name: "Sardar Vallabhbhai Patel",
    title: "Iron Man of India",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Sardar_patel_%28cropped%29.jpg",

    description: "United 562 princely states to form India. His leadership and determination made the impossible possible."
  },
  {
    name: "Marcus Aurelius",
    title: "Stoic Philosopher Emperor",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/MSR-ra-61-b-1-DM.jpg/440px-MSR-ra-61-b-1-DM.jpg",
    description: "Roman Emperor whose Meditations on Stoic philosophy teach us to control what we can and accept what we cannot."
  },
];

export function MotivationWall() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="space-y-8">
      {/* Grid of leaders */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {leaders.map((leader) => (
          <button
            key={leader.name}
            onClick={() => setSelectedLeader(selectedLeader?.name === leader.name ? null : leader)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
              selectedLeader?.name === leader.name
                ? "border-accent shadow-glow"
                : "border-border hover:border-primary"
            )}
          >
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={leader.imageUrl}
                alt={leader.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <h3 className="font-serif text-lg font-bold text-white">
                {leader.name}
              </h3>
              <p className="text-white/80 text-sm line-clamp-1">
                {leader.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected leader detail */}
      {selectedLeader && (
        <div className="animate-fade-in bg-card rounded-2xl p-6 shadow-card border border-border/50">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={selectedLeader.imageUrl}
              alt={selectedLeader.name}
              className="w-32 h-32 rounded-xl object-cover object-top"
            />
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                {selectedLeader.name}
              </h3>
              <p className="text-accent font-medium mb-3">{selectedLeader.title}</p>
              <p className="text-muted-foreground mb-4">{selectedLeader.description}</p>

              {/* Quotes from this leader */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Quote className="h-4 w-4 text-accent" />
                  Wisdom
                </h4>
                {getQuotesByAuthor(selectedLeader.name).slice(0, 2).map((quote, i) => (
                  <blockquote
                    key={i}
                    className="quote-text text-sm text-muted-foreground border-l-2 border-accent pl-4"
                  >
                    "{quote.text}"
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
