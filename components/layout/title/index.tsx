import { cn } from "@/utils/cn";

interface TitleProps {
  children: React.ReactNode;
  ActionButton?: React.ComponentType;
  fontSize?: string;
}

const Title = ({
  children,
  ActionButton,
  fontSize = "text-head1",
}: TitleProps) => {
  const titleStyle = cn(fontSize, "mb-6.5 flex items-center justify-between");

  return (
    <div className={titleStyle}>
      {/* 타이틀 */}
      <span>{children}</span>

      {/* 우측 버튼 */}
      {ActionButton && <ActionButton />}
    </div>
  );
};

export default Title;
