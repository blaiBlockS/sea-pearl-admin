export interface IncomeType {
  id: string;
  our_ads: number; // 자체 집계한 광고 시청 횟수
  real_ads: number; // 실제 집계된 광고 시청 횟수
  usdt: number; // 정산 usdt
  avg_price: number; // 평균 광고단가
  settlement_date: string; // 정산 날짜
  createdAt: string;
}

export interface IncomeListType {
  incomes: IncomeType[];
  totalCount: number;
  totalIncomeAmount: number;
}
