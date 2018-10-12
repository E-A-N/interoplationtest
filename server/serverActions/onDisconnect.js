module.exports = (server, config) => {
    return (socket) => {
        console.log(socket.id, "has disconnected!!");
        delete server._sockets[socket.id];
    }
}
