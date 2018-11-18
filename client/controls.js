
//Be sure to only define keys once, otherwise memory leak will occur!

const userController = (self, config) => {
    const soc = config.socket; 
    const myInput = {};

    self.initKeys = () => {

    }

}
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
        data.leftInput = true;
        inputOccured = true
    };

    if (key.rightInput.isDown){
        data.rightInput = true;
        inputOccured = true
    };

    if (key.upInput.isDown){
        data.upInput = true;
        inputOccured = true
    };

    if (key.downInput.isDown){
        data.downInput = true;
        inputOccured = true
    };

    if (inputOccured){
        soc.emit("socketUpdate", data);
    }
}
