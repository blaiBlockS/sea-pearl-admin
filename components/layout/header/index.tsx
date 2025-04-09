const Header = () => {
  return (
    <section className="bg-background-secondary fixed left-0 z-40 flex h-16 w-full flex-1 items-center justify-end">
      {/* 뒤로 가기 */}

      <div className="mr-10 flex gap-2">
        {/* ROLE */}
        <span className="text-body3-bold text-text-teritary">관리자</span>

        {/* 이메일 TODO: 실제 값 */}
        <span className="text-body3-semibold text-text-primary">
          sample123@gmail.com
        </span>
      </div>
    </section>
  );
};

export default Header;
