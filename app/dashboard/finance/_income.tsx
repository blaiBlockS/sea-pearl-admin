import Button from "@/components/common/button";
import Title from "@/components/layout/title";

const IncomeSection = () => {
  // 수익 업로드 버튼
  const uploadProfitButton = () => {
    return (
      <Button variant="fill" onClick={() => {}}>
        <div className="flex h-10 items-center gap-2 px-3">
          <span className="text-body3-medium">수익 입력</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="flex-1">
      {/* 수익 타이틀 */}
      <Title fontSize="text-head2" ActionButton={uploadProfitButton}>
        <span className="mr-5">수익</span>
        <span>{} USDT</span>
      </Title>
    </div>
  );
};

export default IncomeSection;
