import { Handlers } from '$fresh/server.ts';
import { postResult, Result } from '@db';

const getParams = (url: string): Result => {
  const params = (new URL(url)).searchParams;
  const name = params.get("name");
  const score = params.get("score")
  return {name, score} as Result;
}

export const handler: Handlers = {
  POST(req: Request) {
    return new Response(JSON.stringify(postResult(getParams(req.url))), {
      headers: {"Content-Type": "application/json"}
    })
  },
};
