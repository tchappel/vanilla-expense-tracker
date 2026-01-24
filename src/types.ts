type TransactionBase = {
  id: string;
  amount_cents: number;
  description: string;
  date: string;
};

export type Expense = TransactionBase & {
  type: "expense";
};

export type Income = TransactionBase & {
  type: "income";
};

export type Transaction = Expense | Income;

export type NewTransaction = Omit<Transaction, "id">;
