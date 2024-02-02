"use client";
import NewsCard from "@/components/UI/NewsCard";
import { allPosts } from "contentlayer/generated";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";

const { compareDesc } = require("date-fns");

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const startIndex = (currentPage - 1) * postsPerPage;

  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <main>
      <div className="container">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-300 text-center">
          最新消息
        </h1>
        <div className="grid grid-cols-12 gap-7 my-4 md:my-8">
          <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
            {displayedPosts.map((post, idx) => (
              <NewsCard key={idx} {...post} />
            ))}
            <Pagination
              className="mx-auto text-white"
              color="primary"
              isCompact
              showControls
              total={totalPages}
              boundaries={2}
              size="lg"
              initialPage={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
          <aside className="col-span-3">
            <div className="hidden lg:sticky lg:top-28 lg:block">SIDE BAR</div>
          </aside>
        </div>
      </div>
    </main>
  );
}
