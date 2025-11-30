import { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuoteRotator } from '@/components/QuoteRotator';
import { saveNotes, loadNotes, generateId, Note } from '@/lib/storage';
import { cn } from '@/lib/utils';

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    if (loaded.length > 0) {
      setSelectedNote(loaded[0]);
    }
  }, []);

  const saveAllNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const createNote = () => {
    const newNote: Note = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newNotes = [newNote, ...notes];
    saveAllNotes(newNotes);
    setSelectedNote(newNote);
  };

  const updateNote = (field: 'title' | 'content', value: string) => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };

    const newNotes = notes.map((n) =>
      n.id === selectedNote.id ? updatedNote : n
    );

    saveAllNotes(newNotes);
    setSelectedNote(updatedNote);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((n) => n.id !== id);
    saveAllNotes(newNotes);
    if (selectedNote?.id === id) {
      setSelectedNote(newNotes[0] || null);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">Personal Notes</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notes & Reflections
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Capture your thoughts, goals, and insights. Your notes are saved locally and always available.
          </p>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-8">
          <QuoteRotator />
        </div>

        {/* Notes Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
            <div className="grid md:grid-cols-[300px_1fr] min-h-[500px]">
              {/* Sidebar */}
              <div className="border-r border-border/50 flex flex-col">
                {/* Search and New */}
                <div className="p-4 border-b border-border/50 space-y-3">
                  <Button onClick={createNote} className="w-full bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    New Note
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredNotes.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notes yet</p>
                    </div>
                  ) : (
                    filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => setSelectedNote(note)}
                        className={cn(
                          "p-4 border-b border-border/50 cursor-pointer transition-colors group",
                          selectedNote?.id === note.id
                            ? "bg-muted"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {note.title || 'Untitled'}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {note.content || 'No content'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(note.updatedAt)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Editor */}
              <div className="flex flex-col">
                {selectedNote ? (
                  <>
                    <div className="p-4 border-b border-border/50">
                      <Input
                        value={selectedNote.title}
                        onChange={(e) => updateNote('title', e.target.value)}
                        placeholder="Note title..."
                        className="text-xl font-serif font-bold border-none shadow-none focus-visible:ring-0 px-0"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <Textarea
                        value={selectedNote.content}
                        onChange={(e) => updateNote('content', e.target.value)}
                        placeholder="Start writing your thoughts..."
                        className="min-h-full resize-none border-none shadow-none focus-visible:ring-0 p-0"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a note or create a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
