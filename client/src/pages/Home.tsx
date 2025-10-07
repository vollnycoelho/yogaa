import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Target, Users } from "lucide-react";
import heroImage from '@assets/generated_images/Yoga_hero.png';

export default function Home() {
  const benefits = [
    {
      icon: Heart,
      title: "Holistic Wellness",
      description:
        "Transform your mind, body, and spirit through ancient yoga practices",
    },
    {
      icon: Target,
      title: "Expert Guidance",
      description: "Learn from certified instructors with years of experience",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a vibrant community of wellness enthusiasts",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            Sarvaswasthyam Yoga & Fitness
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto font-serif">
            Transform your wellness journey with expert-led yoga sessions and
            personalized fitness programs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/sessions">
              <a>
                <Button
                  size="lg"
                  className="text-lg px-8"
                  data-testid="button-browse-sessions"
                >
                  Browse Sessions
                </Button>
              </a>
            </Link>
            <Link href="/exercises">
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
                  data-testid="button-watch-videos"
                >
                  Watch Videos
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Sarvaswasthyam
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-12 pb-8 px-6">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Journey Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-serif">
            Join thousands of members who have transformed their lives through
            yoga and fitness
          </p>
          <Link href="/login">
            <a>
              <Button
                size="lg"
                className="text-lg px-8"
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
