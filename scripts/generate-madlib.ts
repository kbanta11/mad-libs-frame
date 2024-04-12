import replaceStoryPrompts from "../src/app/helpers/replace-story-prompts";
import generateStory from "../src/app/helpers/generate-story";
import OpenAI from "openai";
import * as readline from 'readline/promises';
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const main = async (topic: string) => {
    const { story, prompts } = await generateStory(topic);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    let filledStory;
    if(story) {
        let values: string[] = [];
        for(const p of prompts) {
            const value = await rl.question(`${p}: `)
            values.push(value)
        }
        rl.close();
        filledStory = replaceStoryPrompts(story, prompts, values);
    }
}

main('crypto');