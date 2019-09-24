const express=require('express'); 
const router = express.Router(); 
const Joi = require("joi"); 
router.use(express.json()); 


const expenseTypes =[ 
    {"name": "Food","need": "Primary","id": 1},
    {"name": "Water","need": "Primary","id": 2},
    {"name": "Shelter","need": "Primary","id": 3},
    {"name": "Grocery","need": "Primary","id": 4},
    {"name": "Car","need": "Secondary","id": 5}
];

const schema = { 
    name : Joi.string().required().min(2), 
    need : Joi.string().required().min(3),
    id : Joi.any()
}


router.get("/", (req,res) => { 
    res.send(expenseTypes)
}); 

router.get("/:id",(req,res) => { 
    const id = parseInt(req.params.id);
    const result = expenseTypes.filter(expenseType => expenseType.id === id ); 
    if(result.length < 1)  { 
        res.status(404).send("The expenseType with id " +`${id}` +" is not found")
    }
    res.send(result)
}); 

router.post("/", (req,res) => { 
    const expenseType = {
        name: req.body.name,
        need: req.body.need,
        id: expenseTypes.length +1
    }; 

    const validated = Joi.validate(expenseType,schema); 
   if(validated.error) { 
       res.status(400).send(validated.error.details[0].message);
   }
    expenseTypes.push(expenseType);
    res.status(200).send(expenseType);
})

router.put("/:id",(req,res) => { 
    const id = parseInt(req.params.id); 
    
    const eT = expenseTypes.find(expenseType => expenseType.id === id ); 
    if(!eT) res.status(404).send("not found")
    
    const validated = Joi.validate(req.body,schema);
   
    if(validated.error)  res.status(400).send(validated.error.details[0].message);
    eT.name = req.body.name ? req.body.name : eT.name 
    eT.need = req.body.need ? req.body.need : eT.need
    res.send(eT)
})

router.delete("/:id",(req,res) => { 
    const id = parseInt(req.params.id); 
    const eT = expenseTypes.find(expenseType => expenseType.id === id ); 
    if(!eT) res.status(404).send("not found"); 

    const index = expenseTypes.indexOf(eT); 
    expenseTypes.splice(index,1); 

    res.send(eT)

})
module.exports = router; 
