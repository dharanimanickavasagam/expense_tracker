
const request = require("supertest");
const {Income} = require("../../../models/income");
const {User} = require("../../../models/user");

let server;
describe("api/income", () => { 

    beforeEach( async() => { 
        server = require("../../../index");
        await Income.collection.insertMany([
            { 
               date: "09/26/2019",
               payer:"CDI",
               income: 23,
               notes: "CDI Salary"  
           },
           { 
               date: "09/27/2019",
               payer:"Artech",
               income: 123,
               notes: "Artech Salary"  
           }     
        ]);
    })

    afterEach( async() => { 
        server.close();
        await Income.remove({})
    })


    describe("GET /", () => { 

        it("should return 401 when client is not logged in " , async() => { 
            const res = await request(server).get("/api/income"); 
            expect(res.status).toBe(401); 
        }); 

        it("should return all income when client is logged in " , async() => {
            const token = new User().generateAuthToken();  
            const res = await request(server).get("/api/income").set("x-auth-token",token); 
            expect(res.status).toBe(200); 
        }); 

    })

    describe("POST /", () => { 
        it("should return 401 when client is not logged in " , async() => {     
            const res = await request(server)
                            .post("/api/income")
                            .send({ date: "09/26/2019",
                                    payer:"I",
                                    income: 23,
                                    notes: "CDI Salary" 
                            }); 
            expect(res.status).toBe(401); 
        }); 

        it("should return with status 400 on invalid data" , async() => { 
            const token = new User().generateAuthToken(); 
        
            const res = await request(server)
                            .post("/api/income")
                            .set("x-auth-token",token)
                            .send({ date: "09/26/2019",
                                    payer:"I",
                                    income: 23,
                                    notes: "CDI Salary" 
                            }); 
            expect(res.status).toBe(400); 

        })

        it("should add a new income on valid  data with client logged in " , async() => { 
            const token = new User().generateAuthToken(); 
        
            const res = await request(server)
                            .post("/api/income")
                            .set("x-auth-token",token)
                            .send({ date: "09/26/2019",
                                    payer:"CDI",
                                    income: 23,
                                    notes: "CDI Salary" 
                            }); 
            expect(res.status).toBe(200); 
            expect(res.body.payer).toHaveProperty("payer",res.payer)
        })

    })

    
})