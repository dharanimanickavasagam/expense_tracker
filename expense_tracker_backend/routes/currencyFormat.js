const express = require("express");
const router = express.Router();
const {
  CurrencyFormat,
  validateCurrencyFormat
} = require("../models/currencyFormat");
router.use(express.json());

// get request
router.get("/", async (req, res) => {
  const currencyFormat = await CurrencyFormat.find().select("-__v");
  res.send(currencyFormat);
});

//post request
router.post("/", async (req, res) => {
  const { error } = validateCurrencyFormat(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const currencyFormat = new CurrencyFormat({
    name: req.body.name,
    symbol: req.body.symbol
  });

  const result = await currencyFormat.save();
  res.send(result);
});

module.exports = router;
