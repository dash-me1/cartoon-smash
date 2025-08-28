"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { Clock, Users, Star, Lock, Play, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  category: string;
  isLaunched: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "2D Character Animation Fundamentals",
    description:
      "Learn the basics of 2D character animation using industry-standard techniques and software.",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    price: 299,
    rating: 4.8,
    students: 1250,
    thumbnail: "/2d-character-animation.png",
    category: "2D Animation",
    isLaunched: false,
  },
  {
    id: "2",
    title: "3D Modeling for Animation",
    description:
      "Master 3D modeling techniques specifically designed for animation workflows.",
    instructor: "Mike Chen",
    duration: "10 weeks",
    level: "Intermediate",
    price: 399,
    rating: 4.9,
    students: 890,
    thumbnail: "/3d-modeling-animation.png",
    category: "3D Animation",
    isLaunched: false,
  },
  {
    id: "3",
    title: "Motion Graphics Mastery",
    description:
      "Create stunning motion graphics for commercials, films, and digital media.",
    instructor: "Emma Rodriguez",
    duration: "6 weeks",
    level: "Intermediate",
    price: 349,
    rating: 4.7,
    students: 675,
    thumbnail: "/motion-graphics-design.png",
    category: "Motion Graphics",
    isLaunched: false,
  },
  {
    id: "4",
    title: "Advanced Rigging Techniques",
    description:
      "Professional character rigging for complex animation projects.",
    instructor: "David Park",
    duration: "12 weeks",
    level: "Advanced",
    price: 499,
    rating: 4.9,
    students: 420,
    thumbnail: "/character-rigging-animation.png",
    category: "3D Animation",
    isLaunched: false,
  },
  {
    id: "5",
    title: "Storyboarding for Animation",
    description:
      "Learn to create compelling storyboards that bring your animation ideas to life.",
    instructor: "Lisa Thompson",
    duration: "4 weeks",
    level: "Beginner",
    price: 199,
    rating: 4.6,
    students: 980,
    thumbnail: "/storyboard-animation.png",
    category: "Pre-Production",
    isLaunched: false,
  },
  {
    id: "6",
    title: "VFX Compositing Essentials",
    description:
      "Master the art of visual effects compositing for film and television.",
    instructor: "Alex Kumar",
    duration: "8 weeks",
    level: "Advanced",
    price: 449,
    rating: 4.8,
    students: 560,
    thumbnail: "/vfx-compositing.png",
    category: "VFX",
    isLaunched: false,
  },
];

export default function CoursesPage() {
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(mockCourses.map((course) => course.category))),
  ];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  const canViewFullDetails = hasPermission("normal_user");
  const canManageCourses = hasPermission("super_user");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-200">
            Animation Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-400">
            {user.role === "visitor"
              ? "Discover our upcoming animation courses. Login to access full details and enrollment."
              : "Master the art of animation with our comprehensive course library."}
          </p>
          {!canViewFullDetails && (
            <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-500 delay-600 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 animate-pulse" />
                Login to access full course details and enrollment
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-300">
          <div className="flex-1">
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm transition-all duration-300 focus:scale-105 focus:shadow-lg"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 hover:scale-105 transition-transform duration-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48 hover:scale-105 transition-transform duration-300">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className={`overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer group hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-6 duration-700`}
              style={{ animationDelay: `${index * 100 + 500}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!course.isLaunched && (
                  <Badge className="absolute top-2 right-2 bg-primary animate-pulse hover:scale-110 transition-transform duration-300">
                    Coming Soon
                  </Badge>
                )}
                {!canViewFullDetails && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                    <Lock className="w-8 h-8 text-white animate-pulse group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="group-hover:bg-muted/20 transition-colors duration-300">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                  <Badge
                    variant={getLevelBadgeVariant(course.level)}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    {course.level}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
                  {canViewFullDetails
                    ? course.description
                    : "Login to view full course description"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                  <p>
                    Instructor:{" "}
                    {canViewFullDetails ? course.instructor : "Hidden"}
                  </p>
                </div>

                {canViewFullDetails && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-300">
                      <Star className="w-4 h-4 fill-current text-yellow-500 group-hover:animate-pulse" />
                      {course.rating}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {canViewFullDetails
                      ? `$${course.price}`
                      : "Login for pricing"}
                  </div>
                  <Badge
                    variant="outline"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    {course.category}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 group-hover:bg-muted/20 transition-colors duration-300">
                {canViewFullDetails ? (
                  <>
                    <Button
                      className="flex-1 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                      disabled={!course.isLaunched}
                    >
                      <BookOpen className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      {course.isLaunched ? "Enroll Now" : "Notify Me"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:scale-110 hover:rotate-12 transition-all duration-300 bg-transparent"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    className="flex-1 bg-transparent hover:scale-105 transition-all duration-300"
                    variant="outline"
                  >
                    <Lock className="w-4 h-4 mr-2 animate-pulse" />
                    Login to Enroll
                  </Button>
                )}

                {canManageCourses && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-300 bg-transparent"
                  >
                    Manage
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 animate-in fade-in-0 zoom-in-95 duration-500">
            <p className="text-muted-foreground">
              No courses found matching your criteria.
            </p>
          </div>
        )}

        {/* Coming Soon Banner */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-1000 hover:scale-[1.02] group">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
              More Courses Coming Soon!
            </h2>
            <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
              We're constantly adding new courses to help you master every
              aspect of animation.
            </p>
            <Button
              variant="outline"
              className="hover:scale-110 transition-all duration-300 hover:shadow-lg group-hover:animate-pulse bg-transparent"
            >
              Request a Course Topic
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
