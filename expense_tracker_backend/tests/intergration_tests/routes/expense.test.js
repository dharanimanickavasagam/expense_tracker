
const request = require("supertest");
const {Expense} = require("../../../models/expense");

let server;
describe("api/expense", () => { 

    beforeEach( async() => { 
        server = require("../../../index");
        await Expense.collection.insertMany([
            { 
               date: "09/26/2019",
               name: "gasoline",
               type: "car",
               mode: "fixed",
               amount: 23,
               notes: "Sample"  
           },
           { 
               date: "09/27/2019",
               name: "walmart",
               type: "grocery",
               mode: "variable",
               amount: 123,
               notes: "walmart shopping"  
           }     
        ]);
    })

    afterEach( async() => { 
        server.close();
        await Expense.remove({})
    })


    describe("GET /", () => { 
        it("should return all expense", async() => { 
         const res = await request(server).get("/api/expense"); 
    
        //generic tests 
         expect(res.status).toBe(200); 
         expect(res.body.length).toBe(2);

         //ideal
         expect(res.body.some(e => e.name === "walmart")).toBeTruthy();
         expect(res.body.some(e => e.name === "gasoline")).toBeTruthy();
        })
    })

    describe("GET /:id" , () => { 
        it("should return an expense with valid passed id", async() => { 
            const expense = new Expense({ 
                date: "09/27/2019",
                name: "CVS pharmacy",
                type: "Medical",
                mode: "Variable",
                amount: 7,
                notes: "medical shopping"  
            })
            const savedExpense = await expense.save();

            const res = await request(server).get("/api/expense/" +savedExpense._id);
            expect(res.status).toBe(200);
            //expect((res.body.date)).toBe((expense.date)); 
            expect((res.body.name)).toBe((expense.name)); 
            expect((res.body.type)).toBe((expense.type)); 
            expect((res.body.mode)).toBe((expense.mode)); 
            expect((res.body.amount)).toBe((expense.amount)); 
            expect((res.body.notes)).toBe((expense.notes)); 
        })

        it("should return 404 with invalid passed id", async() => { 
            const expense = new Expense({ 
                date: "09/27/2019",
                name: "CVS pharmacy",
                type: "Medical",
                mode: "Variable",
                amount: 7,
                notes: "medical shopping"  
            })
            const savedExpense = await expense.save();
        
            const res = await request(server).get("/api/expense/" +"5d8fa794ddabcb045cd91ec8");
           expect(res.status).toBe(404)
        })

    })
})