import React, { Component } from "react";
import { Switch, Redirect, Route, NavLink } from "react-router-dom";
import Chart from "./chart";
import ExpenseType from "./expenseType";
import Dashboard from "./dashboard";
import Login from "./login";
import NotFound from "./notFound";
import Income from "./income";
import SignUp from "./signup";
import Logout from "./logout";
import Admin from "./admin";
import { getJsonWebToken } from "../services/authService";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./common/protectedRoute";
import ProtectedAdminRoute from "./common/protectedAdminRoute";
import MaterialIncomeTable from "./materialIncomeTable";

class Navbar extends Component {
  render() {
    const user = getJsonWebToken();
    let userDetails;
    if (user) {
      userDetails = jwtDecode(user);
    }
    console.log("User", userDetails);

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {user && (
            <NavLink to={"/"} className="navbar-brand">
              Expense
            </NavLink>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {user && (
                  <NavLink to={"/income"} className="nav-link">
                    Income
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {user && (
                  <NavLink to={"/expenseType"} className="nav-link">
                    Expense Type
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {user && (
                  <NavLink to={"/chart"} className="nav-link">
                    Chart
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {!user && (
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {user && userDetails.isAdmin && (
                  <NavLink to={"/admin"} className="nav-link">
                    Admin Page
                  </NavLink>
                )}
              </li>
            </ul>
            <span className="navbar-text">
              {user && (
                <NavLink to={"/"} className="nav-link">
                  Welcome {userDetails.name}
                </NavLink>
              )}
            </span>
            <span className="navbar-text">
              {user && (
                <NavLink to={"/logout"} className="nav-link">
                  Logout
                </NavLink>
              )}
            </span>
          </div>
        </nav>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />

          <ProtectedRoute path="/income" component={MaterialIncomeTable} />
          <ProtectedRoute path="/expenseType" component={ExpenseType} />
          <ProtectedRoute path="/chart" component={Chart} />

          <Route path="/logout" component={Logout} />

          <ProtectedAdminRoute path="/admin" component={Admin} />
          <ProtectedRoute exact path="/" component={Dashboard} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Navbar;
