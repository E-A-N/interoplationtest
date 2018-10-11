socket = null;
const cliSetup = function() {
    socket = io("http://127.0.0.1:7777");
    clients = {};
    socket.on("joinGame", (data) => {
        data.forEach( s =>  {
            clients[s.id] = s;
        });
    });
};

const ready = () => {
    cliSetup();
    const msg = document.getElementById("msgWin");
    msg.innerHTML = "You\'re connecting!";
    console.log("Player is readyyyy!!");

    socket.emit("joinGame", {id:77})
};

const renderClients = (clients, can, ctx) => {
    for (let cli in clients){
        var name = cli.id;
        var x = cli.x * can.width;
        var y = cli.y * can.height;
        ctx.fillText(name, x, y - 15);
        ctx.fillText(cli.count, x, y);
    }
}

window.onload = () => {
    cliSetup();
    const msg = document.getElementById("msgWin");
    const gameArea = document.getElementById("gameContainer");
    const can = document.createElement("canvas");
    const ctx = can.getContext("2d");
    let num = 0;
    can.height = 500;
    can.width  = 500;

    const count1 = ctx.fillText("Hey", can.width/2, can.height/2);
    const c1x = Math.floor(Math.random() * can.width);
    const c1y = Math.floor(Math.random() * can.height);

    gameArea.appendChild(can);
    socket.on("gameUpdate", (data) => {
        console.log(data);
        data.forEach((i) => {
            var cli = clients[i.id];
            ctx.fillText(cli.count, cli.x, cli.y);
        });
    });

    socket.on("test!", (data) => {
        data.forEach((i) => {
            clients[i.id] = i;
            console.log(i);
        });
        console.log("data recieved!!");
        console.log(data);
    });


    setInterval(function(){
        let connectionIsReady = clients[socket.id].init
        if (connectionIsReady) {
            ctx.clearRect(0, 0, can.width, can.height);
            renderClients(clients, can, ctx);
        }

    },100);
}
