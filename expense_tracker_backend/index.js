const express=require('express'); 
const homePage=require("./routes/homePage"); 
const expenseTypes = require("./routes/expenseTypes");
const app = express(); 

app.set("view engine","pug"); 
app.use("/",homePage);
app.use('/api/expenseTypes',expenseTypes);

app.listen(3000, () => { 
    console.log("Started and Listening")
})