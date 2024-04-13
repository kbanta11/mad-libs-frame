import generateStory from "@/app/helpers/generate-story";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";

export async function GET(req: NextRequest) {
    const value = req.nextUrl.searchParams.get('value');
    const docId = req.nextUrl.searchParams.get('docId');

    if(docId) {
        const storyDocRef = db.collection('stories').doc(docId);
        console.log(`doc ref create`);
        const storyDoc = await storyDocRef.get();
        console.log(`story doc retrieved`);
        const data = storyDoc.data();
        console.log(`story doc data: ${data}`)
        if (data && data?.story && data?.prompts) {
            const story = data?.story;
            const prompts = data?.prompts;
            return NextResponse.json({ story: story, prompts: prompts, docId: storyDocRef.id }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
        } else {
            return NextResponse.json({ generating: true, docId: storyDocRef.id }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
        }
    } else {    
        const docRef = db.collection('stories').doc();
        saveStory(value ?? 'random', docRef.id);
        return NextResponse.json({ generating: true, docId: docRef.id }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
    }
}

const saveStory = async (topic: string, docId: string) => {
    const { story, prompts } = await generateStory(topic);
    console.log(`create doc: ${docId}`)
    const docRef = db.collection('stories').doc(docId);
    await docRef.set({
        story: story,
        prompts: prompts,
        created_at: Date.now()
    });
}