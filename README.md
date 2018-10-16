# interoplationtest
An app that demonstrates networking synchronization and server side prediction (via interpolation)


## How to add new data attributes for rendering
* Create the basic attribute in a clientInit function or something corresponding to that.
    * This initialization should be called in the socket onConnection method
* Depending on what the data is, in can be computed in initialization
    * For example if it's the starting x/y coordinates that you want to be random, they can computed as soon as created in the initialization
    * As a counter example, you can wait until the client is ready to join the game and make the coordinates based on client information when the time comes ("onJoinGame" etc)
* If this is data (like rendering information) that's going to be shared with other clients, make sure the other client sockets receive the data in a syncing method (ex: "syncSocket()");
* The server update function should check for several steps before sending them to the client.
    * Compute the attributes
    * Check that they're synced
    * Check that they're read to be sent to clients
* The client should recieve the data in an "onUpate" kind of method
    * First the client should distribute the data to the appropriate local objects that correspond to other client sockets.
    * Initially the client should not handle it's own socket data uniquely.
* The client should not change the data attribute itself.
