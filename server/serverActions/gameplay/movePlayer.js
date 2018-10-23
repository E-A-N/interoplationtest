module.export = (socket) => {
    const ox = socket.game.x;
    const oy = socket.game.y;
    var vspd = socket.game.vspd;
    var hspd = socket.game.hspd;

    //stop moving if there's no input;
    socket.game.x = 0;
    socket.game.y = 0;

    //check for inputs
    if (socket.game.leftInput){
        socket.game.x += -hspd;
    }

    if (socket.game.rightInput){
        socket.game.x += -hspd;
    }

    if (socket.game.upInput){
        socket.game.y += -vspd;
    }

    if (socket.game.downInput){
        socket.game.y += vspd;
    }
}
