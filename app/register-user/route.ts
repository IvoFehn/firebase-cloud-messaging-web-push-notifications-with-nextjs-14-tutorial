import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, name, fcmToken } = await request.json();

  if (!userId || !fcmToken) {
    return NextResponse.json({ success: false, error: "Missing parameters" });
  }

  // Speichere oder aktualisiere den Benutzer
  await db.collection("users").doc(userId).set({ name, fcmToken });

  return NextResponse.json({ success: true, message: "User registered" });
}
