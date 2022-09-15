import { Application } from 'oak/mod.ts';
import router from './routes/route.ts';

const app = new Application();

app.use(router.routes());
await app.listen({ port: 8000 });
