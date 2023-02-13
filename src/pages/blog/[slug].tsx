import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import { FrontMatter } from ".";
import md from "markdown-it";

interface Props {
  frontMatter: FrontMatter;
  content: string;
}

export default function Post({ frontMatter, content }: Props) {
  return (
    <>
      <div
        className="prose mx-auto"
        dangerouslySetInnerHTML={{
          __html: md().render(content),
        }}
      ></div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("_posts");
  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(".md", ""),
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const file = fs.readFileSync(`_posts/${slug}.md`, "utf-8");
  const { data: frontMatter, content } = matter(file);
  return {
    props: {
      frontMatter,
      content,
    },
  };
};
