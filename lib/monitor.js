const System = require("systeminformation");

const Monitor = async function Monitor() {
    global.log.monitor("status", {
        version: server.version,
        running: server.running,
        status: server.running ? "running" : "stopped",
        uptime: new Date() - server.time
    });

    global.log.monitor("load", {
        cpu: await System.currentLoad(),
        memory: await System.mem()
    });

    if ((config.server.polling_seconds || 3) > 0) {
        setTimeout(() => {
            Monitor();
        }, (config.server.polling_seconds || 3) * 1000);
    }
}

module.exports = Monitor;