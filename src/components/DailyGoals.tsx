import { useState, useEffect } from 'react';
import { Target, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveDailyGoals, loadDailyGoals, generateId, DailyGoal } from '@/lib/storage';
import { cn } from '@/lib/utils';

export function DailyGoals() {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    setGoals(loadDailyGoals());
  }, []);

  const saveGoals = (newGoals: DailyGoal[]) => {
    setGoals(newGoals);
    saveDailyGoals(newGoals);
  };

  const addGoal = () => {
    if (!newGoal.trim() || goals.length >= 3) return;
    
    const goal: DailyGoal = {
      id: generateId(),
      text: newGoal.trim(),
      completed: false,
    };
    
    saveGoals([...goals, goal]);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveGoals(updated);
  };

  const clearGoals = () => {
    saveGoals([]);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          <h3 className="font-serif text-xl font-bold">Daily Goals</h3>
        </div>
        {goals.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearGoals}
            className="text-muted-foreground hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Set max 3 goals to stay focused. What matters most today?
      </p>

      {/* Goals List */}
      <div className="space-y-3 mb-4">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
              goal.completed
                ? "bg-success/10 border-success"
                : "bg-muted/30 border-border hover:border-primary"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                goal.completed
                  ? "bg-success text-success-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              {goal.completed ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span
              className={cn(
                "flex-1 font-medium transition-all",
                goal.completed && "line-through text-muted-foreground"
              )}
            >
              {goal.text}
            </span>
          </div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: 3 - goals.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
              {goals.length + i + 1}
            </div>
            <span className="text-sm">Goal {goals.length + i + 1}</span>
          </div>
        ))}
      </div>

      {/* Add Goal */}
      {goals.length < 3 && (
        <div className="flex gap-2">
          <Input
            placeholder="Add a priority goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
          <Button onClick={addGoal} size="icon" className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
