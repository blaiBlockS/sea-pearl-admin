import { cn } from "@/utils/cn";

interface TitleProps {
  children: React.ReactNode;
  ActionButton?: React.ComponentType;
  SubButton?: React.ComponentType;
  fontSize?: string;
}

const Title = ({
  children,
  ActionButton,
  SubButton,
  fontSize = "text-head1",
  ...props
}: TitleProps) => {
  const titleStyle = cn(fontSize, "mb-6.5 flex items-center justify-between");

  return (
    <div className={titleStyle} {...props}>
      {/* 타이틀 */}
      <span>{children}</span>

      {/* 우측 버튼 */}
      <div>
        {ActionButton && <ActionButton />}
        {/* {SubButton && <SubButton />} */}
      </div>
    </div>
  );
};

export default Title;
