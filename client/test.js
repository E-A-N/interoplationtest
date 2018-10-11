socket = null;
const cliSetup = function() {
    socket = io("http://127.0.0.1:7777");
    socket._clients = {};
    return socket;
};

const ready = (socket) => {
    cliSetup();
    const msg = document.getElementById("msgWin");
    msg.innerHTML = "You\'re connecting!";
    console.log("Player is readyyyy!!");

    socket.emit("joinGame", {id:77})
};

const renderClients = (socket, can, ctx) => {
    var clients = socket._clients;
    for (let cli in clients){
        var name = cli.id;
        var x = cli.x * can.width;
        var y = cli.y * can.height;
        ctx.fillText(name, x, y - 15);
        ctx.fillText(cli.count, x, y);
    }
}

const gameStart = (socket, can, ctx) => {
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

    socket.on("update", (data) => {
        data.forEach((i) => {
            clients[i.id] = i;
            console.log(i);
        });
        console.log("data recieved!!");
        console.log(data);
    });

    socket.on("gameStart" (data) => {
        setInterval(function(){
            let connectionIsReady = clients[socket.id].init
            if (connectionIsReady) {
                gameStart(socket, can, ctx);
            }
        },100);
    });
}
