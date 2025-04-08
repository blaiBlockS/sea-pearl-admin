import Image from "next/image";
import NavItem from "./navItem";
import Button from "../../common/button";
import { CategoryType } from "@/types/category";

const navigatorConfig: CategoryType[] = [
  {
    title: "메인",
    href: "/dashboard/main",
    iconSrc: "/icons/dash.svg",
  },
  {
    title: "회원",
    href: "/dashboard/user",
    iconSrc: "/icons/user-white.svg",
  },
  {
    title: "컨텐츠",
    href: "/dashboard/content",
    iconSrc: "/icons/contents.svg",
    subCategories: [
      {
        title: "Free Box",
        href: "/dashboard/content/freebox",
      },
      {
        title: "Roulette",
        href: "/dashboard/content/roulette",
      },
      {
        title: "Shell Raffle",
        href: "/dashboard/content/shell-draw",
      },
      {
        title: "Pearl Raffle",
        href: "/dashboard/content/pearl-draw",
      },
    ],
  },
  {
    title: "퀘스트",
    href: "/dashboard/quest",
    iconSrc: "/icons/quest.svg",
  },
  {
    title: "수익 및 지출",
    href: "/dashboard/finance",
    iconSrc: "/icons/money.svg",
  },
];

const Navigator = () => {
  return (
    <nav className="bg-background-secondary fixed z-50 flex min-h-screen w-[268px] flex-col justify-between">
      <section>
        {/* 로고 영역 */}
        <Button className="flex h-16 w-full items-center gap-3 pl-6">
          <Image
            src={"/images/sea-pearl-logo.png"}
            alt="logo"
            width={36}
            height={36}
          />
          <span className="text-body1-bold">Sea Pearl</span>
        </Button>

        {/* 메뉴 영역 */}
        <ul className="mt-2">
          {navigatorConfig.map(({ title, href, iconSrc, subCategories }) => (
            <NavItem
              key={title}
              title={title}
              href={href}
              iconSrc={iconSrc}
              subCategories={subCategories}
            />
          ))}
        </ul>
      </section>

      {/* 하단 로그아웃 버튼 */}
      <section className="mb-11">
        <NavItem title={"로그아웃"} iconSrc={"/icons/logout.svg"} as="button" />
      </section>
    </nav>
  );
};

export default Navigator;
