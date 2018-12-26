const EventEmitter = require('events').EventEmitter;
const ProcessPool = require('./processPool');
const workers = new ProcessPool(__dirname + '/work.js', require('os').cpus().length);

class Main_Work extends EventEmitter {
    constructor(ip) {
        super();
        this.ip = ip
    }

    /**
     * 开始执行任务
     */
    start(cb) {
        workers.acquire((err, worker) => { // 尝试从进程池获得一个新进程
            worker.send({ip: this.ip}); // 创建成功后，给子进程发送一条消息

            const onMessage = msg => {
                if (msg.event === 'end') {  // 如果子进程发出的是end事件，则首先去除worker的监听器，再把当前进程放回进程池
                    worker.removeListener('message', onMessage); // 移除事件监听器，节省内存
                    workers.release(worker); // 放回内存
                    cb(msg)
                }

                // this.emit(msg.event, msg.data); // 其它事件则放出给外部监听
            };
            worker.on('message', onMessage); // 监听子进程的消息
        });
    }
}

module.exports = Main_Work;