module.exports = (server, config) => {
    return (socket) => {
        console.log(socket.id, "has disconnected!!");
        //server.emit("playerRemove", socket.id);
        delete server._sockets[socket.id];
    }
}
