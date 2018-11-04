module.exports = (server, config) => {
    const getLatency = require("../tools/medianNumber");

    return (socket) => {
        console.log("New connection!!", socket.id);
        const authentic = typeof socket.game === "undefined";

        if (authentic){
            socket.game = require("./clientInit")(socket);
            socket.pings = [];
            socket.on("disconnecting", (data) => {
                console.log("Data is:", data);
                console.log(socket.id, "has disconnected after:",socket.game.count/100, "seconds!");
                server.emit("playerRemove", socket.id);
                delete server._sockets[socket.id];
            });
            socket.on("gamePong", (data) => {
                let delta = (Date.now()  - parseInt(data))/2;
                delta = delta < 0 ? 0 : delta;
                socket.pings.push(delta);
                if (socket.pings.length > 20) {
                    socket.pings.shift();
                }
                socket.game.latency = getLatency(socket.pings);
            });

            //eanDebug comment out the below line when trying to play game with out debugging
            server.emit("debugGame", 1);
            socket = require("./socketUpdate")(socket);
        }
        socket = server._initTimer(socket);
        socket = server._initPlayer(socket);
        //socket = server._initSocketHistory(socket);
        server._sockets[socket.id] = socket;
        return socket;
    }
}
