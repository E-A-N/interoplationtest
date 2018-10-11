module.exports = (server, config) => {
    return (socket) => {
        console.log("New connection!!", socket.id);
        if (!socket.isDummy){
            socket = require("./clientInit")(server, socket);
        }
        server._sockets[socket.id] = socket;
    }
}
