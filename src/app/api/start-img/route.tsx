import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from "path";

export async function GET(req: NextRequest) {
    const imgPath = path.resolve('./public', 'mad-libs.png');
    const imgBuffer = fs.readFileSync(imgPath);
    return new NextResponse(imgBuffer, { status: 200, headers: {'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=0, no-cache' }})
}