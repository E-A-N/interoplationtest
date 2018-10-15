module.exports = function(io) {
    io = require("./timerCount")(io);
    io = require("./dummySocket")(io);
    io._sockets = {}; //eanDebug setup socket io node modules
    io._game = {count: 0};
    const updateRate = 1; //millesecond

    const onConnection = require("./serverActions/onConnection")(io);
    const onDisconnect = require("./serverActions/onDisconnect")(io);
    const onJoinGame   = require("./serverActions/onJoinGame")(io);
    const syncSocket   = require("./serverActions/syncSocket");

    //When a new user connects
    io.on("connection", onConnection);

    //When a user disconnects/exits the server
    io.on("disconnecting", onDisconnect);

    //When user is ready to join the game
    io.on("joinGame", onJoinGame);

    // io._createDummy(onConnection);
    // io._createDummy(onConnection);
    // io._createDummy(onConnection);
    //eanDebug decide the best way to start and store gameloop in a variable
    /**
     * @param {number} - ups: Updates Per Second
     * @returns {object} - interval
    */
    io._startGameLoop = (ups) => {

        return setInterval(() => {
            io._updateTimer(ups, io._sockets);
            for (let s in io._sockets) {
                let soc = io._sockets[s];
                syncSocket(soc, io._sockets);
            }
            //io.emit("gameUpdate", io._sockets);
        }, ups);

    };

    io._startGameLoop(updateRate);
}
