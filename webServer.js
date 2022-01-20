const res = require('express/lib/response')
const http = require('http')

http.createServer(function(request, response){
    console.log(request.url)
    if(request.url == "/") {
        response.end("This is the default URL")
    } else if(request.url == "/employee"){
        response.end("There is no employee URL")
    }
   
}).listen(1234)