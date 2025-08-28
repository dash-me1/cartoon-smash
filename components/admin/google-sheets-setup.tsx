"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { ExternalLink, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface SetupStatus {
  hasSheetId: boolean
  hasApiKey: boolean
  instructions: string
}

// All code removed as integration is no longer used.
}
