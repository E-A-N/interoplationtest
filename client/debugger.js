const clientDebugger = (cli) => {
    cli.debugReady = false;
    cli.debugDummyData =  {
        f:"Frost",
        p:"Pookie!",
        e:"Eddie!",
        ey: "Eddy!"
    };
    cli.debugNode   = false;
    cli.debugNodeID = "appCenter";
    cli.cliDebugInit = (parent, size) => {
        parent = typeof parent === "string" ? document.getElementById(parent) : parent;
        const textArea = document.createElement("textarea");
        textArea.setAttribute("rows", size);
        textArea.setAttribute("cols", 50);
        textArea.setAttribute("id", "serverDebug");
        textArea.setAttribute("placeholder", "Server Debug Area");
        textArea.setAttribute("readOnly", true);
        parent.appendChild(textArea);
        cli.debugNode  = textArea;
        cli.debugReady = true;

        return cli;
    };

    cli.checkDebug = (data) => {
        if (!cli.debugReady){
            return -1;
        }

        return cli.debugDisplay(data);
    }
    cli.debugDisplay = (data) => {
        //old version of showInfo()
        const textRows = Object.keys(data);
        const newSize = textRows.length;
        let textBlob = "";
        cli.debugNode.setAttribute("rows", newSize);

        textRows.forEach((key) => {
            let msg = key +" = "+ data[key];
            textBlob += msg;
            textBlob = textBlob + "\n"
        });

        cli.debugNode.value = textBlob;
        return cli;
    }

    cli.cliDebugDisplay = (data) => {
        cli.debugNode.parentNode.removeChild(cli.dedebugNode);
        cli.debugNode = -1;
        cli.debugRead = false;

        return cli;
    }

    //Render the debugger immediately
    cli.cliDebugInit(cli.debugNodeID, 1);
    return cli;
}
