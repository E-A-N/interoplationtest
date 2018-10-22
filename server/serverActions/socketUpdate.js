module.exports = (socket) => {

    socket.on("socketUpdate", (data) => {
        const deltaPacket = Object.keys(data);

        for (let i in data){
            //eanDebug check to make sure data attibutes exist in game
            socket.game[i] = data[i];
        }

        console.log("recieved update:", data);
    });

    return socket
}
