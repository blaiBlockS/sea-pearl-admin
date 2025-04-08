interface TitleProps {
  children: React.ReactNode;
  ActionButton?: React.ComponentType;
}

const Title = ({ children, ActionButton }: TitleProps) => {
  return (
    <div className="text-head1 mb-6.5 flex items-center justify-between">
      {/* 타이틀 */}
      <span>{children}</span>

      {/* 우측 버튼 */}
      {ActionButton && <ActionButton />}
    </div>
  );
};

export default Title;
