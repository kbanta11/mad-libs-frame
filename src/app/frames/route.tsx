import { Button } from "frames.js/core";
import { frames } from "./frames";
import { UrlObject } from "url";
import replaceStoryPrompts from "../helpers/replace-story-prompts";
 
const handleRequest = frames(async (ctx) => {
  const base = new URL(
    "/frames",
    process.env.NEXT_PUBLIC_HOST
      ? `https://${process.env.NEXT_PUBLIC_HOST}`
      : "http://localhost:3000"
  );

  //let state = ctx.state;
  if (ctx.pressedButton && ctx.searchParams.type) {
    const type = ctx.searchParams.type;
    const response = await fetch(`${base.toString().replace('/frames', '/api')}/generate-story?value=${type}${ctx.state.docId ? `&docId=${ctx.state.docId}` : ''}`);
    const data = (await response.json());
    console.log(`GENERATE STORY DATA: ${JSON.stringify(data)}`)
    if (data.generating) {
      ctx.state.docId = data.docId;
      return {
        image: (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>GENERATING STORY.</div>
            <div>REFRESH BELOW.</div>
            <div>(may take up to 30 seconds)</div>
          </div>
        ),
        imageOptions: {
          aspectRatio: '1:1'
        },
        state: {
          prompts: ctx.state.prompts,
          values: ctx.state.values,
          docId: ctx.state.docId
        },
        buttons: [
          <Button key='value' action="post" target={`${base}/?type=refresh`}>Refresh</Button>
        ]
      }
    }
    ctx.state.prompts = data.prompts;
  }

  if (ctx.state.prompts.length > 0) {
    if (ctx.pressedButton && ctx.searchParams.value && ctx.searchParams.value !== '' && ctx.message?.inputText && ctx.message?.inputText !== '') {
      const values = ctx.state.values;
      values.push(ctx.message?.inputText);
      ctx.state.values = values;
    }

    if (ctx.state.values.length !== ctx.state.prompts.length) {
      const prompt = ctx.state.prompts[ctx.state.values.length];
      return {
        image: (
          <div tw='flex' style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div tw='flex'>{ctx.state.values.length + 1}/{ctx.state.prompts.length}</div>
            {prompt}
          </div>
        ),
        imageOptions: {
          aspectRatio: '1:1'
        },
        state: {
          prompts: ctx.state.prompts,
          values: ctx.state.values,
          docId: ctx.state.docId
        },
        textInput: `Enter a(n) ${prompt}`,
        buttons: [
          <Button key='value' action="post" target={`${base}/?value=${prompt}`}>Enter Value</Button>
        ]
      }
    } else {
      // get replaced story
      //const filledStory =  ctx.state.story ? replaceStoryPrompts(ctx.state.story, ctx.state.prompts, ctx.state.values) : '';
      const response = await fetch(`${base.toString().replace('/frames', '/api')}/store-filled-story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: ctx.message?.requesterFid,
          docId: ctx.state.docId,
          prompts: ctx.state.prompts,
          values: ctx.state.values
        })
      });
      const key = (await response.json()).key;

      const imgUrl = `${base.toString().replace('/frames', '/api')}/generate-story-img/?key=${key}&refresh=${Date.now()}`;
      return {
        image: imgUrl,
        imageOptions: {
          aspectRatio: '1:1',
        },
        state: {
          prompts: ctx.state.prompts,
          values: ctx.state.values,
          docId: ctx.state.docId
        },
        buttons: [
          <Button key='value' action="link" target={`https://warpcast.com/~/compose?text=Check%20out%20my%20Mad%20Lib!&embeds[]=${imgUrl}`}>Share</Button>
        ]
      }
    }
  }
  
  return {
    image: `${base.toString().replace('/frames', '/api')}/start-img`,
    imageOptions: {
      aspectRatio: '1:1'
    },
    buttons: [
      <Button key='random' action="post" target={`${base}/?type=random`}>
        Random
      </Button>,
      <Button key='tech' action="post" target={`${base}/?type=tech`}>
        Sci-fi/Tech
      </Button>,
      <Button key='history' action="post" target={`${base}/?type=history`}>
        History/Culture
      </Button>,
      <Button key='life' action="post" target={`${base}/?type=life`}>
        Daily Life
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;