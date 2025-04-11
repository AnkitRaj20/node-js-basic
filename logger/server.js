import fs from 'fs';
import os from 'os';
import EventsEmitter from 'events';

class Logger extends EventsEmitter{
    log(message){
        this.emit('log', message);
    }
}

const logger = new Logger();
const logFilePath = "./server.log"

const logToFile = (event) => {
    const logMessage = `${Date.now().toString()} - ${event}\n --------------------------------\n`;
    fs.appendFileSync(logFilePath, logMessage)
}


logger.on('log' , logToFile)


setInterval(()=>{
    const memoryUsage = (os.freemem / os.totalmem() ) * 100;
    const cpuUsage = os.loadavg()[0]; // 1 minute average load
    const uptime = os.uptime(); // in seconds
     logger.log(`Memory Usage: ${memoryUsage.toFixed(2)}%, CPU Usage: ${cpuUsage.toFixed(2)}, Uptime: ${uptime} seconds`);
}, 3000)

logger.log('Server started');
logger.log('Server is running smoothly');