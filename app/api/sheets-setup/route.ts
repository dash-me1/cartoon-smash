import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("notifications");
    const notifications = await collection.find({}).toArray();
    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    let errorMsg = "";
    if (typeof error === "object" && error && "message" in error) {
      errorMsg = (error as any).message;
    } else {
      errorMsg = String(error);
    }
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Accepts either a single object or an array
    const notifications = Array.isArray(body) ? body : [body];

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("notifications");

    // Insert notifications into MongoDB
    if (notifications.length > 0) {
      await collection.insertMany(notifications);
    }

    return NextResponse.json({
      success: true,
      inserted: notifications.length,
    });
  } catch (error) {
    console.error("Error storing notifications in MongoDB:", error);
    let errorMsg = "";
    if (typeof error === "object" && error && "message" in error) {
      errorMsg = (error as any).message;
    } else {
      errorMsg = String(error);
    }
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
