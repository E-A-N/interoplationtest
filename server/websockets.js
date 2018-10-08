module.exports = function(io) {
    io = require("./timerCount")(io);
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
        var soc  = io._sockets[socket.id]
        soc.isReady = true;
        soc.x = 200;
        soc.y = 200;

    });

    io.on("checkIn", (socket) => {
        io._sockets[socket.id] = socket;
    });

    io._sockets["eID"] = {
        id: "eID",
        x: 0,
        y: 0,
        count: 0
    }

    //eanDebug decide the best way to start and store gameloopo in a variable
    io._startGameLoop = (fps) => {
        return setInterval(() => {
            io._updateTimer(10, io._sockets);
            // io._sockets = io._sockets.map( (s) => {
            //     s.x = 200;
            //     s.y = 200;
            //     s.count = 0;
            // })
            //io.emit("gameUpdate", io._sockets);
        }, fps);
    };

    io._startGameLoop(updateRate);
}
