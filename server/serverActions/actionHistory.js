module.exports = (server) => {
    const actionLimit = 10;
    server._initSocketHistory = (socket) => {
        socket.game.historyQue = [];
        socket.game.presentAction = {};
        return socket;
    };

    server._appendToSocketMomentInHistory = (que, data) => {
        if (que.length > 10){
            que.shift();
        }
        que.push(data);

        return que;
    };

    server._getSocketHistory = (socket, que, call) => {
        if (que.length > 0) {
            const moment = que.shift();
            call(moment);
            return moment;
        }
        return -1;
    };

    server._setSocketPresentAction = (soc) => {
        if (soc.game.historyQue.length > 0){
            soc.game.presentAction = soc.game.historyQue.shift();
        }

        return soc;
    }

}
