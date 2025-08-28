"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LoginModal } from "@/components/auth/login-modal";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { user, logout, isLoggedIn } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_user":
        return "destructive";
      case "normal_user":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_user":
        return "Admin";
      case "normal_user":
        return "Student";
      default:
        return "Visitor";
    }
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary">
              AnimationLMS
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Courses
              </Link>
              {user.role === "super_user" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user.name}</span>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}
