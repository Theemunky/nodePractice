var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Tim', message: 'hi'},
    {name: 'Jane', message: 'hello'}
]

app.get('/messages', (req, response) => {
    response.send(messages)
})

app.post('/messages', (req, response) => {
    messages.push(req.body)
    io.emit('message', req.body)
    response.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})