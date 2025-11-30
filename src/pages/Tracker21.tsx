import { Layout } from '@/components/Layout';
import { HabitTracker } from '@/components/HabitTracker';
import { QuoteRotator } from '@/components/QuoteRotator';
import { Target } from 'lucide-react';

const Tracker21 = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">Habit Formation</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            21-Day Challenge
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            It takes 21 days to form a new neural pathway. Complete each day to build 
            the foundation of your new habit.
          </p>
        </div>

        {/* Tracker */}
        <div className="max-w-4xl mx-auto mb-12">
          <HabitTracker type="21" />
        </div>

        {/* Motivational Quote */}
        <div className="max-w-2xl mx-auto">
          <QuoteRotator />
        </div>
      </div>
    </Layout>
  );
};

export default Tracker21;
