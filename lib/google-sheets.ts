// Google Sheets integration for storing notification signups
// This uses the Google Sheets API v4 to append data to a spreadsheet

interface NotificationData {
  email: string;
  phone?: string;
  timestamp: string;
  source?: string;
}

export class GoogleSheetsService {
  private static readonly SHEET_ID = process.env.GOOGLE_SHEET_ID;
  private static readonly API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
  private static readonly RANGE = "Sheet1!A:D"; // Columns: Email, Phone, Timestamp, Source

  static async appendNotification(data: NotificationData): Promise<boolean> {
    try {
      // In a real implementation, you would use Google Sheets API
      // For now, we'll simulate the API call and log the data

      console.log("📊 Google Sheets Integration - New Signup:", {
        spreadsheetId: this.SHEET_ID,
        range: this.RANGE,
        data: [
          data.email,
          data.phone || "",
          data.timestamp,
          data.source || "Website",
        ],
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In production, this would be:
      /*
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.RANGE}:append?valueInputOption=RAW&key=${this.API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[
              data.email,
              data.phone || "",
              data.timestamp,
              data.source || "Website"
            ]]
          })
        }
      )
      
      return response.ok
      */

      return true;
    } catch (error) {
      console.error("Google Sheets API Error:", error);
      return false;
    }
  }

  static async getNotifications(): Promise<NotificationData[]> {
    try {
      // In production, this would fetch from Google Sheets API
      console.log(
        "📊 Google Sheets Integration - Fetching data from:",
        this.SHEET_ID
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Mock data for development - in production, this would come from Google Sheets
      const mockData: NotificationData[] = [
        {
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          timestamp: new Date().toISOString(),
          source: "Home Page",
        },
        {
          email: "sarah.smith@example.com",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          source: "Courses Page",
        },
      ];

      return mockData;
    } catch (error) {
      console.error("Google Sheets fetch error:", error);
      return [];
    }
  }

  static getSetupInstructions(): string {
    return `
    Google Sheets Integration Setup:
    
    1. Create a Google Sheet for storing notification signups
    2. Get your Google Sheets API key from Google Cloud Console
    3. Add these environment variables to your Vercel project:
       - GOOGLE_SHEET_ID=your_sheet_id_here
       - GOOGLE_SHEETS_API_KEY=your_api_key_here
    
    4. Share your Google Sheet with the service account email
    5. The sheet should have columns: Email, Phone, Timestamp, Source
    
    Current Status: Using mock data for development
    `;
  }
}
