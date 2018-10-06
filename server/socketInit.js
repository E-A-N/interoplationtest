module.exports = (soc, server) => {
    soc.init = false;
    soc.game = {};

    soc.on("ean test!!", (clientData) => {
        soc.username = clientData.username;
        console.log("Username changed to:", clientData.username);
    });

    soc.on("join_game", (data) => {
        if (!soc.init){
            soc.game.type = data.type;
            soc.game.x = 250;
            soc.game.y = 250;
            soc.game.counter = 0;
            soc.join("eanDebug");
            soc.emit("playerJoined");
        }
        else {
            console.log(soc.username, "is already in the game!");
        }
    });

    //eanDebug check if disconnect or disconnecting is proper built in api
    soc.on("disconnect", () => {
        console.log(soc.id + " has disconnected!!");
        if (server.sockets[soc.id]){
            delete server.sockets[soc.id];
        //find a way to make server remove the player from all other clients (sockets) eanDebug
        }
    })

    return soc;
}
