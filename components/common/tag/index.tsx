import { cn } from "@/lib/utils";

interface TagProps {
  value: string;
  className?: string;
}

const Tag = ({ value, className }: TagProps) => {
  let result = "";
  let statusStyle = "";
  switch (value) {
    case "1":
      result = "대기중";
      statusStyle = "bg-text-teritary/20 text-text-teritary";
      break;
    case "2":
      result = "진행중";
      statusStyle = "bg-background-brand/20 text-text-brand";
      break;
    case "3":
      result = "완료됨";
      statusStyle = "bg-[#00E6B8]/20 text-[#00E6B8]";
      break;
    case "4":
      result = "취소환불";
      statusStyle = "bg-red-500/20 text-red-500";
      break;
    case "5":
    default:
      result = "서버에러";
      statusStyle = "bg-[#FF6600]/20 text-[#FF6600]";
      break;
  }

  return (
    <div className={cn("flex pl-3", className)}>
      <div className={cn("px-2 py-1 rounded text-body4-semibold", statusStyle)}>
        {result}
      </div>
    </div>
  );
};

export default Tag;
