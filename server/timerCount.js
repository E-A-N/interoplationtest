module.exports = (server) => {
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
}
