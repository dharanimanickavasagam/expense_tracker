const express = require("express");
const router = express.Router();

const {
    Budget,
    validateBudget
} = require("../models/budget");

router.use(express.json())

//get request
router.get("/", async (req, res) => {
    const budget = await Budget.find().populate('expenseType', 'name')
    res.send(budget);
});

//post request 
router.post("/", async (req, res) => {
    const {
        error
    } = validateBudget(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const budget = new Budget({
        expenseType: req.body.expenseType,
        funds: req.body.funds
    });

    const result = await budget.save();
    res.send(result);
});

//delete request 
router.delete("/:id", async (req, res) => {

    const {
        error
    } = validateBudget(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    const result = await Budget.findByIdAndRemove(id);
    if (!result) return res.status(404).send("The id does not exist")
    res.send(result);
});

//put request 
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validateBudget(req.body);

    if (error)
        return res.status(400).send(error.details[0].message)

    const budget = await Budget.findByIdAndUpdate(id, {
        expenseType: req.body.expenseType,
        funds: req.body.funds
    }, {
        new: true
    });

    if (!budget)
        return res.status(404).send("The id does not exist");

    res.send(budget)

})

module.exports = router;