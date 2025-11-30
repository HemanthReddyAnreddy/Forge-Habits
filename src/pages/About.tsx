import { Layout } from '@/components/Layout';
import { MotivationWall } from '@/components/MotivationWall';
import { QuoteRotator } from '@/components/QuoteRotator';
import { Brain, Target, Flame, Heart, BookOpen, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium text-sm">The Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            About FocusForge
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Understanding the science of habits and the wisdom of legends that power your transformation journey.
          </p>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-16">
          <QuoteRotator />
        </div>

        {/* The Science Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold">The Science of Habits</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="font-serif text-xl font-bold">21-Day Formation</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Research by Dr. Maxwell Maltz found that it takes a minimum of 21 days 
                to form a new neural pathway. During this period, your brain is creating 
                new connections that will support your desired behavior.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Week 1: Breaking old patterns
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Week 2: Building new neural pathways
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Week 3: Reinforcing the new habit
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="h-6 w-6 text-accent" />
                <h3 className="font-serif text-xl font-bold">90-Day Transformation</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                According to a study published in the European Journal of Social Psychology, 
                it takes an average of 66 days for a new behavior to become automatic. 
                The 90-day mark ensures permanent lifestyle change.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Days 1-30: Conscious effort required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Days 31-60: Habit becoming natural
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Days 61-90: Automatic behavior achieved
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-serif text-3xl font-bold">Our Philosophy</h2>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border/50">
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                FocusForge is built on the timeless wisdom of legendary figures who demonstrated 
                extraordinary discipline, courage, and commitment to their ideals.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif font-bold text-foreground mb-2">
                    From Swami Vivekananda
                  </h4>
                  <p className="text-sm">
                    We learn that all power lies within us. Self-belief and focused action 
                    can move mountains. "Arise, awake, and stop not until the goal is reached."
                  </p>
                </div>
                
                <div>
                  <h4 className="font-serif font-bold text-foreground mb-2">
                    From APJ Abdul Kalam
                  </h4>
                  <p className="text-sm">
                    Dreams are not what you see in sleep. True dreams are those that don't 
                    let you sleep until you achieve them. Excellence is a continuous process.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-serif font-bold text-foreground mb-2">
                    From Bhagat Singh
                  </h4>
                  <p className="text-sm">
                    Ideas cannot be killed. With courage and conviction, even the most 
                    challenging goals become achievable. Revolution begins within.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-serif font-bold text-foreground mb-2">
                    From Marcus Aurelius
                  </h4>
                  <p className="text-sm">
                    Stoic wisdom teaches us to focus on what we can control—our thoughts, 
                    our actions, our habits. The quality of our thoughts determines our happiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Motivation Wall */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-success" />
            </div>
            <h2 className="font-serif text-3xl font-bold">The Legends</h2>
          </div>
          
          <MotivationWall />
        </section>

        {/* How to Use */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">
            How to Use FocusForge
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 1,
                title: "Choose Your Habit",
                desc: "Pick one habit to focus on. Don't try to change everything at once.",
              },
              {
                step: 2,
                title: "Start with 21 Days",
                desc: "Complete the 21-day challenge to form the initial neural pathway.",
              },
              {
                step: 3,
                title: "Continue to 90 Days",
                desc: "Transform your habit into a permanent lifestyle change.",
              },
              {
                step: 4,
                title: "Use the Tools",
                desc: "Leverage Pomodoro, goals, and notes to maximize your productivity.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-xl p-6 shadow-card border border-border/50 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="font-serif font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
