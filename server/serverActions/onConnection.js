module.exports = (server, config) => {
    return (socket) => {
        console.log("New connection!!", socket.id);
        if (!socket.isDummy){
            socket = require("./clientInit")(socket);
        }
        socket = server._initTimer(socket);
        server._sockets[socket.id] = socket;
    }
}
