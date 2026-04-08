import { NextRequest, NextResponse } from "next/server";
import { writeFile, rm, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400, headers: buildCorsHeaders() });
    }

    const publicSequenceDir = path.join(process.cwd(), "public", "sequence");

    // Ensure directory exists
    if (!fs.existsSync(publicSequenceDir)) {
      await mkdir(publicSequenceDir, { recursive: true });
    }

    // Sort files to ensure numerical/alphabetical sequence if they came from a directory upload
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    // Empty current directory before writing new frames
    const existingOldFiles = fs.readdirSync(publicSequenceDir);
    for (const file of existingOldFiles) {
      // Clean up previous image frames so old images don't leak
      if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.webp')) {
         await rm(path.join(publicSequenceDir, file), { force: true });
      }
    }

    // Write all uploaded files as frame_0.jpg, frame_1.jpg ...
    let i = 0;
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // We save them strictly as .jpg because the existing ScrollCanvasRenderer expects /sequence/frame_${i}.jpg
      const filePath = path.join(publicSequenceDir, `frame_${i}.jpg`);
      await writeFile(filePath, buffer);
      i++;
    }

    return NextResponse.json(
      { message: `Successfully updated scroll animation with ${files.length} new frames.` }, 
      { status: 200, headers: buildCorsHeaders() }
    );

  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json(
      { error: "Server error handling uploads: " + err.message }, 
      { status: 500, headers: buildCorsHeaders() }
    );
  }
}
