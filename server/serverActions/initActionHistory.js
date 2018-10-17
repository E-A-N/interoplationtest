//This should always be the very last update function to be called
module.exports = (socket) => {

    socket.actionQue = [];
    socket.queLimit  =  10;
    return socket;
}
