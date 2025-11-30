import { Link } from 'react-router-dom';
import { ArrowRight, Target, Flame, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { QuoteRotator } from '@/components/QuoteRotator';
import { MotivationWall } from '@/components/MotivationWall';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-primary/5" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Transform Your Life with Discipline
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
              FocusForge
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-2 text-primary-foreground/80">
                21/90 Habit System
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Build lasting habits with the power of 21-day formation and 90-day transformation. 
              Inspired by the wisdom of legends, designed for your success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/tracker-21">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-glow">
                  <Target className="h-5 w-5 mr-2" />
                  Start 21-Day Journey
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/tracker-90">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-xl">
                  <Flame className="h-5 w-5 mr-2" />
                  Start 90-Day Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-4 py-16">
        <QuoteRotator />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
          Your Path to <span className="text-accent">Transformation</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">21-Day Formation</h3>
            <p className="text-muted-foreground">
              Research shows it takes 21 days to form a new neural pathway. Start here to build the foundation of your new habit.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Flame className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">90-Day Lifestyle</h3>
            <p className="text-muted-foreground">
              Transform your habit into a permanent lifestyle change. After 90 days, your new behavior becomes automatic.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6">
              <Clock className="h-7 w-7 text-success" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">Productivity Suite</h3>
            <p className="text-muted-foreground">
              Pomodoro timer, to-do lists, daily goals, and more. Everything you need to maximize your focus and output.
            </p>
          </div>
        </div>
      </section>

      {/* Motivation Wall Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Learn from the <span className="text-accent">Legends</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Draw inspiration from the greatest minds who exemplified discipline, courage, and unwavering commitment to their ideals.
          </p>
        </div>
        
        <MotivationWall />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Your journey of a thousand miles begins with a single step. Take that step today.
          </p>
          <Link to="/tracker-21">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-xl">
              Begin Your Journey
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
