socket = null;
const cliSetup = function() {
    //eanDebug check to see if client is connected 1st and make sure to discontinue previous connection
    //const addy = "http://127.0.0.1:7777"; eanDebug
    const addy = "http://0.0.0.0:7777";
    socket = io(addy);
    socket._clients = {};
    return socket;
};

const ready = (socket) => {
    if (!socket){
        socket = cliSetup();
    }
    const msg = document.getElementById("msgWin");
    msg.innerHTML = "You\'re connecting!";
    console.log("Player is readyyyy!!");

    socket.emit("joinGame", {id:77});
};

const renderClients = (socket, can, ctx) => {
    var clients = socket._clients;
    for (let cli in clients) {
        cli = clients[cli];
        var name = cli.id;
        if (cli.dummy){
            var x = cli.x * can.width;
            var y = cli.y * can.height;
        }
        else {
            var x = cli.x;
            var y = cli.y;
        }
        ctx.fillText(name, x, y - 15);
        ctx.fillText(cli.count, x, y);
    }
}

const renderStart = (socket, can, ctx) => {
    sendInput(socket, k);
    ctx.clearRect(0, 0, can.width, can.height);
    renderClients(socket, can, ctx);
};

window.onload = () => {
    var socket = cliSetup();

    const msg = document.getElementById("msgWin");
    const gameArea = document.getElementById("gameContainer");
    const can = document.createElement("canvas");
    const ctx = can.getContext("2d");
    let num = 0;
    can.height = 500;
    can.width  = 500;

    gameArea.appendChild(can);

    socket.on("playerRemove", (data) =>{
        delete socket._clients[data];
        console.log("Removed player:", data);
    });

    socket.on("gameUpdate", (data) => {
        var clients = socket._clients;
        data.forEach((i) => {
            clients[i.id] = i;
        });
        renderStart(socket, can, ctx);
    });

    socket.on("renderStart", (data) => {
        setInterval(function(){
            let connectionIsReady = clients[socket.id].init
            if (connectionIsReady) {
                renderStart(socket, can, ctx);
            }
        },100);
    });
}
