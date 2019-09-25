const express = require("express");
const {
    Income,
    validateIncome
} = require("../models/income");
const router = express.Router();
router.use(express.json());

//get request for income 
router.get("/", async (req, res) => {
    const income = await Income.find();
    res.send(income)
})

//post a new income to the income collection
router.post("/", async (req, res) => {
    const {
        error
    } = validateIncome(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const incomeObj = new Income({
        date: req.body.date,
        payer: req.body.payer,
        income: req.body.income,
        notes: req.body.notes
    });

    const result = await incomeObj.save();
    res.send(result)
})

//delete an income by id 
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const result = await Income.findByIdAndRemove(id);
    if (!result)
        return res.status(404).send("ID does not exist");
    res.send(result)
});

//update an income by id 
router.put("/:id", async (req, res) => {
    const id = req.params.id;

    const {
        error
    } = validateIncome(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const result = await Income.findByIdAndUpdate(id, {
        date: req.body.date,
        payer: req.body.payer,
        income: req.body.income,
        notes: req.body.notes
    }, {
        new: true
    });

    if (!result) return res.staus(404).send("The id is not found")
    res.send(result)
})
module.exports = router;