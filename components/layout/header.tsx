"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LoginModal } from "@/components/auth/login-modal";
import { Badge } from "@/components/ui/badge";

function handleLogoutWithToast(logoutFn: () => void) {
  if (typeof window !== "undefined") {
    // Only show toast in browser
    // Use Sonner toast if available
    // @ts-ignore
    if (window.toast) {
      window.toast("Logged out", {
        description: "You have been logged out. Refreshing...",
        duration: 2000,
      });
    }
  }
  logoutFn();
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

export function Header() {
  const { user, logout, isLoggedIn } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* Hamburger menu for mobile at top level */}
          <div className="flex items-center md:space-x-8 w-full">
            <div className="flex md:hidden mr-2">
              <button
                aria-label="Open menu"
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/60 bg-black/40 hover:bg-black/60 transition-colors"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-7 h-7 text-white" />
              </button>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-purple-500 bg-black overflow-hidden">
                <img
                  src="/cartoon-smash-logo-v2.png"
                  alt="Cartoon Smash Logo"
                  className="w-full h-full object-contain object-center"
                />
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-8">
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
          {/* Desktop login/logout */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user.name}</span>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLogoutWithToast(logout)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
            )}
          </div>
        </div>
      </header>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="relative bg-background w-72 max-w-full h-full shadow-xl z-50 animate-in slide-in-from-left-2 duration-300 flex flex-col">
            <button
              className="absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary border border-border bg-background cursor-pointer"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="sr-only">Close menu</span>×
            </button>
            <div className="mt-16 px-6">
              <img src="jbfje" alt="LOGO" sizes="" srcset="" />
              <nav className="flex flex-col gap-6">
                {/* Features list */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Features</h3>
                  {/* <ul className="space-y-2 text-base mb-4">
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Modern UI/UX</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Responsive Design</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Notification System</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> MongoDB Storage</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Sonner Toasts</li>
                  </ul> */}
                </div>
                {/* Nav links (copied from desktop nav) */}
                <Link
                  href="/"
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Courses
                </Link>
                {user.role === "super_user" && (
                  <Link
                    href="/admin"
                    className="text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {/* Auth buttons (copied from desktop) */}
                <div className="mt-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user.name}</span>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleLogoutWithToast(logout)}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => {
                        setLoginModalOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}
