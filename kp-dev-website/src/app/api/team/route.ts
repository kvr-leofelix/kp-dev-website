import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

function buildCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: buildCorsHeaders() });
}

const TEAM_DIR = path.join(process.cwd(), "public", "photo-team");
const TEAM_JSON = path.join(process.cwd(), "public", "team-data.json");

function ensureTeamFile() {
  if (!fs.existsSync(TEAM_DIR)) {
    fs.mkdirSync(TEAM_DIR, { recursive: true });
  }
  if (!fs.existsSync(TEAM_JSON)) {
    fs.writeFileSync(TEAM_JSON, JSON.stringify([]));
  }
}

// GET - return all team members
export async function GET() {
  ensureTeamFile();
  const data = JSON.parse(fs.readFileSync(TEAM_JSON, "utf-8"));
  return NextResponse.json(data, { headers: buildCorsHeaders() });
}

// POST - add a new team member (FormData with photo, name, year)
export async function POST(req: NextRequest) {
  try {
    ensureTeamFile();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const year = formData.get("year") as string;
    const photo = formData.get("photo") as File;

    if (!name || !year || !photo) {
      return NextResponse.json(
        { error: "Missing fields: name, year, photo are all required." },
        { status: 400, headers: buildCorsHeaders() }
      );
    }

    // Generate a safe filename
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const ext = photo.name.split(".").pop() || "jpg";
    const filename = `${safeName}_${Date.now()}.${ext}`;
    const filePath = path.join(TEAM_DIR, filename);

    // Write photo to disk
    const buffer = Buffer.from(await photo.arrayBuffer());
    await writeFile(filePath, buffer);

    // Update JSON database
    const data = JSON.parse(fs.readFileSync(TEAM_JSON, "utf-8"));
    const newMember = {
      id: Date.now(),
      name,
      year,
      photo: `/photo-team/${filename}`,
    };
    data.push(newMember);
    fs.writeFileSync(TEAM_JSON, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { message: `Added ${name} to the team!`, member: newMember },
      { status: 200, headers: buildCorsHeaders() }
    );
  } catch (err: any) {
    console.error("Team Upload Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: buildCorsHeaders() }
    );
  }
}

// DELETE - remove a team member by id
export async function DELETE(req: NextRequest) {
  try {
    ensureTeamFile();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Missing member id." },
        { status: 400, headers: buildCorsHeaders() }
      );
    }

    const data = JSON.parse(fs.readFileSync(TEAM_JSON, "utf-8"));
    const member = data.find((m: any) => m.id === id);

    if (!member) {
      return NextResponse.json(
        { error: "Member not found." },
        { status: 404, headers: buildCorsHeaders() }
      );
    }

    // Delete photo file
    const photoPath = path.join(process.cwd(), "public", member.photo);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    // Remove from JSON
    const updated = data.filter((m: any) => m.id !== id);
    fs.writeFileSync(TEAM_JSON, JSON.stringify(updated, null, 2));

    return NextResponse.json(
      { message: `Removed ${member.name} from the team.` },
      { status: 200, headers: buildCorsHeaders() }
    );
  } catch (err: any) {
    console.error("Team Delete Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: buildCorsHeaders() }
    );
  }
}
