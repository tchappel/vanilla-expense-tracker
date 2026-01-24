import type Model from "./model";
import type { NewTransaction, Transaction } from "./types";
import type View from "./view";

export default class Controller {
  private model: Model;
  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newTransaction: NewTransaction = {
      type: formData.get("type") as NewTransaction["type"],
      description: formData.get("description") as NewTransaction["description"],
      amount_cents: Math.round(
        parseFloat(formData.get("amount") as string) * 100,
      ) as NewTransaction["amount_cents"],
      date: new Date().toISOString(),
    };

    this.model.addTransaction(newTransaction);
    this.view.clearForm();
  };

  handleTransactionDelete = (id: Transaction["id"]) => {
    this.model.deleteTransaction(id);
  };

  init = () => {
    this.view.bindFormSubmit(this.handleFormSubmit);
    this.view.bindTransactionDelete(this.handleTransactionDelete);

    this.view.renderBalance(this.model.getBalance());
    this.view.renderIncomeList(this.model.getIncomeList());
    this.view.renderIncomeTotal(this.model.getIncomeTotal());
    this.view.renderExpenseList(this.model.getExpenseList());
    this.view.renderExpenseTotal(this.model.getExpenseTotal());

    this.model.subscribe(() => {
      this.view.renderBalance(this.model.getBalance());
      this.view.renderIncomeList(this.model.getIncomeList());
      this.view.renderIncomeTotal(this.model.getIncomeTotal());
      this.view.renderExpenseList(this.model.getExpenseList());
      this.view.renderExpenseTotal(this.model.getExpenseTotal());
    });
  };
}
