import { useState, useEffect } from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveWaterData, loadWaterData } from '@/lib/storage';
import { cn } from '@/lib/utils';

export function WaterTracker() {
  const [data, setData] = useState(loadWaterData());

  useEffect(() => {
    const loaded = loadWaterData();
    setData(loaded);
  }, []);

  const updateGlasses = (delta: number) => {
    const newGlasses = Math.max(0, Math.min(data.goal + 4, data.glasses + delta));
    const newData = { ...data, glasses: newGlasses };
    setData(newData);
    saveWaterData(newData);
  };

  const progress = Math.min((data.glasses / data.goal) * 100, 100);
  const isComplete = data.glasses >= data.goal;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Droplets className="h-5 w-5 text-blue-500" />
        <h3 className="font-serif text-xl font-bold">Water Tracker</h3>
      </div>

      <div className="flex flex-col items-center">
        {/* Visual representation */}
        <div className="relative w-32 h-40 mb-6">
          {/* Glass outline */}
          <div className="absolute inset-0 border-4 border-blue-200 rounded-b-3xl rounded-t-lg" />
          
          {/* Water fill */}
          <div
            className={cn(
              "absolute bottom-1 left-1 right-1 rounded-b-2xl transition-all duration-500",
              isComplete ? "bg-success" : "bg-blue-400"
            )}
            style={{ height: `${progress}%` }}
          />
          
          {/* Glass shine */}
          <div className="absolute top-4 left-3 w-2 h-8 bg-white/30 rounded-full" />
        </div>

        {/* Counter */}
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-foreground">{data.glasses}</span>
          <span className="text-lg text-muted-foreground"> / {data.goal}</span>
          <p className="text-sm text-muted-foreground mt-1">glasses today</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateGlasses(-1)}
            disabled={data.glasses === 0}
            className="h-12 w-12 rounded-full"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => updateGlasses(1)}
            className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Completion message */}
        {isComplete && (
          <p className="text-success text-sm font-medium mt-4 animate-fade-in">
            🎉 Great job! You've reached your goal!
          </p>
        )}
      </div>
    </div>
  );
}
