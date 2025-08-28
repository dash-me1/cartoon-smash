"use client"

import { useState, useEffect } from "react"
import { AuthService, type User, type UserRole } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const loggedInUser = await AuthService.login(email, password)
    setUser(loggedInUser)
    return loggedInUser
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  const hasPermission = (requiredRole: UserRole) => {
    return AuthService.hasPermission(requiredRole)
  }

  const getCurrentUser = () => {
    return user || AuthService.getVisitorUser()
  }

  return {
    user: getCurrentUser(),
    loading,
    login,
    logout,
    hasPermission,
    isLoggedIn: !!user,
  }
}
