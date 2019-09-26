import React, { Component } from "react";
import Chart from "./chart";
import ExpenseType from "./expenseType";
import Dashboard from "./dashboard";
import NotFound from "./notFound";
import { Switch, Redirect, Route, NavLink } from "react-router-dom";
import Income from "./income";

class Navbar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<NavLink to={"/"} className="navbar-brand">
						Expense
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					></button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink to={"/income"} className="nav-link">
									Income
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink to={"/expenseType"} className="nav-link">
									Expense Type
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink to={"/chart"} className="nav-link">
									Chart
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>

				<Switch>
					<Route path="/income" component={Income} />
					<Route path="/expenseType" component={ExpenseType} />
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