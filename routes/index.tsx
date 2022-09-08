/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { Handlers, PageProps } from '$fresh/src/server/types.ts';
import { getAllResult, Result } from '@db';

export const handler: Handlers = {
  async GET(_, ctx) {
    const res = await getAllResult();
    return ctx.render(res);
  },
};

export default function Home({ data }: PageProps<Result[]>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      {data.map((value) => {
        return (
          <div>
            <p>{value.name}</p>
            <p>{value.score}</p>
          </div>
        );
      })}
    </div>
  );
}
