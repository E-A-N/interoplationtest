module.exports = (server) => {
    server._rootTime = 0;
    server._timeSignal = 100; //1/10 millesecond
    server._initTimer = (socket) => {
        socket.count = 0;
        socket.timeOrigin = server._rootTime; //label birth time of socket
        return socket;
    };

    server._updateTimer = (unit, sockets) => {
        server._rootTime += unit;
        const sLength = Object.keys(sockets).length;
        for (let t in sockets){
            var soc = sockets[t];
            soc.count += unit
        }
        if (server._rootTime % 1000 === 0) {
            console.log(sockets);
        };
        // var
        // if (server.r)
    };

    return server;
}
