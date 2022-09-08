import { Client } from 'postgres';
import 'dotenv/load.ts';

export interface Result {
  name: string | null;
  score: number | null;
}

const client = new Client({
  user: Deno.env.get('DB_USER'),
  database: Deno.env.get('POSTGRES_DB'),
  hostname: Deno.env.get('DB_HOST'),
  password: Deno.env.get('DB_PASSWORD'),
  port: Deno.env.get('DB_PORT'),
  tls: {
    enabled: false,
  },
});

await client.connect();

/**
 * @param result {name: string, score: number}
 * @return if successfully return sended value;if not return error
 */
export const postResult = async (result: Required<Result>) => {
  try {
    await client.queryObject<Result>(
      'INSERT INTO score (name, score) VALUES ($1, $2)',
      [result.name, result.score],
    );
    return getAllResult();
  } catch (e) {
    console.error(e);
    return e;
  }
};

/**
 * @return if successfully return all values order by score;if not return error
 */
export const getAllResult = async () => {
  try {
    const result = await client.queryObject<Result>(
      'SELECT score.name, score.score FROM score ORDER BY score DESC ',
    );
    return result.rows;
  } catch (e) {
    console.error(e);
    return e;
  }
};
