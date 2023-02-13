import { GetStaticProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

type Post = {
  slug: string;
  frontMatter: {
    title: string;
    author: string;
    date: string;
    tag: string[];
  };
};

interface Props {
  posts: Post[];
}

export default function Blog({ posts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 mx-6">
      {posts
        .sort((a, b) => {
          if (a.frontMatter.date < b.frontMatter.date) {
            return -1;
          }
          if (a.frontMatter.date > b.frontMatter.date) {
            return 1;
          }
          return 0;
        })
        .map(({ slug, frontMatter }) => (
          <Link
            className="border border-slate-700 p-3"
            href={`/blog/${slug}`}
            key={slug}
          >
            <h2 className="text-xl font-bold">{frontMatter.title}</h2>
            <p className="text-xs">{frontMatter.date}</p>
            <p className="font-semibold">{frontMatter.author}</p>
          </Link>
        ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("_posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const file = fs.readFileSync(`_posts/${fileName}`, "utf-8");
    const { data: frontMatter } = matter(file);
    return {
      slug,
      frontMatter,
    };
  });
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};
