module.exports = function(io) {
    io = require("./timerCount")(io);
    io = require("./dummySocket")(io);
    io._sockets = {}; //eanDebug setup socket io node modules
    const socketInit = require("./socketInit"); //eanDebug
    io._game = {count: 0};
    const updateRate = 1; //millesecond

    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket.id);
        socket = socketInit(socket, io); //eanDebug
        io._sockets[socket.id] = socket;
    });

    io.on("joinGame", (socket) => {
        let soc  = io._sockets[socket.id];
        io._initTimer(soc);
        soc.isReady = true;
        soc.x = 200;
        soc.y = 200;
    });

    io.on("checkIn", (socket) => {
        io._sockets[socket.id] = socket;
    });

    /**
    * This method updates a chosen socket with the state of the other sockets
    * @param {object} soc - The chosen socket to updates
    * @param {object} socList - Associative array containing relevant sockets
    */
    io._syncSocket = function(soc, socList) {
        for (let s in socList){
            let update = socList[s];
            soc.sockets[update.id] = update;
        }

        return soc;
    }

    io._createDummy();
    io._createDummy();
    //eanDebug decide the best way to start and store gameloop in a variable
    /**
     * @param {number} - ups: Updates Per Second
     * @returns {object} - interval
    */
    io._startGameLoop = (ups) => {
        return setInterval(() => {
            io._updateTimer(ups, io._sockets);
            //io.emit("gameUpdate", io._sockets);
        }, ups);
    };

    io._startGameLoop(updateRate);
}
