import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";
import satori from "satori";
import path from "path";
import fs from 'fs';
import sharp from "sharp";
import React from "react";

export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get('key');
    let body = (
        <div tw='flex flex-column'>
            <div>Error Creating Story. Refresh Below to try again</div>
        </div>
    );
    if (key) {
        const storyDoc = await db.collection('stories').doc(key).get();
        const story = storyDoc.data()?.story.toString();
        const { title, content } = extractTitle(story);

        body = (
            <div tw='flex' style={{ width: '800px', height: '800px', padding: '8px', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{title}</div>
                <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '1.15rem'}}>
                    <div tw='flex flex-col'>{content}</div>
                </pre>
            </div>
        );
    }
    const svg = await satori(body, {
        width: 800,
        height: 800,
        fonts: [
            {
                name: "Rubik",
                data: fs.readFileSync(
                    path.resolve(process.cwd(), "src/fonts/Rubik/static", "Rubik-Regular.ttf")
                ),
                weight: 400,
                style: "normal",
            },
            {
                name: "Rubik Bold",
                data: fs.readFileSync(
                    path.resolve(process.cwd(), "src/fonts/Rubik/static", "Rubik-Bold.ttf")
                ),
                weight: 400,
                style: "normal",
            },
        ]
    })
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    return new NextResponse(png, { status: 200, headers: {'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=0, no-cache' }})
}

const extractTitle = (story: string): {title: string, content: string} => {
    const lines = story.split(`\n`);
    const title = lines[0].replace('Title: ', '');
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
}

const formatBold = (story: string) => {
    const parts = story.split('**');
    const formattedParts = parts.map((part, index) => {
        if (index % 2 === 1) {
            return <span key={index} style={{ fontWeight: 'bold' }}>{part}</span>
        } else {
            return part;
        }
    });

    return formattedParts;
}