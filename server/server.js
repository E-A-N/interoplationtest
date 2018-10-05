module.exports = function(io){
    io.sockets = {}; //eanDebug setup socket io node modules
    const socketInit = require("socketInit");
    const config = require("config");

    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket, socket.id);
        socket = socketInit(socket, io, config);
    })
}
