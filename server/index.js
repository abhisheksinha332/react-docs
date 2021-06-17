const io = require('socket.io')(8000,{
    cors: {
        origin : 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket =>{
    console.log("connected");
})