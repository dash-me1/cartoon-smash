// Google Sheets Setup Script
// Run this script to create the initial Google Sheet structure

console.log("🚀 Setting up Google Sheets for Animation LMS")

const setupInstructions = `
📊 Google Sheets Integration Setup Guide

1. CREATE GOOGLE SHEET:
   - Go to https://sheets.google.com
   - Create a new spreadsheet
   - Name it "Animation LMS - Notification Signups"
   - Add headers in row 1: Email | Phone | Timestamp | Source

2. GET SHEET ID:
   - Copy the sheet ID from the URL
   - Example: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   - The SHEET_ID is the long string between /d/ and /edit

3. SETUP GOOGLE CLOUD PROJECT:
   - Go to https://console.cloud.google.com
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create credentials (API Key)

4. ADD ENVIRONMENT VARIABLES:
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add: GOOGLE_SHEET_ID = your_sheet_id
   - Add: GOOGLE_SHEETS_API_KEY = your_api_key

5. SHARE SHEET:
   - Share your Google Sheet with "Anyone with the link can edit"
   - Or share with your service account email

6. TEST CONNECTION:
   - Go to Admin > Settings in your LMS
   - Click "Test Connection" to verify setup

✅ Once setup is complete, all notification signups will be automatically stored in your Google Sheet!
`

console.log(setupInstructions)

// Sample data structure for the Google Sheet
const sampleData = [
  ["Email", "Phone", "Timestamp", "Source"],
  ["john.doe@example.com", "+1 (555) 123-4567", new Date().toISOString(), "Home Page"],
  ["sarah.smith@example.com", "", new Date().toISOString(), "Courses Page"],
]

console.log("\n📋 Sample data structure:")
console.table(sampleData)

console.log("\n🔧 Your Google Sheet should have this exact column structure for the integration to work properly.")
