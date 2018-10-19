module.exports = (io) => {

    io.on("socketUpdate", (data) => {
        let soc = io._sockets[data.id];
        soc.leftInput  = data.leftInput;
        soc.rightInput = data.rightInput;
        soc.upInput    = data.upInput;
        soc.downInput  = data.downInput;
    });

    return io;
}
