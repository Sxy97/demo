const demo_main = require("./demo_main")
const Mock = require('mockjs')

for (let i = 0; i < 100; i++) {
    const ip = Mock.Random.ip()
    const main=new demo_main(ip)
    console.log(ip)
    main.start(function(msg){
        console.log(i)
        console.log(msg)
    })
}