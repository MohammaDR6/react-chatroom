const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')

app.use(cors())
const server = http.createServer(app)

server.listen(3001, () => {
    console.log("Server is On");
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (x)=> {
    console.log(`User just connected : ${x.id}`);

    x.on("joinRoom", (data)=> {
        x.join(data);
        console.log(`User with ${x.id} id joined ${data} Room`);
    });

    x.on("send", (data)=> {
        x.to(data.roomId).emit("receive", data)
    })

    x.on("disconnect", ()=> {
        console.log(`"disconnected User : ${x.id}`);
    });
});

