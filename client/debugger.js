const debugArea = (parent, size) => {
    parent = typeof parent === "string" ? document.getElementById(parent) : parent;
    const debug = {};
    const textArea = document.createElement("textarea");
    textArea.setAttribute("rows", size);
    textArea.setAttribute("cols", 50);
    textArea.setAttribute("id", "serverDebug");
    textArea.setAttribute("placeholder", "Server Debug Area");
    textArea.setAttribute("readOnly", true);
    parent.appendChild(textArea);

    debug.node = textArea;
    debug.showInfo = (data) => {
        const textRows = Object.keys(data);
        const newSize = textRows.length;
        let textBlob = "";
        textArea.setAttribute("rows", newSize);
        textRows.forEach((key) => {
            let msg = key +" = "+ data[key];
            textBlob += msg;
            textBlob = textBlob + "\n"
        });

        textArea.value = textBlob;
    };

    return debug;
};

// Example Implementation
// const data = {f:"Frost",p:"Pookie!",e:"Eddie!",ey: "Eddy!"};
// const debugText = debugArea(document.body, 5);
// debutText.showInfo(data);
