const clientHistory = (cli) => {

    var momentSchema = {
        time: 11332423230,
        state: 2,
        deltaPosition: 0,
        deltaTime: 0,
        inputs: {}
    };
    var hist = {};
    hist.moments = [];
    hist.removeOldest = function(){
        hist.moments.shift();
    };
    hist.storeMoment = function(moment){
        hist.moments.push(moment);
    }
    return hist;

};
