const express = require('express');
const router = express.Router();
const {
    ExpenseType,
    validateExpenseType
} = require("../models/expenseType");
router.use(express.json());

//get request 
router.get("/", async (req, res) => {
    const expenseType = await ExpenseType.find().select("-__v");
    res.send(expenseType)
});

//get by id 
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const expenseType = await ExpenseType.findById(id);
    if (!expenseType)
        return res.status(400).send("the ID is not found");
    res.send(expenseType);
});

//post request
router.post("/", async (req, res) => {

    const {
        error
    } = validateExpenseType(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const expenseType = new ExpenseType({
        name: req.body.name,
        need: req.body.need
    });

    const result = await expenseType.save();
    res.send(result);
})

//update the collection
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validateExpenseType(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const expenseType = await ExpenseType.findByIdAndUpdate(id, {
        name: req.body.name,
        need: req.body.need,
        _id: req.body._id
        },{ new: true });
    if (!expenseType)
        return res.status(404).send("The ID does not exist");
    res.send(expenseType)

})

//delete the collection
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const expenseType = await ExpenseType.findByIdAndRemove(id);
    if (!expenseType)
        return res.status(404).send("The ID does not exist");
    res.send(expenseType)
})
module.exports = router;