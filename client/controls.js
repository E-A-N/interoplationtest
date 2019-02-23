
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

const gameControls = (config, soc) => {
    //eanDebug: build a data model that simplifies setting up dynamic inputs
    let keyModel;
    const configExists = typeof config !== "undefined" && typeof config.keyModel !== "undefined";
    if (configExists){
        keyModel = config.keyModel;
    }
    else {
        keyModel = {
            //input : [keyCode, device]
            "up"    : [38, "w"],
            "down"  : [40, "s"],
            "left"  : [37, "a"],
            "right" : [39, "d"],
            "action": [70, "space"]
        }
    }
    let inputTypes = Object.keys(keyModel);
    const controls = {};

    controls.initKey = function(code){
        var key = {};
        key.code = code;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }

    controls.setupKeys = () => {
        for (let type in keyModel){
            let device = keyModel[type];
            controls[type + "Input"] = controls.initKey(device[0]);
        }
    }
    

    controls.checkInputs = (call) => {
        const data = {};
        let inputOccured = false;
        inputTypes.forEach( (device) => {
            if (controls[device].isDown){
                data[device] = true;
                inputOcurred = true;
            };
        });

        if (inputOccured && call){
            call(data);
        };

        return inputOccured;
    };

    return controls
}
