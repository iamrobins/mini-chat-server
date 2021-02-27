import net from "net";

let sockets: net.Socket[] = [];

let chatServer = net.createServer((socket) => {
  socket.write("Welcome to worlds best chat server\n");
  sockets.push(socket);

  socket.on("data", (data) => {
    for(let i = 0; i < sockets.length; i++) {
      if(sockets[i] === socket) continue;
      sockets[i].write(data);
    }
  });

  socket.on("end", () => {
    let i = sockets.indexOf(socket);
    sockets.splice(i, 1);
  })
})

chatServer.listen(8000);