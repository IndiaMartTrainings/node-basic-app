const fs = require("fs")

// fs.readFile("./files/sample.txt", function(err, data){
//     if(err){
//         throw err
//     }
//     console.log(data.toString())
// })

// var data = fs.readFileSync("./files/sample.txt")
// console.log(data.toString())

// fs.writeFile("./files/text.txt", "Welcome to the writefile", function(err){
//     if(err){
//         throw err
//     } else {
//         console.log('Write operation completed')
//     }
// })

fs.appendFile("./files/text.txt", "\nWelcome to the writefile", function(err){
    if(err){
        throw err
    } else {
        console.log('Write operation completed')
    }
})

fs.unlink("./files/text.txt", function(){
    console.log('Deleted file sucessfully')
})