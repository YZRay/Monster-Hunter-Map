import { allPosts } from "contentlayer/generated";
import Link from "next/link";
export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <div className="container grid grid-cols-12 gap-7">
      <article className="mb-8 col-span-9">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <div
          className="[&>*]:mb-3 [&>*:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
      <aside className="col-span-3">
        <div className="hidden lg:sticky lg:top-28 lg:block">
          <Link href="/news">返回最新消息</Link>
        </div>
      </aside>
    </div>
  );
};

export default PostLayout;
