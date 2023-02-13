import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { GetServerSideProps } from "next";

export default function App({ Component, pageProps }: AppProps) {
  const links = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
    { href: "/products", name: "Products" },
  ];
  const router = useRouter();

  return (
    <>
      <header className="mb-12">
        <ul className="flex gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "hover:underline",
                  router.pathname === link.href && "text-red-500"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <Component {...pageProps} />
    </>
  );
}
