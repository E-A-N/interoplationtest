module.exports = (server, config) => {
    return (socket) => {
        console.log("New connection!!", socket.id);
        if (!socket.isDummy){
            socket = require("./clientInit")(socket);
            socket.on("disconnect", () => {
                console.log("getting rid of socket:", socket.id);
                delete server._sockets[socket.id];
            });
        }
        socket = server._initTimer(socket);
        server._sockets[socket.id] = socket;
    }
}
