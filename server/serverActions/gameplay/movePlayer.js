module.export = (sockets) => {

    for (let s in sockets){
        let soc = sockets[s];
        let hspd = soc.game.hspd;
        let vspd = soc.game.vspd;
        let vx   = 0;
        let vy   = 0;

        //stop moving if there's no input;
        soc.game.x = 0;
        soc.game.y = 0;

        //check for inputs
        if (soc.game.leftInput){
            vx += -hspd;
        }

        if (soc.game.rightInput){
            vx += hspd;
        }

        if (soc.game.upInput){
            vy += vspd;
        }

        if (soc.game.downInput){
            vy += -vspd;
        }

        //add any velocity to sockets position
        soc.game.x += vx;
        soc.game.y += vy;
    }
    return sockets;
}
