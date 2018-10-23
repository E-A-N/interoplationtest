module.export = (socket) => {
    var hspd = socket.game.hspd;
    var vspd = socket.game.vspd;
    var vx   = 0;
    var vy   = 0;

    //stop moving if there's no input;
    socket.game.x = 0;
    socket.game.y = 0;

    //check for inputs
    if (socket.game.leftInput){
        vx += -hspd;
    }

    if (socket.game.rightInput){
        vx += hspd;
    }

    if (socket.game.upInput){
        vy += vspd;
    }

    if (socket.game.downInput){
        vy += -vspd;
    }

    //add any velocity to sockets position
    socket.game.x += vx;
    socket.game.y += vy;

    return socket;
}
