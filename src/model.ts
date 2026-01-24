import type { Income, NewTransaction, Transaction } from "./types";

let transactions: Transaction[] = [];
let transactionCounter = 0;

export const getBalance = (): number => {
  return transactions.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount_cents : acc - t.amount_cents;
  }, 0);
};

export const addTransaction = (transaction: NewTransaction) => {
  transactions.push({
    ...transaction,
    id: transactionCounter++,
  });
};

export const deleteTransaction = (id: Transaction["id"]) => {
  transactions = transactions.filter((t) => t.id !== id);
};

export const getIncomeList = (): Income[] =>
  transactions.filter((t) => t.type === "income");

export const getIncomeTotal = (): number => {
  return getIncomeList().reduce((acc, t) => acc + t.amount_cents, 0);
};

export const getExpenseList = () => {
  return transactions.filter((t) => t.type === "expense");
};

export const getExpenseTotal = (): number => {
  return getExpenseList().reduce((acc, t) => acc + t.amount_cents, 0);
};

export default {
  getBalance,
  getIncomeList,
  getIncomeTotal,
  getExpenseList,
  getExpenseTotal,
  addTransaction,
};
