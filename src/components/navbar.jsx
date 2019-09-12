import React, { Component } from "react";
import Chart from "./chart";
import AddExpense from "./addExpense";
import ExpenseType from "./expenseType";
import Dashboard from "./dashboard";
import NotFound from "./notFound";
import { Link, Switch, Redirect, Route } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to={"/addExpense"} className="nav-link">
                  Add Expense <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item active">
                <Link to={"/addExpenseType"} className="nav-link">
                  Add Expense Type
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/chart"} className="nav-link">
                  Chart
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/addExpense" component={AddExpense} />
          <Route path="/addExpenseType" component={ExpenseType} />
          <Route path="/chart" component={Chart} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Navbar;
