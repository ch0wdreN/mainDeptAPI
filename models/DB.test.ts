import { assertEquals } from 'testing/asserts.ts';
import { DB } from '@db';

const db = new DB;
await db.initialize()

Deno.test('Database', async (t) => {
  await t.step('get result by name', async () => {
    const result = await db.getResultByName("test");
    assertEquals(result, [{name: "test", score: 100}]);
  });
});
