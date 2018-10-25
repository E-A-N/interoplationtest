module.exports = (server, config) => {

    return (socket) => {
        console.log("New connection!!", socket.id);
        const authentic = typeof socket.game === "undefined";
        if (authentic){
            socket.game = require("./clientInit")(socket);
            socket.on("disconnecting", (data) => {
                console.log("Data is:", data);
                console.log(socket.id, "has disconnected after:",socket.game.count/100, "seconds!");
                server.emit("playerRemove", socket.id);
                delete server._sockets[socket.id];
            });
            socket = require("./socketUpdate")(socket);
        }
        socket = server._initTimer(socket);
        socket = server._initPlayer(socket);
        //socket = server._initSocketHistory(socket);
        server._sockets[socket.id] = socket;
        return socket;
    }
}
