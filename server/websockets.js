/**
*    @param {socketServer} io - Reference to the webserver that is hosting the application and controlling sockets
*/
module.exports = function(io) {
    io = require("./timerCount")(io);
    io = require("./dummySocket")(io);
    io._sockets = {}; //eanDebug setup socket io node modules
    io._game = {count: 0};
    const updateRate = 1; //millesecond

    const onConnection = require("./serverActions/onConnection")(io);
    const onDisconnect = require("./serverActions/onDisconnect")(io);
    const onJoinGame   = require("./serverActions/onJoinGame")(io);
    const syncSocket   = require("./serverActions/syncSockets")(io);
    io._initPlayer     = require("./serverActions/gameplay/initPlayer");
    io._movePlayer     = require("./serverActions/gameplay/movePlayer");
    //const socketUpdate = require("./serverActions/socketUpdate")(io);
    //const history      = require("./serverActions/actionHistory")(io);
    io._clientUpdate   = require("./serverActions/clientUpdate");


    //When a new user connects
    io.on("connection", onConnection);

    //When a user disconnects/exits the server
    io.on("disconnecting", onDisconnect);

    //When user is ready to join the game
    io.on("joinGame", onJoinGame);

    const updateGameLoop = (dataSend) => {
        let sockets = io._sockets;
        sockets     = io._updateTimer(updateRate, sockets);
        sockets     = io._movePlayer(io._sockets);
        //io.updateActionHistory(io.sockets);
        for (let s in sockets) {
            let soc = sockets[s];
            io._syncSockets(sockets);
        }
        let timeToUpdateClient = io._rootTime % 3000 === 0 && Object.keys(sockets).length > 0;

        if (timeToUpdateClient){
            let clientData = io._clientUpdate(io, sockets);
            console.log(clientData);
            io.emit("gameUpdate", clientData);
        }

    }
     io._createDummy(onConnection);
    //eanDebug decide the best way to start and store gameloop in a variable
    /**
     * @param {number} - ups: Updates Per Second
     * @returns {object} - interval
    */
    io._startGameLoop = (ups) => {

        return setInterval(updateGameLoop, ups);
    };

    //eanDebug run this somewhere else at a place that accepts command line arguments
    io._startGameLoop(updateRate);
}
