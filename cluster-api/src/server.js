import http from 'http'
const processId = process.pid

const server = http.createServer((request, response) => {
    for (let index = 0; index < 1e7; index++);
    response.end(`Handled by pid: ${processId}`)
})

server.listen(3000)
    .once('listening', () => {
        console.log('Server is listening on port 3000', processId)
    })
     
// waiting all conections down for server to close
process.on('SIGTERM', () => {
    console.log('server ending', new Date().toISOString())
    server.close(() => process.exit())
})

// simulating that some error happened
setTimeout(() => {
   process.exit(1)
}
, Math.random() * 1e4)