const replaceStoryPrompts = (story: string, prompts: string[], values: string[]) => {
    let filledStory = story;
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\[\\[${prompt}\\]\\]`);
        filledStory = filledStory.replace(regex, `**${values[i]}**`);
    }
    return filledStory;
} 

export default replaceStoryPrompts;