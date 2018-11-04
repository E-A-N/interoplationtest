const debugArea = (parent, size) => {
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
        const newSize = Object.keys(data).length;
        ta.setAttribute("rows", newSize);
        ta.value = "hey arnold!!";
        ta.visible = false;
    };
  
    return debug;
};

const data = {f:"Frost",p:"Pookie!",e:"Eddie!",ey: "Eddy!"};
const debugText = debugArea(document.body, 5);
debutText.showInfo(data);
