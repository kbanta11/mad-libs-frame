import { createFrames } from 'frames.js/next';

export type State = {
    story: string | null;
    prompts: string[];
    values: string[];
}

export const frames = createFrames<State>({
    basePath: '/frames',
    initialState: {
        story: null,
        prompts: [],
        values: []
    }
});