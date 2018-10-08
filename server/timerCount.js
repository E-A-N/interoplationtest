module.exports = (server) => {
    server._millisecond = 100;
    server._second = 1000;
    server._initTimer = (socket) => {
        socket.count = 0;
    };

    server._updateTimer = (milli, sockets) => {
        const sLength = Object.keys(sockets).length;
        for (let t in sockets){
            var soc = sockets[t];
            soc.count += milli;
        }
    };

    return server;
}
