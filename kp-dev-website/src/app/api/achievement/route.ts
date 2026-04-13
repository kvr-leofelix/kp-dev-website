import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

interface AchievementEntry {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "achievement.json");

// Helper function to bypass CORS restrictions since the admin HTML file runs locally (file://)
function buildCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: buildCorsHeaders() });
}

// Helper function to ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Helper function to read achievement entries
async function readAchievementEntries(): Promise<AchievementEntry[]> {
  await ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch {
    return [];
  }
}

// Helper function to write achievement entries
async function writeAchievementEntries(entries: AchievementEntry[]): Promise<void> {
  await ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

export async function GET() {
  try {
    const entries = await readAchievementEntries();
    console.log("Achievement GET - returning entries:", entries);
    return NextResponse.json(entries, { headers: buildCorsHeaders() });
  } catch (err: any) {
    console.error("Achievement GET error:", err);
    return NextResponse.json({ error: "Failed to fetch achievement entries" }, { status: 500, headers: buildCorsHeaders() });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    console.log("Achievement POST - title:", title, "description:", description, "has file:", !!file);

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400, headers: buildCorsHeaders() });
    }

    let fileUrl: string | undefined;
    let fileName: string | undefined;

    if (file) {
      // Save file to public/uploads directory
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const ext = path.extname(file.name);
      const safeFileName = `${timestamp}${ext}`;
      const filePath = path.join(uploadsDir, safeFileName);
      
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);

      fileUrl = `/uploads/${safeFileName}`;
      fileName = file.name;
      console.log("File saved:", fileUrl);
    }

    // Read existing entries
    const entries = await readAchievementEntries();
    console.log("Existing entries count:", entries.length);

    // Create new entry
    const newEntry: AchievementEntry = {
      id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1,
      title,
      description,
      fileUrl,
      fileName,
      createdAt: new Date().toISOString(),
    };

    // Add to entries
    entries.push(newEntry);
    await writeAchievementEntries(entries);
    console.log("Total entries after save:", entries.length);

    return NextResponse.json({ message: "Achievement added successfully", entry: newEntry }, { headers: buildCorsHeaders() });
  } catch (err: any) {
    console.error("Achievement upload error:", err);
    return NextResponse.json({ error: "Server error: " + err.message }, { status: 500, headers: buildCorsHeaders() });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400, headers: buildCorsHeaders() });
    }

    const entries = await readAchievementEntries();
    const filteredEntries = entries.filter(e => e.id !== id);

    if (filteredEntries.length === entries.length) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404, headers: buildCorsHeaders() });
    }

    await writeAchievementEntries(filteredEntries);

    return NextResponse.json({ message: "Achievement deleted successfully" }, { headers: buildCorsHeaders() });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500, headers: buildCorsHeaders() });
  }
}
