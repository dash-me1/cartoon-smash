"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { GoogleSheetsSetup } from "@/components/admin/google-sheets-setup"
import { useAuth } from "@/hooks/use-auth"

export default function AdminSettingsPage() {
  const { hasPermission } = useAuth()
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Configure integrations and system settings.</p>
            </div>
            <GoogleSheetsSetup />
          </div>
        </main>
      </div>
    </div>
  )
}
