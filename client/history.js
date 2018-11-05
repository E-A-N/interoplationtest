const clientHistory = (cli) => {

    var momentSchema = {
        time: 11332423230,
        state: 2,
        delta: {
            time: 0,
            position: 0
        },
        inputs: {},
        position: {}
    };
    var hist = {};
    hist.moments = [];
    hist.removeOld = function(){
        hist.moments.shift();
    };
    hist.storeMoment = function(moment){
        hist.moments.push(moment);
    }
    return hist;

}
