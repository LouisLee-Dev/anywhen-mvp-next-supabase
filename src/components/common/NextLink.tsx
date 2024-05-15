import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface INextLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function NextLink({
  href,
  className = "",
  children,
}: INextLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={clsx(className, { "text-primary": path.startsWith(href) })}
    >
      {children}
    </Link>
  );
}
