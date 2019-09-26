const express = require('express');
const homePage = require("./routes/homePage");
const expenseType = require("./routes/expenseType");
const expense = require("./routes/expense");
const income = require("./routes/income");
const user = require("./routes/user");
const mongoose = require('mongoose');

// generic connection to mongodb database ExpenseTracker 
mongoose.connect("mongodb://localhost/ExpenseTracker").then(
    console.log("Connected to mongodb")
).catch(err => console.log("cannot connect"));

const app = express();
app.set("view engine", "pug");
app.use("/", homePage);
app.use("/api/expenseType", expenseType);
app.use("/api/expense", expense);
app.use("/api/income", income);
app.use("/api/user", user);


app.listen(5000, () => {
    console.log("Started and Listening")
})