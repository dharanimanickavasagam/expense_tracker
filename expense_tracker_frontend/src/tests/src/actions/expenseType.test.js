import {
  getExpenseType,
  addExpenseType,
  updateExpenseType,
  deleteExpenseType
} from "./../../../actions/expenseType";

let payload;
beforeEach(() => {
  payload = {
    name: "food",
    need: "primary"
  };
});

describe("tests for action of expenseTypes", () => {
  test("should getExpenseType", () => {
    const result = getExpenseType(payload);
    expect(result).toMatchObject({
      type: "GET_EXPENSE_TYPE",
      payload: { name: "food", need: "primary" }
    });
  });

  test("should addExpenseType", () => {
    const result = addExpenseType(payload);
    expect(result).toMatchObject({
      type: "ADD_EXPENSE_TYPE",
      payload: { name: "food", need: "primary" }
    });
  });

  test("should updateExpenseType", () => {
    const result = updateExpenseType(payload);
    expect(result).toMatchObject({
      type: "UPDATE_EXPENSE_TYPE",
      payload: { name: "food", need: "primary" }
    });
  });

  test("should deleteExpenseType", () => {
    const result = deleteExpenseType(payload);
    expect(result).toMatchObject({
      type: "DELETE_EXPENSE_TYPE",
      payload: { name: "food", need: "primary" }
    });
  });
});
