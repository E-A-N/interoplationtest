module.exports = (server) => {
    server._rootTime = 0;
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
        console.log(sockets);
    };

    return server;
}
