module.exports = (server) => {

    server._createDummy = function(){
        const soc = {
            id: Math.random().toString(),
            x: 0,
            y: 0,
            count: 0,
            sockets: [],
            info: "dummy socket!"
        };
        server._sockets[soc.id] = soc;
        return soc;
    };

    server._dummyConnection = function(soc){
        server._sockets[soc.id] = soc;
    }

    return server;
};
