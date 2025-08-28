export type UserRole = "super_user" | "normal_user" | "visitor"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

// Mock user data for development
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@animationlms.com",
    name: "Super Admin",
    role: "super_user",
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "student@example.com",
    name: "John Student",
    role: "normal_user",
    createdAt: new Date(),
  },
]

export class AuthService {
  private static currentUser: User | null = null

  static async login(email: string, password: string): Promise<User | null> {
    // Mock authentication - in production, this would validate against a real database
    const user = mockUsers.find((u) => u.email === email)
    if (user && password === "password123") {
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
      return user
    }
    return null
  }

  static logout(): void {
    this.currentUser = null
    localStorage.removeItem("currentUser")
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }
    return null
  }

  static getVisitorUser(): User {
    return {
      id: "visitor",
      email: "",
      name: "Visitor",
      role: "visitor",
      createdAt: new Date(),
    }
  }

  static hasPermission(requiredRole: UserRole): boolean {
    const user = this.getCurrentUser() || this.getVisitorUser()

    if (requiredRole === "visitor") return true
    if (requiredRole === "normal_user") return user.role === "normal_user" || user.role === "super_user"
    if (requiredRole === "super_user") return user.role === "super_user"

    return false
  }
}
