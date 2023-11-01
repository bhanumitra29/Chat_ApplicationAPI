//  const express = require("express")
//  const socket = require("socket.io")
// const PORT = 4009;
//  const app = express();

// app.get("/",(req,res)=>{
//     res.send("Api is running")
// })

//  const server = app.listen(PORT,()=>{
//     console.log(`the port is running on ${PORT}`)
//  })

//  const io = socket(server,{
//     cors:{
//         origin:"*"
//     }
//  })

//  io.on("connection",(socketClient)=>{
//     console.log(socketClient.id)
//     socketClient.on('Message', (data)=>{
//         console.log(`Received message from ${socketClient.id}: ${data}`)
//         socketClient.emit("Msg",data)
//     })

//     socketClient.on("broadcastMsg", (broadcastMsg)=>{
//         console.log(broadcastMsg)
//         io.emit('broadcastMsgFromSever',broadcastMsg)
//     })

//     socketClient.on("ExclusiveBroadcastMsg", (broadcastMsg)=>{
//         console.log(broadcastMsg)
//         socketClient.broadcast.emit('ExclusiveBroadcastMsgFromSever',broadcastMsg)
//     })

//     socketClient.on('JoinRoom', (JoinedRoom)=>{
//         console.log(JoinedRoom)
//         socketClient.join(JoinedRoom)
//         io.to(JoinedRoom).emit("JoinRoomSucessfully", "Client joined sucessfully");
    
//         socketClient.on('sendRoomMsg',(data)=>{
//             console.log(data)
//             io.to(JoinedRoom).emit('sendJoinRoomMsg',data)
//         })
//     })

    
//  })


const express = require("express");
const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Group chat API is running");
});

const server = app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socketClient) => {
//   console.log(socketClient.id);

  socketClient.on("joinChat", (name) => {
    socketClient.join("group-chat");
    const welcomeMessage = `${name} has joined the chat.`;
    io.to("group-chat").emit("chat message", welcomeMessage);

    socketClient.on("chat message", (message) => {
      const chatMessage = `${name}: ${message}`;
      io.to("group-chat").emit("chat message", chatMessage);
    });
  });
});

