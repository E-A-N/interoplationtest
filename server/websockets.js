module.exports = function(io) {
    io._sockets = {}; //eanDebug setup socket io node modules
    const socketInit = require("./socketInit"); //eanDebug
    io._game = {count: 0};
    const updateRate = 1000; //millesecond
    //const timerLogic = require("timerCount")(io);
    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket.id);
        socket = socketInit(socket, io); //eanDebug
        io._sockets[socket.id] = socket;
    });

    io.on("joinGame", (socket) => {
        var soc  = io._sockets[socket.id]
        soc.isReady = true;
        soc.x = 200;
        soc.y = 200;

    });

    io.on("checkIn", (socket) => {
        io._sockets[socket.id] = socket;
    });

    setInterval(() => {
        io._sockets = io._sockets.map( (s) => {
            s.x = 200;
            s.y = 200;
            s.count = 0;
        })
        io.emit("gameUpdate", io._sockets);
    }, updateRate);


}
