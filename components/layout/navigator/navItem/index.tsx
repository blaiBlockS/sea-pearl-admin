"use client";

import Button from "@/components/common/button";
import { CategoryType } from "@/types/category";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  as?: keyof HTMLElementTagNameMap;
  href?: string;
  title: string;
  iconSrc?: string;
  subCategories?: CategoryType[];
} & React.HTMLAttributes<HTMLElement>;

const NavItem = ({
  title,
  href,
  iconSrc,
  subCategories,
  as = "a",
}: NavItemProps) => {
  const pathname = usePathname();
  const startsWithThisPath = (href: string) => pathname.startsWith(href);

  if (as === "a" && href) {
    const navClass = cn(
      "hover:bg-background-brand flex h-full items-center gap-3 rounded pl-3 text-body3-medium",
      startsWithThisPath(href) && "bg-background-brand",
    );

    return (
      <>
        {/* List Button */}
        <li
          key={title}
          className="items-cetner flex h-15 w-full flex-col px-4 py-[5px]"
        >
          <Link href={href} className={navClass}>
            {iconSrc && (
              <Image src={iconSrc} alt="logo" width={24} height={24} />
            )}
            {title}
          </Link>
        </li>

        {/* SubCategories */}
        {startsWithThisPath(href) && subCategories && (
          <div className="flex flex-col gap-3 py-3">
            {subCategories?.map((item) => {
              const navClass = cn(
                "mx-8 flex h-9 items-center rounded-sm px-6 hover:bg-background-teritary",
                startsWithThisPath(item.href) && "bg-background-teritary",
              );

              return (
                <Link key={item.title} href={item.href} className={navClass}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </>
    );
  }

  if (as === "button") {
    const navClass = cn(
      "hover:bg-background-brand flex flex-1 items-center gap-3 rounded pl-3 text-body3-medium cursor-pointer",
      !href && "bg-none",
    );

    const handleLogout = () => {
      // 쿠키삭제 & redirectTo "/"
    };

    return (
      <li key={title} className="items-cetner flex h-15 w-full px-4 py-[5px]">
        <Button variant="unstyled" onClick={handleLogout} className={navClass}>
          <Image src={iconSrc ?? ""} alt="logo" width={24} height={24} />
          {title}
        </Button>
      </li>
    );
  }
};

export default NavItem;
