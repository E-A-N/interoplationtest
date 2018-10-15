module.exports = (server) => {
    /**
     *    @param {function} call - A callback function that executes right before the fake socketdata is added to game
     */
    server._createDummy = function(call){
        const soc = {};
        //create fake id
        soc.id = Math.random().toString();
        //create random coordinates
        //atleast a tenth of whole at most 9 tenth of whole
        var randX = Math.ceil(Math.random() * 9)/10;
        var randY = Math.ceil(Math.random() * 9)/10;
        console.log(randX, randY);
        soc.game = {
            x: randX,
            y: randY,
            sockets: [],
            init: true,
        };

        if (call){
            call(soc);
        }
        return soc;
    };

    return server;
};
