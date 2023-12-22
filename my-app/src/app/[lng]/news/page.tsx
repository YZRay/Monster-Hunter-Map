"use client";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, Button, CardFooter, Image } from "@nextui-org/react";
import { allPosts, Post } from "contentlayer/generated";

function PostCard(post: Post) {
  const router = useRouter();

  if (!post.image) {
    post.image = "";
  }
  return (
    <article>
      <Card
        isFooterBlurred
        className="w-full h-[360px] col-span-12 sm:col-span-5 group"
      >
        <CardHeader className="absolute z-10 top-0 flex-col items-start backdrop-blur-sm bg-white/30 ">
          <p className="text-tiny text-slate-900 uppercase font-bold">New</p>
          <h4 className="text-slate-900 font-bold text-2xl">{post.title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full object-center object-cover group-hover:scale-110"
          src={post.image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-slate-900 text-tiny">Available soon.</p>
            <p className="text-slate-900 text-tiny">Get notified.</p>
          </div>
          <Button
            className="text-base px-4 py-2 rounded-full bg-slate-300 dark:bg-slate-600"
            color="primary"
            radius="full"
            size="sm"
            onClick={() => router.push(post.url)}
          >
            查看更多
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
const { compareDesc } = require("date-fns");
export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main>
      <div className="container">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-300 text-center">
          最新消息
        </h1>
        <div className="grid grid-cols-12 gap-4 my-4 md:my-8">
          <div className="col-span-9 flex flex-col gap-6">
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
          <div className="col-span-3">sidebar</div>
        </div>
      </div>
    </main>
  );
}
