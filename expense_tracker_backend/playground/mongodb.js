const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost/playground").then(
    console.log("Connected to mongodb")
).catch(err => console.log("cannot connect"));

const schema = new mongoose.Schema({
    name: { 
        type: String,
        required : true, 
        minLength:2
    },
    need:String,
    date: {type:Date ,default: Date.now}
}); 

const ExpenseType = mongoose.model('ExpenseType',schema); 



async function create() { 
   
    const expenseType = new ExpenseType({ 
        name:"Shelter",
        need:"primary"
    })
    const result  = await expenseType.save();
    console.log(result);
 
}

create(); 

async function getExpenseType() { 

    const expensTypes = await ExpenseType.find();
    console.log(expensTypes)
};

getExpenseType(); 


async function getExpenseTypeWithNameD() { 

    const expensTypes = await ExpenseType.find({
        name : /S.*/
    });
    console.log("Result is ",expensTypes)
};

getExpenseTypeWithNameD(); 


async function updateExpenseType(id) { 
    const res = await ExpenseType.findById(id);
    if(! res) return 
    res.name = "modified name"; 

    const result = await res.save();
    console.log("Res" ,result)
}

updateExpenseType("5d8a3377a80278e6a2237783");