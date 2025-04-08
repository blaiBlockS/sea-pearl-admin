// app/dashboard/layout.tsx
import Header from "@/components/layout/header";
import Navigator from "@/components/layout/navigator";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* 메뉴 네비게이터 */}
      <Navigator />

      {/* 페이지 콘텐츠 */}
      <section className="relative ml-[268px] flex-1">
        <Header />

        {/* 실제 메인페이지 영역 */}
        <main className="mt-16">{children}</main>
      </section>
    </div>
  );
}
