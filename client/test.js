const cliSetup = ()) => {
    socket = io("http://127.0.0.1:7777");
    clients = {};
    socket.on("joinGame", (data) => {
        Object.keys(data).forEach((cli) => {
            clients[cli.id] = cli;
        });
    }
}

const ready = () => {
    const msg = document.getElementById("msgWin");
    msg.innerHTML = "You\'re connecting!";
    console.log("Player is readyyyy!!");

    socket.emit("ready", {id:77})
};

window.onload = () => {

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

    gameArea.appendChild(can)
    setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        let tex = "Hey, num is: " + num++;
        const count1 = ctx.fillText(tex, c1x, c1y);



    },500);
};
