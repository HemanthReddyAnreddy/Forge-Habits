import { Layout } from '@/components/Layout';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { TodoList } from '@/components/TodoList';
import { DailyGoals } from '@/components/DailyGoals';
import { WaterTracker } from '@/components/WaterTracker';
import { QuoteRotator } from '@/components/QuoteRotator';
import { Clock, Zap } from 'lucide-react';

const Productivity = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4 text-success" />
            <span className="text-success font-medium text-sm">Productivity Suite</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Daily Productivity Tools
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to stay focused, organized, and hydrated. 
            Master your day with these essential tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          <PomodoroTimer />
          <DailyGoals />
          <TodoList />
          <WaterTracker />
        </div>

        {/* Motivational Quote */}
        <div className="max-w-2xl mx-auto">
          <QuoteRotator />
        </div>
      </div>
    </Layout>
  );
};

export default Productivity;
