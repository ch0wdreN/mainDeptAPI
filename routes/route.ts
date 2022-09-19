import { Router, send } from 'oak/mod.ts';
import { DB } from '@db';

const router = new Router();
const db = new DB();
db.initialize();

router
  .get('/', async (ctx) => {
    ctx.response.body = await Deno.readTextFile(
      Deno.cwd() + '/views/index.html',
    );
  })
  .get('/static/:path+', async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: Deno.cwd(),
    });
  })
  .get('/get', async (ctx) => {
    ctx.response.body = await db.getAllResult();
  })
  .get('/get/:name', async (ctx) => {
    const name = ctx.params.name;
    ctx.response.body = await db.getResultByName(name);
  })
  .post('/send', async (ctx) => {
    const data = await ctx.request.body().value;
    ctx.response.body = await db.postResult(data);
  });
export default router;
