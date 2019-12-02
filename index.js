const app = require('./likeExpress')()
const port = 4000
app.use(function(req, res, next){
    res.json('代码跑通了！！')
    next()
},function(req, res, next){
    console.log('控制台看输出1')
    next()
},function(req, res, next){
    console.log('控制台看输出2')
    console.log(33)
})
app.listen(port)



// const http = require('http')

// const server = http.createServer((req,res)=>{
//     res.end('代码跑通了！！')
// })
// server.listen(port)



console.log('ok')