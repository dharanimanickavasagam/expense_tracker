const express = require("express");
const router = express.Router();
const { Household, validateHousehold } = require("../models/household");

router.use(express.json());

router.get("/", async (req, res) => {
  const household = await Household.find()
    .sort({ _id: -1 })
    .limit(1)
    .select("-__v");
  res.send(household);
});

router.post("/", async (req, res) => {
  const { error } = validateHousehold(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const household = new Household({
    currencyFormat: req.body.currencyFormat
  });

  const result = await household.save();
  res.send(result);
});

module.exports = router;
