import { ExpenseStatusType } from "@/types/expenseStatus";

const expenseStatus: ExpenseStatusType[] = ["출금요청", "지급완료"];

export function isExpenseStatus(value: string): value is ExpenseStatusType {
  return expenseStatus.includes(value as ExpenseStatusType);
}
