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
      .aggregate([
        {
          $facet: {
            lang: [{ $match: { category: "lang" } }],
            frontend: [{ $match: { category: "frontend" } }],
            backend: [{ $match: { category: "backend" } }],
            db: [{ $match: { category: "db" } }],
            tool: [{ $match: { category: "tool" } }],
          },
        },
        {
          $project: {
            technologies: {
              $concatArrays: ["$lang", "$frontend", "$backend", "$db", "$tool"],
            },
          },
        },
        { $unwind: "$technologies" },
        { $replaceRoot: { newRoot: "$technologies" } },
      ])
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
