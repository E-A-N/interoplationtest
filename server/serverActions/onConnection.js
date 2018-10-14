module.exports = (server, config) => {

    return (socket) => {
        console.log("New connection!!", socket.id);
        const authentic = typeof socket.game === undefined;
        if (authentic){
            socket.game = require("./clientInit")(socket);
            console.log(socket.id, "is initialized in game!", server._sockets[socket.id]);
            socket.on("disconnecting", () => {
                console.log("getting rid of socket:", socket.id);
                delete server._sockets[socket.id];
            });
        }
        socket = server._initTimer(socket);
        server._sockets[socket.id] = socket;
    }
}
