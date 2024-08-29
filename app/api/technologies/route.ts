import { NextResponse } from "next/server";

import { conn } from "@/lib/db";
import { Technology } from "@/types/project";

export async function GET(): Promise<NextResponse> {
  const client = await conn();

  try {
    if (!client) {
      return NextResponse.json({
        status: 400,
        message: ["Database connection failed."],
      });
    }

    const technologies = await client
      .db(process.env.DB_NAME as string)
      .collection<Technology>("technologies")
      .find({ category: { $ne: "no" } })
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json({
      status: 200,
      message: JSON.parse(JSON.stringify(technologies)),
    });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: ["Some error occurred."],
    });
  } finally {
    await client.close();
  }
}
