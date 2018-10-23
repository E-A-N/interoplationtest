module.export = (socket) => {

    socket.game.hspd = 3;
    socket.game.vspd = 3;
    socket.game.vx = 0;
    socket.game.vy = 0;
    return socket;
}
