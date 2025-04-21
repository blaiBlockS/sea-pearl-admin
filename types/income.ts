export interface IncomeType {
  id: string;
  our_ads: number;
  real_ads: number;
  usdt: number;
  avg_price: number;
  settlement_date: string;
  createdAt: string;
}

export interface IncomeListType {
  incomes: IncomeType[];
  totalCount: number;
  totalIncomeAmount: number;
}
