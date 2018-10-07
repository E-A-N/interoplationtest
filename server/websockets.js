module.exports = function(io) {
    io._sockets = {}; //eanDebug setup socket io node modules
    const socketInit = require("./socketInit"); //eanDebug
    io._game = {count: 0};
    const updateRate = 1000; //millesecond

    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket.id);
        socket = socketInit(socket, io); //eanDebug
        io._sockets[socket.id] = socket;
    });

    io.on("joinGame", (socket) => {
        io._sockets[socket.id].isReady = socket.isReady;
    });

    io.on("checkIn" (socket) => {
        io._sockets[socket.id] = socket;
    });

    // setInterval(() => {
    //     io.emit("gameUpdate", io._sockets);
    // }, updateRate);


}
