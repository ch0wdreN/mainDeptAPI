import { Router, send } from "oak/mod.ts";
import { DB } from "@db";
import { Sockets } from "../controllers/Sockets.ts";

const router = new Router();
const db = new DB();
const sockets = new Sockets();
db.initialize();

router
  .get("/", async (ctx) => {
    ctx.response.body = await Deno.readTextFile(
      Deno.cwd() + "/views/index.html"
    );
  })
  .get("/static/:path+", async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: Deno.cwd(),
    });
  })
  .get("/get", async (ctx) => {
    ctx.response.body = await db.getAllResult();
  })
  .get("/get/:name", async (ctx) => {
    const name = ctx.params.name;
    ctx.response.body = await db.getResultByName(name);
  })
  .delete("/delete/:name", async (ctx) => {
    const name = ctx.params.name;
    ctx.response.body = await db.deleteResult(name);
  })
  .post("/send", async (ctx) => {
    const data = await ctx.request.body().value;
    ctx.response.body = await db.postResult(data);
  })
  .get("/ws", (ctx) => {
    if (!ctx.isUpgradable) {
      ctx.throw(501);
    }
    const socket: WebSocket = ctx.upgrade();

    socket.onopen = () => {
      sockets.onConnected(socket);
    };

    socket.onclose = () => {
      sockets.onClosed();
    };

    socket.onmessage = (e: MessageEvent) => {
      sockets.onMessage(e);
    };
  });
export default router;
