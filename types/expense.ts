export interface ExpenseType {
  id: string;
  userId: string;
  telegramId: number;

  firstName: string;
  lastName: string;
  userName: string;
  amount: number;
  link: string;

  expenseDate: string;
  orderDate: string; // IsoString
  updatedAt: string; // IsoString
}

export interface ExpenseListType {
  expenses: ExpenseType[];
  totalCount: number;
  totalExpenseAmount: number;
}
