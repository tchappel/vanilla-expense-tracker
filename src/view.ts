import type { Expense, Income } from "./types";
import currency from "./utils/currency";

const getBalanceEl = (): HTMLElement => {
  const balanceEl = document.getElementById("balance");
  if (!balanceEl) {
    throw new Error("Balance Element undefined");
  }
  return balanceEl;
};

const getFormEl = (): HTMLFormElement => {
  const formEl = document.getElementById("form");

  if (!formEl) {
    throw new Error("Form Element undefined");
  }

  if (formEl instanceof HTMLFormElement) {
    return formEl;
  } else {
    throw new Error("Form Element is not a HTML Form");
  }
};

const getIncomeListEl = (): HTMLElement => {
  const incomeListEl = document.getElementById("income-list");
  if (!incomeListEl) {
    throw new Error("Income List Element undefined");
  }
  return incomeListEl;
};

const getIncomeTotalEl = (): HTMLElement => {
  const incomeTotalEl = document.getElementById("income-total");
  if (!incomeTotalEl) {
    throw new Error("Income Total Element undefined");
  }
  return incomeTotalEl;
};

const getExpenseListEl = (): HTMLElement => {
  const expenseListEl = document.getElementById("expense-list");
  if (!expenseListEl) {
    throw new Error("Expense List Element undefined");
  }
  return expenseListEl;
};

const getExpenseTotalEl = (): HTMLElement => {
  const expenseTotalEl = document.getElementById("expense-total");
  if (!expenseTotalEl) {
    throw new Error("Expense Total Element undefined");
  }
  return expenseTotalEl;
};

const renderBalance = (amount_cents: number) => {
  const balanceEl = getBalanceEl();
  if (balanceEl) balanceEl.innerHTML = currency.format(amount_cents / 100);
};

const renderIncomeList = (incomeList: Income[]) => {
  const incomeListEl = getIncomeListEl();
  const incomeListHTML = incomeList
    .map(
      (i) =>
        `<div><div>${i.description} - ${currency.format(i.amount_cents / 100)} - ${i.date}</div><button>Delete</button></div>`,
    )
    .toString();
  incomeListEl.innerHTML = incomeListHTML;
};

const renderIncomeTotal = (amount: number) => {
  const incomeTotalEl = getIncomeTotalEl();
  incomeTotalEl.innerHTML = amount.toString();
};

const renderExpenseList = (expenseList: Expense[]) => {
  const expenseListEl = getExpenseListEl();
  const expenseListHTML = expenseList
    .map(
      (i) =>
        `<div><div>${i.description} - ${currency.format(i.amount_cents / 100)} - ${i.date}</div><button>Delete</button></div>`,
    )
    .toString();
  expenseListEl.innerHTML = expenseListHTML;
};

const renderExpenseTotal = (amount: number) => {
  const expenseTotalEl = getExpenseTotalEl();
  expenseTotalEl.innerHTML = amount.toString();
};

const bindFormSubmit = (handler: (e: SubmitEvent) => void) => {
  const fromEl = getFormEl();
  fromEl.addEventListener("submit", handler);
};

export const clearForm = () => {
  const formEl = getFormEl();
  formEl.reset();
};

export default {
  renderBalance,
  renderIncomeList,
  renderIncomeTotal,
  renderExpenseList,
  renderExpenseTotal,
  bindFormSubmit,
};
