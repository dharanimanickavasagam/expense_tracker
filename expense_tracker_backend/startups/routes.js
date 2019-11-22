const homePage = require("../routes/homePage");
const expenseType = require("../routes/expenseType");
const expense = require("../routes/expense");
const income = require("../routes/income");
const user = require("../routes/user");
const admin = require("../routes/admin");
const auth = require("../routes/auth");
const budget = require("../routes/budget");
const currencyFormat = require("../routes/currencyFormat");
const household = require("../routes/household");

const { error } = require("../middleware/error");

module.exports = function(app) {
  app.set("view engine", "pug");
  app.use("/", homePage);
  app.use("/api/expenseType", expenseType);
  app.use("/api/expense", expense);
  app.use("/api/income", income);
  app.use("/api/user", user);
  app.use("/api/admin", admin);
  app.use("/api/auth", auth);
  app.use("/api/budget", budget);
  app.use("/api/currencyFormat", currencyFormat);
  app.use("/api/household", household);
  app.use(error);
};
