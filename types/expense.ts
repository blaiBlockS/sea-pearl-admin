export interface ExpenseType {
  id: string;
  userId: string;
  telegramUid: number;

  firstName: string;
  lastName: string;
  userName: string;
  order_amount: number;
  txHashUrl: string;

  expenseDate: string;
  createdAt: string; // IsoString
  updatedAt: string; // IsoString
}

export interface ExpenseListType {
  expenses: ExpenseType[];
  totalCount: number;
}
