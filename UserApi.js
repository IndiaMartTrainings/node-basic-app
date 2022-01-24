const express = require("express")
const cors = require("cors")
const sql = require("mssql")


const app = express()
const router = express.Router()
// To Capture the body data posted via postman
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const dbConfig = {
    user: 'sa',
    password: 'user@123',
    server: 'LAPTOP-GQVH23CD',
    database: 'StudentDB',
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

router.get("/", (req, res) =>{
    res.json("Welcome to Node API")
})

router.get("/students", (req, res) =>{
    sql.connect(dbConfig, (err)=> {
        if(err){
            throw err
        }

        const selectQuery ="SELECT * FROM STUDENT"
        const request = new sql.Request()
        request.query(selectQuery, (err, data) => {
            if(err){
                throw err
            }
            res.json(data.recordset)
        })
    })
})

router.get("/students/:id", (req, res) =>{
    console.log(req.params)
    const studentId = req.params.id

    Student.getStudentById(studentId, (err, data) => {
        if(err){
            throw err
        }

        res.json(data)
    })
})

router.post("/students", (req, res) =>{
    const user = req.body
    console.log(user)
    sql.connect(dbConfig, (err)=> {
        if(err){
            throw err
        }

        const insertQuery =`INSERT INTO Student (name, email, city) VALUES( '${user.name}', '${user.email}', '${user.city}')`
        const request = new sql.Request()
        request.query(insertQuery, (err, data) => {
            if(err){
                throw err
            }
            res.json(data)
        })
    })
})

router.put("/students/:id", (req, res) =>{
    const userId = req.params.id

    const user = req.body
    sql.connect(dbConfig, (err)=> {
        if(err){
            throw err
        }

        const updateQuery =`UPDATE Student SET name ='${user.name}', email='${user.email}', city ='${user.city}' WHERE _id=${userId}`
        const request = new sql.Request()
        request.query(updateQuery, (err, data) => {
            if(err){
                throw err
            }
            res.json(data)
        })
    })
})

router.delete("/students/:id", (req, res) =>{
    const userId = req.params.id
    sql.connect(dbConfig, (err)=> {
        if(err){
            throw err
        }

        const deleteQuery =`DELETE FROM Student WHERE _id=${userId}`
        const request = new sql.Request()
        request.query(deleteQuery, (err, data) => {
            if(err){
                throw err
            }
            res.json(data)
        })
    })
})

app.use("/api", router)

const PORT = 3001

app.listen(PORT, ()=>{
    console.log(`Server Listening at PORT ${PORT}`)
})
