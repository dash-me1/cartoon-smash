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
import { toast } from "sonner";

interface NotifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotifyModal({ open, onOpenChange }: NotifyModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        onOpenChange(false);
        setEmail("");
        setPhone("");
        setTimeout(() => {
          toast("You're on the list!", {
            description:
              "Thank you for your interest! You'll be among the first to know when we launch.",
            duration: 3500,
            position: "bottom-right",
            richColors: true,
            type: "success",
          });
        }, 400);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader className="animate-in slide-in-from-top-2 duration-300 delay-100">
          <DialogTitle className="text-center">
            Get Notified When We Launch!
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground mb-4 text-center animate-in fade-in-0 duration-300 delay-200">
          Be the first to know when our animation courses go live. We'll send
          you exclusive early access!
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 animate-in slide-in-from-left-2 duration-300 delay-300">
            <Label htmlFor="notify-email">Email Address</Label>
            <Input
              id="notify-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="transition-all duration-300 focus:scale-105"
              required
            />
          </div>
          <div className="space-y-2 animate-in slide-in-from-right-2 duration-300 delay-400">
            <Label htmlFor="notify-phone">Phone Number (Optional)</Label>
            <Input
              id="notify-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
          <Button
            type="submit"
            className="w-full animate-in slide-in-from-bottom-2 duration-150 delay-100 hover:scale-110 transition-all"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  style={{ animationDuration: "0.6s" }}
                />
                Submitting...
              </div>
            ) : (
              "Notify Me!"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
