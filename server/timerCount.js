module.exports = (server) => {
    server._hasTimerLogic = true;
    server._rootTime = 0;
    server._timeSignal = 100; // 0.1 seconds

    /**
    *   @param {socket} socket - A reference to a client who just connected to the server and is getting their data setup
    */
    server._initTimer = (socket) => {
        socket.game.count = 0;
        socket.game.timeOrigin = server._rootTime; //label birth time of socket
        console.log(socket.id, "timer has been inited at:", socket.game.timeOrigin)
        return socket;
    };

    /**
    *   @param {number} unit - The amount to increment the players number count by
    *   @param {array} sockets - A collection of sockets (players) that currently connected to the game
    */
    server._updateTimer = (unit, sockets) => {
        server._rootTime += unit;
        const intervalCondition = server._rootTime % 100 === 0 && Object.keys(sockets).length > 0;

        for (let t in sockets){
            var soc = sockets[t];
            soc.game.count += unit
        }

        return sockets;
    };

    return server;
}
