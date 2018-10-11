module.exports = (server, config) => {
    return (socket) => {
        let soc  = server._sockets[socket.id];
        server._initTimer(soc);
        soc.isReady = true;
        soc.x = 200;
        soc.y = 200;
    }
}
