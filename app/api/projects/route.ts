import { conn, closeClient } from "@/lib/db";
import { Project } from "@/types/project";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const db = await conn();

  try {
    if (!db) {
      return NextResponse.json({
        status: 400,
        message: ["Database connection failed."],
      });
    }

    const projects = await db
      .collection<Project>("projects")
      .aggregate([
        {
          $lookup: {
            from: "technologies",
            localField: "technologies",
            foreignField: "_id",
            as: "technologies",
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      status: 200,
      message: JSON.parse(JSON.stringify(projects)),
    });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: [e],
    });
  } finally {
    await closeClient();
  }
}
