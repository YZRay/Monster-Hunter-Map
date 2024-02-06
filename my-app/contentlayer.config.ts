import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "string", required: false },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/news/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "news",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
