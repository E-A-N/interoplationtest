module.exports = (server) => {
    server._hasTimerLogic = true;
    server._rootTime = 0;
    server._timeSignal = 100; // 0.1 seconds
    server._initTimer = (socket) => {
        socket.game.count = 0;
        socket.game.timeOrigin = server._rootTime; //label birth time of socket
        console.log(socket.id, "timer has been inited at:", socket.game.timeOrigin)
        return socket;
    };

    server._updateTimer = (unit, sockets) => {
        server._rootTime += unit;
        const intervalCondition = server._rootTime % 3000 === 0 && Object.keys(sockets).length > 0;

        for (let t in sockets){
            var soc = sockets[t];
            soc.game.count += unit
        }
        if (intervalCondition) {
            let dataToSend = [];
            for(let s in sockets){
                let data   = [];
                let soc    = sockets[s];
                data.id    = soc.id
                data.x     = soc.game.x;
                data.y     = soc.game.y;
                data.count = soc.game.count;
                data.timeOrigin = soc.game.timeOrigin;
                dataToSend.push(data);
            }
            //console.log(sockets);
            //dataToSend = JSON.stringify(dataToSend);
            console.log(dataToSend);
            server.emit("test!", dataToSend);
        };

        // if (server._rootTime % 100 === 0){
        //     server._sendTimeData(server._rootTime);
        // }
    };

    return server;
}
