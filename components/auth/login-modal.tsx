"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        toast(`Login successful`, {
          description: `Welcome back, ${user.name}!`,
          richColors: true,
          type: "success",
        });
        onOpenChange(false);
        setEmail("");
        setPassword("");
        // Show a toast after closing the modal as well
        setTimeout(() => {
          toast("You are now logged in!", {
            description: `Enjoy using Animation LMS, ${user.name}!`,
            duration: 3000,
            richColors: true,
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, 400);
      } else {
        toast("Login failed", {
          description: "Invalid email or password",
          richColors: true,
          type: "error",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
        richColors: true,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  function handleLogoutWithToast(logoutFn: () => void) {
    toast("Logged out", {
      description: "You have been logged out. Refreshing...",
      duration: 3000,
      richColors: true,
      type: "success",
    });
    logoutFn();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-250">
        <DialogHeader className="animate-in slide-in-from-top-2 duration-250 delay-100">
          <DialogTitle className="text-center">
            Login to Animation LMS
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 animate-in slide-in-from-left-2 duration-250 delay-200">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="transition-all duration-300 focus:scale-105"
              required
            />
          </div>
          <div className="space-y-2 animate-in slide-in-from-right-2 duration-250 delay-300">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="transition-all duration-300 focus:scale-105"
              required
            />
          </div>
          <div className="text-sm text-muted-foreground animate-in fade-in-0 duration-250 delay-400">
            {/* <p>Demo credentials:</p>
            <p>Admin: admin@animationlms.com / password123</p>
            <p>Student: student@example.com / password123</p> */}
          </div>
          <Button
            type="submit"
            className="w-full animate-in slide-in-from-bottom-2 duration-250 delay-100 hover:scale-105 transition-all"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  style={{ animationDuration: "0.5s" }}
                />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
