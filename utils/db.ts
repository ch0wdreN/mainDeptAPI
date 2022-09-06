import {Client} from 'postgres';
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
    return await client.queryObject(
        'INSERT INTO score (NAME, SCORE) VALUES ($1, $2) RETURNING *',
        [result.name, result.score],
    );
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const getAllResult = async () => {
  try {
    const reservedResult = await client.queryObject(
      'SELECT NAME, SCORE FROM score',
    );
    return new Response(JSON.stringify(reservedResult));
  } catch (e) {
    console.error(e);
    return new Response(e);
  }
};
