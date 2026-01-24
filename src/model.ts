import type { Expense, Income, NewTransaction, Transaction } from "./types";

type ModelListener = () => void;

export default class Model {
  private transactions: Transaction[] = [];
  private transactionCounter = 0;
  private listeners: ModelListener[] = [];

  getBalance = (): number => {
    return this.transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount_cents : acc - t.amount_cents;
    }, 0);
  };

  addTransaction = (transaction: NewTransaction) => {
    this.transactions.push({
      ...transaction,
      id: this.transactionCounter++,
    });
    this.notify();
  };

  deleteTransaction = (id: Transaction["id"]) => {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.notify();
  };

  getIncomeList = (): Income[] => {
    return this.transactions.filter((t) => t.type === "income") as Income[];
  };

  getIncomeTotal = (): number => {
    return this.getIncomeList().reduce((acc, t) => acc + t.amount_cents, 0);
  };

  getExpenseList = (): Expense[] => {
    return this.transactions.filter((t) => t.type === "expense") as Expense[];
  };

  getExpenseTotal = (): number => {
    return this.getExpenseList().reduce((acc, t) => acc + t.amount_cents, 0);
  };

  subscribe = (listener: ModelListener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  notify = () => {
    this.listeners.forEach((l) => l());
  };
}
