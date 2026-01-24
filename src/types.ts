type TransactionBase = {
  id: number;
  amount_cents: number;
  description: string;
  date: Date;
};

export type Expense = TransactionBase & {
  type: "expense";
};

export type Income = TransactionBase & {
  type: "income";
};

export type Transaction = Expense | Income;

// For creating new transactions (without id)
export type NewTransaction = Omit<Transaction, "id">;
