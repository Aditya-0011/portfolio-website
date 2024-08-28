import { conn, closeClient } from "@/lib/db";
import { Project } from "@/types/project";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const db = await conn();

  try {
    if (!db) {
      return NextResponse.json({
        status: 400,
        message: ["Database connection failed."],
      });
    }

    const url = new URL(req.url);

    const featured = url.searchParams.get("featured") === "true";

    const pipeline: any = [
      {
        $lookup: {
          from: "technologies",
          localField: "technologies",
          foreignField: "_id",
          as: "technologies",
        },
      },
    ];

    if (featured) {
      pipeline.unshift({ $match: { featured: true } });
    }

    const projects = await db
      .collection<Project>("projects")
      .aggregate(pipeline)
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
