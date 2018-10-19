
//Be sure to only define keys once, otherwise memory leak will occur!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);
k.fInput = keyboard(70);

const sendInput = (soc, key) => {
    if (key.leftInput){
        soc.emit("socketUpdate", "frosty");
    }
}
