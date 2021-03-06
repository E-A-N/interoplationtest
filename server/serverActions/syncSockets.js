
module.exports = (server) => {
    /**
    * This method updates a chosen socket with the state of the other sockets
    * @param {object} serverSockets - Associative array containing relevant sockets
    */
    server._syncSockets = function(serverSockets){
        for (let thisSocket in serverSockets){
            let updateThisSocket = serverSockets[thisSocket];
            for (let s in serverSockets){
                let update = serverSockets[s];
                updateThisSocket.game.sockets[update.id] = update;
            }
        }
        return serverSockets;
    }

    return server
}
