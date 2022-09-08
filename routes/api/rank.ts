import { Handlers } from '$fresh/server.ts';
import { getAllResult } from '@db';

export const handler: Handlers = {
  async GET(_req: Request) {
    return new Response(JSON.stringify(await getAllResult()), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
