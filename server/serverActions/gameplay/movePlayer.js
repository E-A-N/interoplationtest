module.exports = (sockets) => {

    for (let s in sockets){
        let soc = sockets[s];
        let hspd = soc.game.hspd;
        let vspd = soc.game.vspd;
        let vx   = 0;
        let vy   = 0;

        //check for inputs
        if (soc.game.leftInput){
            vx += -hspd;
        }

        if (soc.game.rightInput){
            vx += hspd;
        }

        if (soc.game.upInput){
            vy += -vspd;
        }

        if (soc.game.downInput){
            vy += vspd;
        }


        //add any velocity to sockets position
        soc.game.x += vx;
        soc.game.y += vy;

        //reset inputs so they aren't continuous when
        soc.game.leftInput = false;
        soc.game.rightInput = false;
        soc.game.upInput = false;
        soc.game.downInput = false;
    }
    return sockets;
}
