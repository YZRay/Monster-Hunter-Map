"use client";
import Image from "next/image";
import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
function PostCard(post: Post) {
  return (
    <article>
      <Link href={post.url} className="news-list-container">
        <div className="news-img-container">
          <Image
            className="news-img"
            src={post.image}
            width={500}
            height={281}
            alt={post.title}
          />
        </div>
        <div className="news-list-content">
          <h2 className="text-2xl my-5 font-medium">{post.title}</h2>
          <div
            className="[&>*]:mb-3 [&>*:last-child]:mb-0 text-lg font-medium"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </div>
      </Link>
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
        <h1 className="text-4xl font-bold text-slate-800 text-center">
          最新消息
        </h1>
        {allPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </main>
  );
}
