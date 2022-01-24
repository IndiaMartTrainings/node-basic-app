const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Student = require("./models/student")


const app = express()
const router = express.Router()
// To Capture the body data posted via postman
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.connect("mongodb://localhost:27017/studentdb", (err) =>{
    if(err){
        throw err
    } else {
     console.log("Connected to MongoDB Successfully !!!")
    }
})

router.get("/", (req, res) =>{
    res.json("Welcome to Node API")
})

router.get("/students", (req, res) =>{
    Student.getStudents((err, data) => {
        if(err){
            throw err
        }

        res.json(data)
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
    const student = req.body

    Student.addStudent(student, (err, data) =>{
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.put("/students/:id", (req, res) =>{
    const student = req.body
    const studentId = req.params.id

    Student.updateStudent(studentId, student, (err, data) =>{
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.delete("/students/:id", (req, res) =>{
    const studentId = req.params.id
    Student.deleteStudentById(studentId, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

app.use("/api", router)

const PORT = 3001

app.listen(PORT, ()=>{
    console.log(`Server Listening at PORT ${PORT}`)
})
