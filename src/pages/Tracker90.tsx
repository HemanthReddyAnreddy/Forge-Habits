import { Layout } from '@/components/Layout';
import { HabitTracker } from '@/components/HabitTracker';
import { QuoteRotator } from '@/components/QuoteRotator';
import { Flame } from 'lucide-react';

const Tracker90 = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium text-sm">Lifestyle Transformation</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            90-Day Challenge
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            After 90 days, your habit becomes a permanent part of your lifestyle. 
            This is where real transformation happens.
          </p>
        </div>

        {/* Tracker */}
        <div className="max-w-5xl mx-auto mb-12">
          <HabitTracker type="90" />
        </div>

        {/* Motivational Quote */}
        <div className="max-w-2xl mx-auto">
          <QuoteRotator />
        </div>
      </div>
    </Layout>
  );
};

export default Tracker90;
