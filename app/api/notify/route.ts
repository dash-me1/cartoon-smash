import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, timestamp } = body;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("notifications");
    const doc = { email, phone, timestamp, source: "Website" };
    await collection.insertOne(doc);
    console.log("✅ Successfully stored notification signup in MongoDB:", doc);
    return NextResponse.json({
      success: true,
      message: "Successfully added to notification list",
    });
  } catch (error) {
    console.error("❌ Error processing notification signup:", error);
    let errorMsg = "";
    if (typeof error === "object" && error && "message" in error) {
      errorMsg = (error as any).message;
    } else {
      errorMsg = String(error);
    }
    return NextResponse.json(
      {
        success: false,
        message: errorMsg,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("notifications");
    const notifications = await collection.find({}).toArray();
    return NextResponse.json({
      success: true,
      data: notifications,
      count: notifications.length,
    });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    let errorMsg = "";
    if (typeof error === "object" && error && "message" in error) {
      errorMsg = (error as any).message;
    } else {
      errorMsg = String(error);
    }
    return NextResponse.json(
      {
        success: false,
        message: errorMsg,
      },
      { status: 500 }
    );
  }
}
