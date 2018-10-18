
module.exports = (server) => {
    /**
    * This method updates a chosen socket with the state of the other sockets
    * @param {object} soc - The chosen socket to updates
    * @param {object} socList - Associative array containing relevant sockets
    */
    server._syncSocket = function(soc, socList){
        for (let s in socList){
            let update = socList[s];
            soc.game.sockets[update.id] = update;
        }
        return soc;
    }

    return server
}
