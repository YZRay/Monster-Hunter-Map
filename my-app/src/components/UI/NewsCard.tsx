"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, Button, CardFooter, Image } from "@nextui-org/react";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Post } from "contentlayer/generated";

const NewsCard = (post: Post) => {
  const router = useRouter();

  if (!post.image) {
    post.image = "";
  }
  const Component = useMDXComponent(post.body.code);

  return (
    <article>
      <Card isFooterBlurred className="w-full h-[400px] relative z-0 group">
        <CardHeader className="absolute z-[1] top-0 flex-col items-start backdrop-blur-sm bg-white/30 ">
          <p className="text-tiny text-slate-900 uppercase font-bold">New</p>
          <h4 className="text-slate-900 font-bold text-lg md:text-xl xl:text-2xl">
            {post.title}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt={post.title}
          className="z-0 w-full h-full object-center object-cover group-hover:scale-110"
          src={post.image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-[1] justify-between">
          <div>
            {post.tags?.map((tag, index) => (
              <p key={index} className="text-slate-900 text-tiny">
                {tag}
              </p>
            ))}
          </div>
          <Button
            color="default"
            radius="full"
            size="md"
            onClick={() => router.push(post.url)}
          >
            查看更多
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default NewsCard;
