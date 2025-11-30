import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { savePomodoroSettings, loadPomodoroSettings } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function PomodoroTimer() {
  const [settings, setSettings] = useState(loadPomodoroSettings());
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const totalTime = isBreak ? settings.breakDuration * 60 : settings.workDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(isBreak ? settings.breakDuration * 60 : settings.workDuration * 60);
    setIsRunning(false);
  }, [isBreak, settings]);

  const switchMode = useCallback(() => {
    const newIsBreak = !isBreak;
    setIsBreak(newIsBreak);
    setTimeLeft(newIsBreak ? settings.breakDuration * 60 : settings.workDuration * 60);
    setIsRunning(false);

    if (!newIsBreak) {
      const newSettings = {
        ...settings,
        sessionsCompleted: settings.sessionsCompleted + 1,
      };
      setSettings(newSettings);
      savePomodoroSettings(newSettings);
    }
  }, [isBreak, settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: isBreak ? "Break's over!" : "Time for a break!",
        description: isBreak ? "Ready to focus again?" : "You've earned it. Take a short break!",
      });
      switchMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, switchMode]);

  const handleSaveSettings = () => {
    savePomodoroSettings(settings);
    setTimeLeft(settings.workDuration * 60);
    setShowSettings(false);
    toast({
      title: "Settings saved",
      description: "Your Pomodoro settings have been updated.",
    });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold">Pomodoro Timer</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Sessions: {settings.sessionsCompleted}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings ? (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Work Duration (min)</Label>
              <Input
                type="number"
                min={1}
                max={60}
                value={settings.workDuration}
                onChange={(e) =>
                  setSettings({ ...settings, workDuration: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Break Duration (min)</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={settings.breakDuration}
                onChange={(e) =>
                  setSettings({ ...settings, breakDuration: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="w-full">
            Save Settings
          </Button>
        </div>
      ) : (
        <div className="text-center">
          {/* Timer Display */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Background circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * progress) / 100}
                className={cn(
                  "transition-all duration-1000",
                  isBreak ? "text-success" : "text-accent"
                )}
              />
            </svg>
            
            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-mono text-foreground">
                {formatTime(timeLeft)}
              </span>
              <span className={cn(
                "text-sm font-medium mt-1",
                isBreak ? "text-success" : "text-accent"
              )}>
                {isBreak ? "Break Time" : "Focus Time"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              className="h-12 w-12 rounded-full"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={cn(
                "h-12 w-12 rounded-full",
                isBreak ? "bg-success hover:bg-success/90" : "bg-accent hover:bg-accent/90"
              )}
            >
              {isRunning ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
