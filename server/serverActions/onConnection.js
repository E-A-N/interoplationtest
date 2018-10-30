module.exports = (server, config) => {

    return (socket) => {
        console.log("New connection!!", socket.id);
        const authentic = typeof socket.game === "undefined";
        if (authentic){
            let getLatency = require("../tools/medianNumber");
            socket.game = require("./clientInit")(socket);
            socket.pings = [];
            socket.on("disconnecting", (data) => {
                console.log("Data is:", data);
                console.log(socket.id, "has disconnected after:",socket.game.count/100, "seconds!");
                server.emit("playerRemove", socket.id);
                delete server._sockets[socket.id];
            });
            socket.on("pong", (data) => {
                let delta = (Date.now()  - parseInt(data))/2;
                delta = delta < 0 ? 0 : latency;
                socket.pings.push(delta);
                if (socket.pings.length > 20) {
                    socket.pings.shift();
                    console.log(socket.pings);
                }
                latency = getLatency(delta);
            });

            socket = require("./socketUpdate")(socket);
        }
        socket = server._initTimer(socket);
        socket = server._initPlayer(socket);
        //socket = server._initSocketHistory(socket);
        server._sockets[socket.id] = socket;
        return socket;
    }
}
