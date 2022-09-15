import { Client } from 'postgres';
import 'dotenv/load.ts';
import {Result} from "./result.ts";

export class DB {
  client = new Client({
    user: Deno.env.get('DB_USER'),
    database: Deno.env.get('POSTGRES_DB'),
    hostname: Deno.env.get('DB_HOST'),
    password: Deno.env.get('DB_PASSWORD'),
    port: Deno.env.get('DB_PORT'),
    tls: {
      enabled: false,
    },
  });

  public initialize = async () => {
    await this.client.connect();
  };

  private _disconnect = async () => {
    await this.client.end();
  }

  /**
   *
   * @return Return an array of Result type
   */
  public getAllResult = async (): Promise<Result[]> => {
    const result = await this.client.queryObject<Result>(
      'SELECT score.name, score.score FROM score ORDER BY score DESC',
    );
    return result.rows;
  };

  /**
   *
   * @param param: string
   * @return Returns an array of Result type matching the parameter name
   */
  public getResultByName = async (param: string): Promise<Result[]> => {
    const result = await this.client.queryObject<Result>(
      'SELECT score.name, score.score FROM score WHERE score.name = $1',
      [param],
    );
    return result.rows;
  };
}
