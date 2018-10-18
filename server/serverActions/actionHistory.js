//This should always be the very last update function to be called
module.exports = (server) => {
    const actionLimit = 10;
    server._initHistory = (socket) => {
        socket._actionQue = [];
        return socket;
    };

    server._appendToMomentInHistory = (que, data) => {
        que.push(data);

        return que;
    };

    server._getMomentInHistory(que, call) => {
        if (que.length > 0) {
            const moment = que.shift();
            call(moment);
            return moment;
        }
        return -1;
    };

    server._serveActionPosition = () => {
        const num = server._timePosition;
        const atActionLimit = server._timePostion > server._actionLimit;
        if (atActionLimit){
            server._timePosition = 0;
        }


    }

}
