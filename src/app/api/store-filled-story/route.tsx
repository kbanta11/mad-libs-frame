import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";

export async function POST(req: NextRequest) {
    const body = await req.json();
    //const { fid, story } = await req.json();

    const doc = db.collection('stories').doc(body.fid.toString());
    await doc.set({
        fid: body.fid,
        story: body.story,
    });
    return NextResponse.json({ key: doc.id }, { status: 200, headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=0, no-cache' }})
}