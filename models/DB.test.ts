import { assertEquals } from 'testing/asserts.ts';
import { DB } from '@db';
import { Result } from './result.ts';

const db = new DB();
await db.initialize();

Deno.test('Database', async (t) => {
  await t.step('post result', async () => {
    const data: Result = { name: 'testUser', score: 100 };
    await db.postResult(data);
    const result = await db.getResultByName('testUser');
    assertEquals(result, [data]);
  });  
  await t.step('get result by name', async () => {
    const result = await db.getResultByName('testUser');
    assertEquals(result, [{ name: 'testUser', score: 100 }]);
  });
  await t.step('delete result', async () => {
    await db.deleteResult('testUser');
    const result = await db.getResultByName('testUser');
    assertEquals(result, []);
  });
});
