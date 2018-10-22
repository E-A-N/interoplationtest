
//Be sure to only define keys once, otherwise memory leak will occur!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);
k.fInput = keyboard(70);

const sendInput = (soc, key) => {
    var data = {};
    var inputOccured = false;

    if (key.leftInput.isDown){
        console.log("socket update sent!");
        data.leftInput = true;
        inputOccured = true
    };

    if (inputOccured){
        soc.emit("socketUpdate", data);
    }
}
