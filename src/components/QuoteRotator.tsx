import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { quotes, getRandomQuote } from '@/lib/quotes';

export function QuoteRotator() {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote(getRandomQuote());
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card p-8 shadow-card border border-border/50">
      <div className="absolute top-4 left-4 text-accent/20">
        <Quote className="h-12 w-12" />
      </div>
      
      <div
        className={`transition-all duration-500 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <blockquote className="quote-text text-xl md:text-2xl text-foreground leading-relaxed mb-4 pl-8">
          "{currentQuote.text}"
        </blockquote>
        <cite className="text-accent font-semibold not-italic pl-8">
          — {currentQuote.author}
        </cite>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-muted transition-colors duration-300"
          />
        ))}
      </div>
    </div>
  );
}
