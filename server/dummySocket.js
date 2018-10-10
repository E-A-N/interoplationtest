module.exports = (server) => {
    server._createDummy = function(){
        const soc = {
            id: Math.random().toString(),
            x: 0,
            y: 0,
            info: "dummy socket!"
        }

        return soc;
    }
    server._dummyConnection = function(soc){
        server._sockets[soc.id] = soc;
    }
}
