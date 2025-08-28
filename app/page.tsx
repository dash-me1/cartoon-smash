"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { NotifyModal } from "@/components/notify-modal";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles, Play, Users, Award } from "lucide-react";

export default function HomePage() {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-200 hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Coming Soon
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              Master the Art of{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent animate-pulse">
                Animation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
              Our comprehensive animation courses are launching very soon! Join
              thousands of aspiring animators ready to bring their creativity to
              life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
            <Button
              size="lg"
              onClick={() => setNotifyModalOpen(true)}
              className="text-lg px-8 py-6 shadow-xl shadow-primary/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 always-bounce slow-bounce"
            >
              Notify Me When We Launch
            </Button>
            {user.role !== "visitor" && (
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Preview Courses
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Play,
              title: "Interactive Lessons",
              description:
                "Learn through hands-on projects and real-time feedback from industry professionals.",
              color: "primary",
              delay: "delay-200",
            },
            {
              icon: Users,
              title: "Expert Mentorship",
              description:
                "Get guidance from award-winning animators who've worked on blockbuster films.",
              color: "secondary",
              delay: "delay-400",
            },
            {
              icon: Award,
              title: "Industry Recognition",
              description:
                "Earn certificates that are recognized by top animation studios worldwide.",
              color: "accent",
              delay: "delay-600",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`text-center p-6 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer group animate-in fade-in-0 slide-in-from-bottom-6 duration-700 ${feature.delay} hover:shadow-${feature.color}/10`}
            >
              <CardContent className="space-y-4">
                <div
                  className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <feature.icon
                    className={`w-6 h-6 text-${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-800 hover:scale-[1.02] group">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
              Something Amazing is Coming
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto group-hover:text-foreground/80 transition-colors duration-300">
              We're putting the finishing touches on our revolutionary animation
              learning platform. Be among the first to experience the future of
              creative education.
            </p>
            <Button
              size="lg"
              onClick={() => setNotifyModalOpen(true)}
              className="text-lg px-8 py-6 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group-hover:animate-pulse"
            >
              Get Early Access
            </Button>
          </CardContent>
        </Card>

        {/* User Role Info (for development) */}
        {user.role !== "visitor" && (
          <div className="mt-8 p-4 bg-muted rounded-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-1000 hover:bg-muted/80 transition-colors duration-300">
            <p className="text-sm text-muted-foreground">
              <strong>Current User:</strong> {user.name} ({user.role})
            </p>
          </div>
        )}
      </main>

      <NotifyModal open={notifyModalOpen} onOpenChange={setNotifyModalOpen} />
    </div>
  );
}
