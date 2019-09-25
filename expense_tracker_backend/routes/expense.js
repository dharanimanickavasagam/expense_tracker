const express = require("express");
const router = express.Router();
const {
    Expense,
    validateExpense
} = require("../models/expense");



router.use(express.json());

//3.create objects with the Expense class and write the restful services with express

//get request for all the expenses in the database 
router.get("/", async (req, res) => {
    const expense = await Expense.find().sort({
        name: 1
    });
    res.send(expense)
});


//post request to add new expense 
router.post("/", async (req, res) => {
    const {
        error
    } = validateExpense(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const expense = new Expense({
        date: req.body.date,
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        mode: req.body.mode,
        notes: req.body.notes
    });
    const result = await expense.save();
    res.send(result)
});

//delete request to delete expense by id 
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const expense = await Expense.findByIdAndRemove(id);

    if (!expense) return res.status(404).send("The id does not exist")
    res.send(expense)
});

//update request to update expense by id 
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const name = req.body.name;
    const type = req.body.type;
    const mode = req.body.mode;
    const notes = req.body.notes;
    const amount = req.body.amount;

    const {
        error
    } = validateExpense(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const expense = await Expense.findByIdAndUpdate(
        req.params.id, {
            date,
            name,
            type,
            mode,
            notes,
            amount
        }, {
            new: true
        }
    );
    if (!expense) return res.staus(404).send("The id is not found")
    res.send(expense)
})

module.exports = router;