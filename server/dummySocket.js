module.exports = (server) => {

    server._createDummy = function(call){
        const soc = {
            id: Math.random().toString(),
            x: 0,
            y: 0,
            count: 0,
            sockets: [],
            init: true,
            isDummy: true
        };
        //server._sockets[soc.id] = soc;
        if (call){
            call(soc);
        }
        return soc;
    };

    return server;
};
