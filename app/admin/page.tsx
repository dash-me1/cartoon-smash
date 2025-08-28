"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminOverview } from "@/components/admin/admin-overview"
import { useAuth } from "@/hooks/use-auth"

export default function AdminPage() {
  const { user, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hasPermission("super_user")) {
      router.push("/")
    }
  }, [hasPermission, router])

  if (!hasPermission("super_user")) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <AdminOverview />
        </main>
      </div>
    </div>
  )
}
