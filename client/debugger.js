const debugArea = (parent, size) => {
    parent = typeof parent === "string" ? document.getElementById(parent) : parent;
    const debug = {};
    const ta = document.createElement("textarea");
    ta.setAttribute("rows", size);
    ta.setAttribute("cols", 50);
    ta.setAttribute("id", "serverDebug");
    ta.setAttribute("placeholder", "Server Debug Area");
    ta.setAttribute("readOnly", true);
    parent.appendChild(ta);

    debug.node = ta;
    debug.showInfo = (data) => {
        const textRows = Object.keys(data);
        const newSize = textRows.length;
        let textBlob = "";
        ta.setAttribute("rows", newSize);
        textRows.forEach((key) => {
            let msg = key +" = "+ data[key];
            textBlob += msg;
            textBlob = textBlob + "\n"
        });

        ta.value = textBlob;
    };

    return debug;
};

// Example Implementation
// const data = {f:"Frost",p:"Pookie!",e:"Eddie!",ey: "Eddy!"};
// const debugText = debugArea(document.body, 5);
// debutText.showInfo(data);
