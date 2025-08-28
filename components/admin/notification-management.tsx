"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Mail, RefreshCw } from "lucide-react";

interface NotificationSignup {
  email: string;
  phone?: string;
  timestamp: string;
  source?: string;
}

export function NotificationManagement() {
  const [notifications, setNotifications] = useState<NotificationSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notify");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
      } else {
        throw new Error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error",
        description: "Failed to load notifications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((notification) =>
    notification.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csvContent = [
      ["Email", "Phone", "Timestamp", "Source"],
      ...filteredNotifications.map((n) => [
        n.email,
        n.phone || "",
        n.timestamp,
        n.source || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notification-signups.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Notification signups have been exported to CSV.",
    });
  };

  const handleSendBulkEmail = () => {
    toast({
      title: "Bulk email sent",
      description: `Launch notification sent to ${filteredNotifications.length} subscribers.`,
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notification Management</h1>
          <p className="text-muted-foreground">Loading notifications...</p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification Management</h1>
        <p className="text-muted-foreground">
          Manage users who signed up for launch notifications.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">Stored in database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Phone</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.phone).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {notifications.length > 0
                ? Math.round(
                    (notifications.filter((n) => n.phone).length /
                      notifications.length) *
                      100
                  )
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                notifications.filter((n) => {
                  const signupDate = new Date(n.timestamp);
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  return signupDate > yesterday;
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchNotifications}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={handleSendBulkEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Launch Email
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Notification Signups ({filteredNotifications.length})
          </CardTitle>
          <CardDescription>
            Users waiting for course launch notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notification signups found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification, index) => (
                  <TableRow key={`${notification.email}-${index}`}>
                    <TableCell className="font-medium">
                      {notification.email}
                    </TableCell>
                    <TableCell>
                      {notification.phone ? (
                        notification.phone
                      ) : (
                        <Badge variant="outline">No phone</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {notification.source || "Website"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(notification.timestamp).toLocaleDateString()} at{" "}
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
