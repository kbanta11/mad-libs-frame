import { createFrames } from 'frames.js/next';

export type State = {
    prompts: string[];
    values: string[];
    docId: string | null;
}

export const frames = createFrames<State>({
    basePath: '/frames',
    initialState: {
        prompts: [],
        values: [],
        docId: null
    }
});