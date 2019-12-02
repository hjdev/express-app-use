const http = require('http')

class likeExpress {
  constructor() {
    this.routers = {
      all: [],
      get: [],
      post: []
    }
  }
  register(path){
    let info = {}
    if(typeof path === 'string') {
      info.path = path
      info.stack = Array.prototype.slice.call(arguments,1)
    } else {
      info.path = '/'
      info.stack = Array.prototype.slice.call(arguments,0)
    }
    return info
  }
  use() {
    let isArray = this.register.apply(this,arguments)
    this.routers.all.push(isArray)
  }
  get() {
    let isArray = this.register.apply(this,arguments)
    this.routers.get.push(isArray)
  }
  post() {
    let isArray = this.register.apply(this,arguments)
    this.routers.post.push(isArray)
  }
  handle(req,res,stack){
    let next = ()=>{
      const isStack = stack.shift()
      if(isStack) {
        isStack(req,res,next)
      }
    }
    next()
  }
  match(method,url){
    let stack = []
    if(url ==='/favicon.ico') return stack
    let resultRouters = []
    resultRouters = resultRouters.concat(this.routers.all)
    resultRouters = resultRouters.concat(this.routers[method])
    resultRouters.forEach(item=>{
      console.log('item is', item)
      console.log('....', url.indexOf(item.path)===0)
      if(url.indexOf(item.path)===0){
        stack = stack.concat(item.stack)
      }
    })
    console.log('resultRouters', resultRouters)
    console.log('stack', stack)
    return stack
  }
  callback(){
    return (req,res) =>{
      console.log('method', req.method.toLowerCase())
      console.log('url', req.url)
      res.json = (data) =>{
        // 设置返回格式 JSON
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      let method = req.method.toLowerCase()
      let url = req.url
      let result = this.match(method,url)
      this.handle(req,res,result)
    }
  }
  listen(...arg) {
    console.log(1112,...arg)
    const server = http.createServer(this.callback())
    server.listen(...arg)
  }
}

module.exports = () => {
  return new likeExpress()
}