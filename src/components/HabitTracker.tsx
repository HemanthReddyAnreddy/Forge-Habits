import { useState, useEffect } from 'react';
import { Check, RotateCcw, Trophy, Flame, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  saveHabitProgress,
  loadHabitProgress,
  resetHabitProgress,
  calculateStreak,
  HabitData,
} from '@/lib/storage';
import { cn } from '@/lib/utils';

interface HabitTrackerProps {
  type: '21' | '90';
}

export function HabitTracker({ type }: HabitTrackerProps) {
  const totalDays = type === '21' ? 21 : 90;
  const [habitName, setHabitName] = useState('');
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => {
    const saved = loadHabitProgress(type);
    if (saved) {
      setHabitName(saved.name);
      setCompletedDays(saved.completedDays);
      setStartDate(saved.startDate);
    }
  }, [type]);

  const saveProgress = (name: string, days: number[]) => {
    const data: HabitData = {
      name,
      completedDays: days,
      startDate: startDate || new Date().toISOString(),
      type,
    };
    saveHabitProgress(type, data);
  };

  const toggleDay = (day: number) => {
    if (!habitName) {
      toast({
        title: "Set your habit first!",
        description: "Enter a habit name to start tracking.",
        variant: "destructive",
      });
      return;
    }

    const newDays = completedDays.includes(day)
      ? completedDays.filter((d) => d !== day)
      : [...completedDays, day];

    setCompletedDays(newDays);
    saveProgress(habitName, newDays);

    if (!completedDays.includes(day)) {
      toast({
        title: "Great job! 🎯",
        description: "One step closer to your goal. Keep going!",
      });
    }

    // Check for milestone completions
    if (newDays.length === totalDays && !completedDays.includes(day)) {
      toast({
        title: "🏆 Congratulations!",
        description: `You've completed the ${type}-day challenge! You're amazing!`,
      });
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetHabitProgress(type);
      setHabitName('');
      setCompletedDays([]);
      setStartDate('');
      toast({
        title: "Progress reset",
        description: "Your tracker has been reset. Start fresh!",
      });
    }
  };

  const handleSetHabit = () => {
    if (habitName.trim()) {
      setIsEditing(false);
      if (!startDate) {
        setStartDate(new Date().toISOString());
      }
      saveProgress(habitName, completedDays);
      toast({
        title: "Habit set!",
        description: `"${habitName}" - Let's build this habit together!`,
      });
    }
  };

  const progress = (completedDays.length / totalDays) * 100;
  const streak = calculateStreak(completedDays);

  // Generate grid items
  const gridCols = type === '21' ? 7 : 10;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            {isEditing || !habitName ? (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your habit (e.g., Exercise, Read, Meditate)"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSetHabit()}
                  className="text-lg"
                />
                <Button onClick={handleSetHabit} className="bg-primary hover:bg-primary/90">
                  Set Habit
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {habitName}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
              <Flame className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent">{streak} Day Streak</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-destructive hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">
              {completedDays.length} / {totalDays} days ({Math.round(progress)}%)
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Day Grid */}
      <div className={cn(
        "grid gap-2",
        type === '21' ? "grid-cols-7" : "grid-cols-5 md:grid-cols-10"
      )}>
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const isCompleted = completedDays.includes(day);
          const weekNumber = Math.floor(i / 7) + 1;
          const showWeekLabel = type === '90' && i % 7 === 0 && i > 0;

          return (
            <div key={day} className="relative">
              {showWeekLabel && (
                <div className="absolute -top-6 left-0 text-xs text-muted-foreground font-medium">
                  Week {weekNumber}
                </div>
              )}
              <button
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-full aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200 border-2",
                  isCompleted
                    ? "bg-success/10 border-success text-success shadow-md"
                    : "bg-card border-border hover:border-primary hover:bg-muted",
                  !habitName && "opacity-50 cursor-not-allowed"
                )}
                disabled={!habitName}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  <span className="text-sm md:text-base font-medium text-muted-foreground">
                    {day}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Completion Reward */}
      {completedDays.length === totalDays && (
        <div className="bg-gradient-to-r from-accent/20 to-success/20 rounded-2xl p-8 text-center animate-scale-in border border-accent/30">
          <Trophy className="h-16 w-16 text-accent mx-auto mb-4 animate-bounce-subtle" />
          <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
            🎉 Challenge Complete! 🎉
          </h3>
          <p className="text-muted-foreground text-lg">
            You've successfully completed your {type}-day journey. 
            {type === '21' 
              ? " Your habit is now forming. Consider starting the 90-day challenge!"
              : " This habit is now part of your lifestyle. You're unstoppable!"}
          </p>
        </div>
      )}
    </div>
  );
}
