# Google Sheets Setup Guide

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "LMS Notifications" or similar
4. Add headers in the first row: `Email`, `Phone`, `Timestamp`

## Step 2: Get the Sheet ID
1. Copy the URL of your Google Sheet
2. Extract the ID from the URL format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
3. The SHEET_ID is the long string between `/d/` and `/edit`

Example:
- URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
- SHEET_ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 3: Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only

## Step 4: Make Sheet Public (Read Access)
1. Click "Share" button in your Google Sheet
2. Change access to "Anyone with the link can view"
3. This allows the API to read the sheet data

## Step 5: Update Environment Variables
1. Copy `.env.example` to `.env.local`
2. Add your GOOGLE_SHEET_ID
3. Add your GOOGLE_SHEETS_API_KEY
4. Restart your development server

## Testing
- Visit your LMS platform
- Fill out the "Notify Me" form on the homepage
- Check your Google Sheet to see if data appears
- Use the admin dashboard to view notifications
