module.exports = (soc) => {
    var randX = Math.ceil(Math.random() * 9)/10;
    var randY = Math.ceil(Math.random() * 9)/10;
    return {
        x: randX,
        y: randY,
        sockets: [],
        init: true,
    };
};
