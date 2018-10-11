module.exports = (server, config) => {
    return (socket) => {
        let soc  = server._sockets[socket.id];
        if (server._hasTimerLogic){
            server._initTimer(soc);
        }
        else {
            console.log("Server has no timer logic!");
        }
        soc.isReady = true;
        soc.x = 200;
        soc.y = 200;
    }
}
