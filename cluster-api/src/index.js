import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () => {
    const processCount = os.cpus().length * 2
    console.log(`primary ${process.pid} is running`)
    console.log(`Forking Server with ${processCount} processes`)

    for (let i = 0; i < processCount; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`worker ${worker.process.pid} crashed. restarting...`)
            cluster.fork()
        }
    })
}

const runWorkerProcess = async () => {
    await import('./server.js') 
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()