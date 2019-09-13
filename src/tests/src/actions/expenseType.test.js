import {
  getExpenseType,
  addExpenseType,
  updateExpenseType,
  deleteExpenseType
} from "./../../../actions/expenseType";

describe("tests for action of expenseTypes", () => {
  test("should addExpenseType", () => {
    const payload = {
      name: "food",
      need: "primary"
    };
    const result = addExpenseType(payload);
    expect(result).toMatchObject({
      type: "ADD_EXPENSE_TYPE",
      payload: { name: "food", need: "primary" }
    });
  });
});
