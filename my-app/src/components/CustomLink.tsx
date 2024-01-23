"use client";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

type Props = React.ComponentPropsWithoutRef<"a">;

const CustomLink = ({ href, children, ...rest }: Props) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      className="flex items-center gap-2 py-1 text-slate-900 dark:text-slate-400 decoration-0 hover:text-slate-700 dark:hover:text-slate-200 border-b-1 border-transparent hover:border-slate-700 dark:hover:border-slate-200 transition-all duration-300 font-semibold"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {typeof children === "string" && <FaLink className="h-4 w-4" />}
      {children}
    </a>
  );
};

export default CustomLink;
