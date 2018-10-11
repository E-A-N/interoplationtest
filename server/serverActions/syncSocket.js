/**
* This method updates a chosen socket with the state of the other sockets
* @param {object} soc - The chosen socket to updates
* @param {object} socList - Associative array containing relevant sockets
*/
const sync =  (soc, socList) => {
    for (let s in socList){
        let update = socList[s];
        soc.game.sockets[update.id] = update;
    }
    return soc;
}

module.exports = sync;
