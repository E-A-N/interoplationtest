# interoplationtest
An app that demonstrates networking synchronization and server side prediction (via interpolation)


## How to add new data attributes for rendering
* Create the basic attribute in a clientInit function or something corresponding to that.
    * This initialization should be called in the socket onConnection method
* Depending on what the data is, in can be computed in the initialization
    * For example if it's the starting x/y coordinates and you want to randomize them, they should be computed as soon as they're created in the initialization
    * As a counter example, you can wait until the client is ready to join the game and make the coordinates based on client information when the time comes to emit data to the server ("onJoinGame" etc)
* If this is data (like rendering information) that's going to be shared with other clients, make sure the other client sockets receive the data in a syncing method (example: (syncSockets.js)[https://github.com/E-A-N/interoplationtest/blob/master/server/serverActions/syncSockets.js] );
* The server update function should check for several steps before sending them to the client.
    * Compute the attributes
    * Check that they're synced
    * Check that they're ready to be sent to clients
* The client should recieve the data in an "onUpate" kind of method
    * First the client should distribute the data to the appropriate local objects that correspond to other client sockets.
    * Initially the client should not handle it's own socket data uniquely.
* The client should not change the data attribute itself OR ANY data attributes that aren't purely input based
