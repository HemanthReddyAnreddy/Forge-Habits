import { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveTodos, loadTodos, generateId, TodoItem } from '@/lib/storage';
import { cn } from '@/lib/utils';

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const saveTodoList = (newTodos: TodoItem[]) => {
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: TodoItem = {
      id: generateId(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    saveTodoList([todo, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTodoList(updated);
  };

  const deleteTodo = (id: string) => {
    saveTodoList(todos.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold">To-Do List</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{todos.length} done
        </span>
      </div>

      {/* Add Todo */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo} size="icon" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Todo List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                todo.completed
                  ? "bg-success/5 border-success/20"
                  : "bg-muted/50 border-border hover:border-primary/50"
              )}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  todo.completed
                    ? "bg-success border-success text-success-foreground"
                    : "border-muted-foreground hover:border-primary"
                )}
              >
                {todo.completed && <Check className="h-3 w-3" />}
              </button>
              <span
                className={cn(
                  "flex-1 text-sm transition-all",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
