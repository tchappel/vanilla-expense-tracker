import model from "./model";
import type { NewTransaction } from "./types";
import view from "./view";

export const handleFormSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const newTransaction: NewTransaction = {
    type: formData.get("type") as NewTransaction["type"],
    description: formData.get("description") as NewTransaction["description"],
    amount_cents: Math.round(
      parseFloat(formData.get("amount") as string) * 100,
    ) as NewTransaction["amount_cents"],
    date: new Date(),
  };

  model.addTransaction(newTransaction);

  view.renderBalance(model.getBalance());
  view.renderIncomeList(model.getIncomeList());
  view.renderIncomeTotal(model.getIncomeTotal());
  view.renderExpenseList(model.getExpenseList());
  view.renderExpenseTotal(model.getExpenseTotal());
};

const init = () => {
  view.renderBalance(model.getBalance());
  view.renderIncomeList(model.getIncomeList());
  view.renderIncomeTotal(model.getIncomeTotal());
  view.renderExpenseList(model.getExpenseList());
  view.renderExpenseTotal(model.getExpenseTotal());

  view.bindFormSubmit(handleFormSubmit);
};

export default {
  init,
};
