const spawn = require('child-process-promise').spawn;
const xml2js = require('xml2js');
const parseString = xml2js.parseString;
process.on('message', async msg => {  // 子进程在收到父进程消息时执行回调
// 进行 nmap 操作
    console.log(msg)
    const data = await spawn("nmap", ["-sS", "-sV", "-T4", "-F", "-O", "-oX", "-",`${msg.ip}`], {capture: ['stdout', 'stderr']})
    parseString(data.stdout, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            process.send({event: 'end', data: result.nmaprun.runstats[0].hosts[0].$.up});
        }
    });
});