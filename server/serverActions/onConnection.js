module.exports = (server, config) => {
    return (socket) => {
        console.log("New connection!!", socket.id);
        socket = socketInit(socket, io); //eanDebug
        server._sockets[socket.id] = socket;
    }
}
