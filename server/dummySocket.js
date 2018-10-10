module.exports = (server) => {
    server._createDummy = function(){
        const soc = {
            id: Math.random().toString(),
            x: 0,
            y: 0,
        }

        return soc;
    }
    server.syncSocket = function(soc, socList) {
        socList.forEach( (s) => {
            soc.sockets[s.id] = s;
        });
    }
    server._dummyConnection = function(soc){
        server._sockets[soc.id] = soc;
    }
}
