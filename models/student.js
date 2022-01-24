const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name : {
        type:String,
        required: true
    },
    email : {
        type:String,
        required: true
    },
    city : {
        type:String, 
        required: true
    }
})

const Student = module.exports = mongoose.model("student", studentSchema, "student")

module.exports.getStudents = function(callback){
    Student.find(callback)
}

module.exports.getStudentById = function(studentId, callback){
    Student.findById({_id: studentId}, callback)
}

module.exports.addStudent = function(user, callback){
    Student.create(user, callback)
}

module.exports.updateStudent = function(studentId, user, callback){
    Student.updateOne({_id: studentId}, user, callback)
}

module.exports.deleteStudentById = function(studentId, callback){
    Student.deleteOne({_id: studentId}, callback)
}