module.exports = (server, soc) => {
    soc.init = false;
    soc.game = {};

    soc.on("ean test!!", (clientData) => {
        soc.username = clientData.username;
        console.log("Username changed to:", clientData.username);
    });

    soc.on("join_game", (data) => {
        if (!soc.init){
            soc.type = data.type;
            soc.x = 0;
            soc.y = 0;
            soc.count = 0;
            soc.sockets = [];
            soc.init = true;
            //soc.join("eanDebug");
            //soc.emit("playerJoined");
        }
        else {
            console.log(soc.username, "is already in the game!");
        }
    });

    //eanDebug check if disconnect or disconnecting is proper built in api
    soc.on("disconnect", () => {
        console.log(soc.id + " has disconnected!!");
        if (server._sockets[soc.id]){
            delete server.sockets[soc.id];
        //find a way to make server remove the player from all other clients (sockets) eanDebug
        }
    })

    return soc;
}
