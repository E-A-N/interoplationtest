module.exports = (server) => {

    server._createDummy = function(call){
        const soc = {};
        //create fake id
        soc.id = Math.random().toString();
        //create random coordinates
        //atleast a tenth of whole at most 9 tenth of whole
        var randX = Math.ceil(Math.random() * 9);
        var randY = Math.ceil(Math.random() * 9);
        soc.game = {
            x: randX,
            y: randY,
            sockets: [],
            init: true,
            isDummy: true
        };

        if (call){
            call(soc);
        }
        return soc;
    };

    return server;
};
