"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Eye, Users } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  category: string
  isLaunched: boolean
  enrolledStudents: number
  createdAt: Date
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "2D Character Animation Fundamentals",
    description: "Learn the basics of 2D character animation using industry-standard techniques and software.",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    price: 299,
    category: "2D Animation",
    isLaunched: false,
    enrolledStudents: 1250,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    title: "3D Modeling for Animation",
    description: "Master 3D modeling techniques specifically designed for animation workflows.",
    instructor: "Mike Chen",
    duration: "10 weeks",
    level: "Intermediate",
    price: 399,
    category: "3D Animation",
    isLaunched: false,
    enrolledStudents: 890,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    title: "Motion Graphics Mastery",
    description: "Create stunning motion graphics for commercials, films, and digital media.",
    instructor: "Emma Rodriguez",
    duration: "6 weeks",
    level: "Intermediate",
    price: 349,
    category: "Motion Graphics",
    isLaunched: false,
    enrolledStudents: 675,
    createdAt: new Date("2024-01-14"),
  },
]

export function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const { toast } = useToast()

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Beginner":
        return "secondary"
      case "Intermediate":
        return "default"
      case "Advanced":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
    toast({
      title: "Course deleted",
      description: "The course has been successfully removed.",
    })
  }

  const handleToggleLaunch = (courseId: string) => {
    setCourses(
      courses.map((course) => (course.id === courseId ? { ...course, isLaunched: !course.isLaunched } : course)),
    )
    const course = courses.find((c) => c.id === courseId)
    toast({
      title: course?.isLaunched ? "Course unlaunched" : "Course launched",
      description: course?.isLaunched ? "The course is now in draft mode." : "The course is now live for students!",
    })
  }

  const handleAddCourse = (courseData: Omit<Course, "id" | "enrolledStudents" | "createdAt">) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      enrolledStudents: 0,
      createdAt: new Date(),
    }
    setCourses([...courses, newCourse])
    setIsAddCourseOpen(false)
    toast({
      title: "Course created",
      description: "New course has been successfully added.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Course Management</h1>
        <p className="text-muted-foreground">Manage all courses in your LMS platform.</p>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <AddCourseForm onSubmit={handleAddCourse} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Courses ({filteredCourses.length})</CardTitle>
          <CardDescription>All courses in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(course.level)}>{course.level}</Badge>
                  </TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrolledStudents}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.isLaunched ? "default" : "secondary"}>
                      {course.isLaunched ? "Live" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleToggleLaunch(course.id)}>
                        {course.isLaunched ? "Unpublish" : "Launch"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function AddCourseForm({
  onSubmit,
}: { onSubmit: (data: Omit<Course, "id" | "enrolledStudents" | "createdAt">) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: "Beginner" as Course["level"],
    price: 0,
    category: "",
    isLaunched: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      instructor: "",
      duration: "",
      level: "Beginner",
      price: 0,
      category: "",
      isLaunched: false,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 8 weeks"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select
            value={formData.level}
            onValueChange={(value: Course["level"]) => setFormData({ ...formData, level: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., 2D Animation"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Create Course
      </Button>
    </form>
  )
}
