import "server-only";

import { DateTime } from "luxon";

import { mongo } from "@/lib/mongo";
import { type Experience } from "@/lib/objects";

function calculateTenure(start: string, end?: string): string {
  const startTrimmed = start.trim();
  if (!startTrimmed) return "";

  const startDate = DateTime.fromFormat(startTrimmed, "yyyy-MM", {
    locale: "en",
    zone: "utc",
  });

  if (!startDate.isValid) return "";

  let endDate: DateTime;
  if (!end || end.trim().toLowerCase() === "present") {
    endDate = DateTime.utc();
  } else {
    endDate = DateTime.fromFormat(end.trim(), "yyyy-MM", {
      locale: "en",
      zone: "utc",
    });
  }

  if (!endDate.isValid) return "";

  const years = endDate.year - startDate.year;
  const months = endDate.month - startDate.month;
  const totalMonths = Math.max(years * 12 + months + 1, 1);

  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;

  let tenure = "";
  if (yrs > 0) {
    if (mos > 0) {
      tenure = `${yrs} yr ${mos} mos`;
    } else {
      tenure = `${yrs} yr`;
    }
  } else {
    if (totalMonths === 1) {
      tenure = "1 month";
    } else {
      tenure = `${totalMonths} mos`;
    }
  }

  return tenure;
}

export async function GetExperiences(): Promise<Experience[]> {
  const collection = mongo.experience();

  const data = await collection
    .find({}, { projection: { updatedAt: 0 } })
    .sort({ start: -1 })
    .toArray();

  return data.map((experience) => ({
    ...experience,
    _id: experience._id.toString(),
    tenure:
      experience.tenure || calculateTenure(experience.start, experience.end),
    positions: experience.positions.map((position) => ({
      ...position,
      projects: position.projects?.map((project) => ({
        ...project,
        _id: project._id.toString(),
      })),
    })),
    technologies: experience.technologies.map((technology) => ({
      ...technology,
      _id: technology._id.toString(),
    })),
  }));
}
