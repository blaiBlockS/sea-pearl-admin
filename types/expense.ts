export interface ExpenseType {
  id: string;
  userId: string;
  telegramId: number;

  firstName: string;
  lastName: string;
  userName: string;

  // 혼용되고 있음...
  amount?: number;
  order_amount?: number;

  link: string;

  expenseDate: string;
  orderDate: string; // IsoString
  updatedAt: string; // IsoString
}

export interface ExpenseListType {
  expenses: ExpenseType[];
  totalCount: number;
  totalExpenseAmount: number; // 페이지 별 총합이랜다...
}
