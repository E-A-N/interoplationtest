module.exports = (server, sockets, call) => {
    const dataToSend = [];
    for (let s in sockets){
        let data   = {};
        let soc    = sockets[s].presentAction || sockets[s];
        data.id    = soc.id
        data.x     = soc.game.x;
        data.y     = soc.game.y;
        data.count = soc.game.count;
        data.timeOrigin = soc.game.timeOrigin;
        data.init  = soc.game.init;
        dataToSend.push(data);
    }

    if (call) call;
    server.emit("update", dataToSend);
}
