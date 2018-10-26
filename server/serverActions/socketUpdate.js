module.exports = (socket) => {

    socket.on("socketUpdate", (data) => {
        for (let i in data){
            socket.game[i] = data[i];
        }
    });

    return socket
}
