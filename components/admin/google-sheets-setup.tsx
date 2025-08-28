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

export function GoogleSheetsSetup() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [testingConnection, setTestingConnection] = useState(false)
  const { toast } = useToast()

  const fetchSetupStatus = async () => {
    try {
      const response = await fetch("/api/sheets-setup")
      const data = await response.json()
      setSetupStatus(data)
    } catch (error) {
      console.error("Failed to fetch setup status:", error)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setTestingConnection(true)
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          phone: "+1 (555) 000-0000",
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Connection successful!",
          description: "Test data was successfully sent to Google Sheets.",
        })
      } else {
        throw new Error("Connection failed")
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Unable to connect to Google Sheets. Check your configuration.",
        variant: "destructive",
      })
    } finally {
      setTestingConnection(false)
    }
  }

  useEffect(() => {
    fetchSetupStatus()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  const isFullyConfigured = setupStatus?.hasSheetId && setupStatus?.hasApiKey

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Google Sheets Integration
            {isFullyConfigured ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Configured
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 mr-1" />
                Setup Required
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Store notification signups directly in Google Sheets for easy management and analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Google Sheet ID</span>
              {setupStatus?.hasSheetId ? (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Set
                </Badge>
              ) : (
                <Badge variant="outline">
                  <XCircle className="h-3 w-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">API Key</span>
              {setupStatus?.hasApiKey ? (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Set
                </Badge>
              ) : (
                <Badge variant="outline">
                  <XCircle className="h-3 w-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={fetchSetupStatus} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            {isFullyConfigured && (
              <Button onClick={testConnection} disabled={testingConnection} size="sm">
                {testingConnection ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {!isFullyConfigured && (
        <Alert>
          <AlertDescription>
            <div className="space-y-4">
              <h4 className="font-semibold">Setup Instructions:</h4>
              <div className="text-sm space-y-2">
                <p>1. Create a new Google Sheet for storing notification signups</p>
                <p>2. Add column headers: Email, Phone, Timestamp, Source</p>
                <p>3. Get your Google Sheets API key from Google Cloud Console</p>
                <p>4. Add environment variables in Vercel Project Settings:</p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  GOOGLE_SHEET_ID=your_sheet_id_here
                  <br />
                  GOOGLE_SHEETS_API_KEY=your_api_key_here
                </div>
                <p>5. Share your Google Sheet with the service account email</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="https://developers.google.com/sheets/api/quickstart" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Google Sheets API Guide
                </a>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {setupStatus?.instructions && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Setup Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto whitespace-pre-wrap">
              {setupStatus.instructions}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
