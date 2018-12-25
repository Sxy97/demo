process.on('message', msg => {  // 子进程在收到父进程消息时执行回调
// 进行 nmap 操作
    process.send({event: 'end', data: data});
});