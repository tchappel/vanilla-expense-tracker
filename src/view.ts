import type { Expense, Income, Transaction } from "./types";
import currency from "./utils/currency";
import date from "./utils/date";

export default class View {
  private getBalanceEl(): HTMLElement {
    const balanceEl = document.getElementById("balance");
    if (!balanceEl) {
      throw new Error("Balance Element undefined");
    }
    return balanceEl;
  }

  private getFormEl(): HTMLFormElement {
    const formEl = document.getElementById("form");

    if (!formEl) {
      throw new Error("Form Element undefined");
    }

    if (formEl instanceof HTMLFormElement) {
      return formEl;
    } else {
      throw new Error("Form Element is not a HTML Form");
    }
  }

  private getIncomeListEl(): HTMLElement {
    const incomeListEl = document.getElementById("income-list");
    if (!incomeListEl) {
      throw new Error("Income List Element undefined");
    }
    return incomeListEl;
  }

  private getIncomeTotalEl(): HTMLElement {
    const incomeTotalEl = document.getElementById("income-total");
    if (!incomeTotalEl) {
      throw new Error("Income Total Element undefined");
    }
    return incomeTotalEl;
  }

  private getExpenseListEl(): HTMLElement {
    const expenseListEl = document.getElementById("expense-list");
    if (!expenseListEl) {
      throw new Error("Expense List Element undefined");
    }
    return expenseListEl;
  }

  private getExpenseTotalEl(): HTMLElement {
    const expenseTotalEl = document.getElementById("expense-total");
    if (!expenseTotalEl) {
      throw new Error("Expense Total Element undefined");
    }
    return expenseTotalEl;
  }

  renderBalance(amount_cents: number) {
    const balanceEl = this.getBalanceEl();
    balanceEl.innerHTML = currency.format(amount_cents / 100);
    if (amount_cents > 0) {
      balanceEl.style.color = "var(--color-income)";
    } else if (amount_cents < 0) {
      balanceEl.style.color = "var(--color-expense)";
    } else {
      balanceEl.style.color = "inherit";
    }
  }

  renderTransactionList = (
    transactionList: Transaction[],
    listEl: HTMLElement,
  ) => {
    listEl.innerHTML = "";
    for (const t of transactionList) {
      const transactionEl = document.createElement("div");
      transactionEl.classList.add("transaction");

      const descriptionEl = document.createElement("span");
      descriptionEl.classList.add("transaction__description");
      descriptionEl.textContent = t.description;

      const amountEl = document.createElement("span");
      amountEl.textContent = currency.format(t.amount_cents / 100);

      const dateEl = document.createElement("span");
      dateEl.textContent = date.format(t.date);

      const buttonEl = document.createElement("button");
      buttonEl.textContent = "Delete";
      buttonEl.dataset.id = t.id;

      transactionEl.append(descriptionEl, amountEl, dateEl, buttonEl);
      listEl.appendChild(transactionEl);
    }
  };

  renderIncomeList(incomeList: Income[]) {
    const incomeListEl = this.getIncomeListEl();
    this.renderTransactionList(incomeList, incomeListEl);
  }

  renderIncomeTotal(amount_cents: number) {
    const incomeTotalEl = this.getIncomeTotalEl();
    incomeTotalEl.innerHTML = currency.format(amount_cents / 100);
  }

  renderExpenseList(expenseList: Expense[]) {
    const expenseListEl = this.getExpenseListEl();
    this.renderTransactionList(expenseList, expenseListEl);
  }

  renderExpenseTotal(amount_cents: number) {
    const expenseTotalEl = this.getExpenseTotalEl();
    expenseTotalEl.innerHTML = currency.format(amount_cents / 100);
  }

  bindFormSubmit(handler: (e: SubmitEvent) => void) {
    const fromEl = this.getFormEl();
    fromEl.addEventListener("submit", handler);
  }

  clearForm() {
    const formEl = this.getFormEl();
    formEl.reset();
  }

  bindTransactionDelete(handler: (transactionId: string) => void) {
    [this.getIncomeListEl(), this.getExpenseListEl()].forEach((container) => {
      container.addEventListener("click", (e) => {
        const target = e.target;
        if (target instanceof HTMLButtonElement) {
          const btn = target;
          if (!btn.dataset.id) {
            throw new Error(
              "Transaction Delete button does not have a data-id attribute",
            );
          } else {
            handler(btn.dataset.id);
          }
        }
      });
    });
  }
}
