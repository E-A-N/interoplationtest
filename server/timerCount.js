module.exports = (server) => {
    server._millisecond = 100;
    server._second = 1000;
    server._initTimer = (socket) => {
        socket.count = 0;
    };

    server._updateTimer = (step, sockets) => {
        const sLength = Object.keys(sockets).length;
        for (let t in sockets; t < sLength; t++){
            var soc = sockets[t];
            soc.count += step;
        }
    };

    server._sendTime = () => {
        server.emit("gameUpdate", server._sockets);
    }

    return server;
}
