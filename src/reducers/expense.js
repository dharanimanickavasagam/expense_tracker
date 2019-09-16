import {
    ADD_EXPENSE,
    GET_EXPENSE,
    DELETE_EXPENSE,
    UPDATE_EXPENSE
} from "../constants/constants";

const initialState = [{
    id: 1,
    date: "09/ 15 / 2019",
    description: "rent",
    type: "primary",
    mode: "fixed",
    amount: 1000,
    notes: "recurring one"
}];

const expense = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EXPENSE":
            return null;

        case "ADD_EXPENSE":
            return null

        case "UPDATE_EXPENSE":
            return null

        case "DELETE_EXPENSE":
            return null

        default:
            return state;
    }

}

export default expense;