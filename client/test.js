
window.onload = () => {
    const msg = document.getElementById("msgWin");
    const gameArea = document.getElementById("gameContainer");
    const can = document.createElement("canvas");
    const ctx = can.getContext("2d");
    let num = 0;
    can.height = 500;
    can.width  = 500;

    const count1 = ctx.fillText("Hey", can.width/2, can.height/2);



    gameArea.appendChild(can)

    setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        let tex = "Hey, num is: " + num++;
        const count1 = ctx.fillText(tex, can.width * 0.25, can.height * 0.25);
    },500)
}
