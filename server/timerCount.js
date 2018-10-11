module.exports = (server) => {
    server._hasTimerLogic = true;
    server._rootTime = 0;
    server._timeSignal = 100; //1/10 millesecond
    server._initTimer = (socket) => {
        socket.count = 0;
        socket.timeOrigin = server._rootTime; //label birth time of socket
        return socket;
    };

    server._updateTimer = (unit, sockets) => {
        server._rootTime += unit;
        for (let t in sockets){
            var soc = sockets[t];
            soc.count += unit
        }
        if (server._rootTime % 1000 === 0) {
            //console.log(sockets);
        };

        // if (server._rootTime % 100 === 0){
        //     server._sendTimeData(server._rootTime);
        // }
    };

    return server;
}
