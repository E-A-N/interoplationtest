module.exports = (server) => {
    server._millisecond = 100;
    server._second = 1000;
    server._initTimer = (socket) => {
        socket.count = 0;
    };

    server._updateTimer = (unit, sockets) => {
        const sLength = Object.keys(sockets).length;
        for (let t in sockets){
            var soc = sockets[t];
            soc.count += unit
        }
        console.log(sockets);
    };

    return server;
}
