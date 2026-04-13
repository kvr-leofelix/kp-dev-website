import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
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

const EVENT_DIR = path.join(process.cwd(), "public", "our-event");
const EVENT_JSON = path.join(process.cwd(), "public", "our-event-data.json");

function ensureEventStore() {
  if (!fs.existsSync(EVENT_DIR)) {
    fs.mkdirSync(EVENT_DIR, { recursive: true });
  }

  if (!fs.existsSync(EVENT_JSON)) {
    fs.writeFileSync(EVENT_JSON, JSON.stringify([], null, 2));
  }
}

function readEvents() {
  ensureEventStore();
  return JSON.parse(fs.readFileSync(EVENT_JSON, "utf-8"));
}

export async function GET() {
  return NextResponse.json(readEvents(), { headers: buildCorsHeaders() });
}

export async function POST(req: NextRequest) {
  try {
    ensureEventStore();

    const formData = await req.formData();
    const description = (formData.get("description") as string | null)?.trim();
    const photo = formData.get("photo") as File | null;

    if (!description || !photo) {
      return NextResponse.json(
        { error: "Missing fields: photo and description are required." },
        { status: 400, headers: buildCorsHeaders() }
      );
    }

    const safePrefix = description
      .toLowerCase()
      .slice(0, 32)
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "event";
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${safePrefix}_${Date.now()}.${ext}`;
    const filePath = path.join(EVENT_DIR, filename);

    const buffer = Buffer.from(await photo.arrayBuffer());
    await writeFile(filePath, buffer);

    const events = readEvents();
    const newEvent = {
      id: Date.now(),
      description,
      photo: `/our-event/${filename}`,
      createdAt: new Date().toISOString(),
    };

    events.unshift(newEvent);
    fs.writeFileSync(EVENT_JSON, JSON.stringify(events, null, 2));

    return NextResponse.json(
      { message: "Event uploaded successfully.", event: newEvent },
      { status: 200, headers: buildCorsHeaders() }
    );
  } catch (err: any) {
    console.error("Our Event Upload Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: buildCorsHeaders() }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    ensureEventStore();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Missing event id." },
        { status: 400, headers: buildCorsHeaders() }
      );
    }

    const events = readEvents();
    const event = events.find((item: { id: number }) => item.id === id);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404, headers: buildCorsHeaders() }
      );
    }

    const relativePath = String(event.photo).replace(/^\/+/, "");
    const photoPath = path.join(process.cwd(), "public", relativePath);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    const updatedEvents = events.filter((item: { id: number }) => item.id !== id);
    fs.writeFileSync(EVENT_JSON, JSON.stringify(updatedEvents, null, 2));

    return NextResponse.json(
      { message: "Event removed successfully." },
      { status: 200, headers: buildCorsHeaders() }
    );
  } catch (err: any) {
    console.error("Our Event Delete Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: buildCorsHeaders() }
    );
  }
}
