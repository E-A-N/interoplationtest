
module.exports = (server) => {
    /**
    * This method updates a chosen socket with the state of the other sockets
    * @param {object} soc - The chosen socket to updates
    * @param {object} socList - Associative array containing relevant sockets
    */
    server._syncSockets = function(soc, serverSockets){
        for (let mainSocket in serverSockets){
            let updateThisSocket = serverSockets[mainSocket];
            for (let s in serverSockets){
                let update = serverSockets[s];
                updateThisSocket.game.sockets[update.id] = update;
            }
        }
        return serverSockets;
    }

    return server
}
