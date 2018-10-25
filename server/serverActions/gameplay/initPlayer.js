module.exports = (socket) => {

    socket.game.hspd = 1;
    socket.game.vspd = 1;
    socket.game.vx = 0;
    socket.game.vy = 0;
    return socket;
};
