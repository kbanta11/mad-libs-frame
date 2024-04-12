import generateStory from "@/app/helpers/generate-story";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const value = req.nextUrl.searchParams.get('value');
    const { story, prompts } = await generateStory(value ?? 'random');
    return NextResponse.json({ story: story, prompts: prompts }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
}