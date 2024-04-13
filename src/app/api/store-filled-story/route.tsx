import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";
import replaceStoryPrompts from "../../helpers/replace-story-prompts";

export async function POST(req: NextRequest) {
    const body = await req.json();
    //const { fid, story } = await req.json();

    const doc = db.collection('stories').doc(body.docId);
    const data = (await doc.get()).data()
    const story = data?.story;
    if (!data?.filledStory) {
        const filledStory = replaceStoryPrompts(story, body.prompts, body.values)

        await doc.set({
            fid: body.fid,
            filledStory: filledStory,
        });
    }
    return NextResponse.json({ key: body.docId }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
}