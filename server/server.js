const {createServer} = require('http');
const {Server} = require('socket.io');

const http_server = createServer();
const io = new Server(http_server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('socket connect on server');

    socket.on('joinRoom', (room) => {
        socket.join(room)
        console.log(`${socket.id} joined room ${room}`);
        io.to(room).emit('message', `user ${socket.id} joined ${room}`)
    });

    socket.on('sendmessage', (obj) => {
        io.to(obj.room).emit('message', obj);
    });

    socket.on('disconnect', () => {
        console.log(`user left: ${socket.id}`);
    })
})

http_server.listen(8000, () => {
    console.log('server is launched')
});