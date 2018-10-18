// Called when we receive a player state update from the server. 
function OnServerFrame(serverFrame)
{
    // Remove frames from history until it's duration is equal to the latency.
    dt = Max(0, historyDuration - latency);
    historyDuration -= dt;
    while (history.Count > 0 && dt > 0)
    {
        if (dt >= history[0].DeltaTime)
        {
            dt -= history[0].DeltaTime;
            history.RemoveAt(0);
        }
        else
        {
            t = 1 - dt / history[0].DeltaTime;
            history[0].DeltaTime -= dt;
            history[0].DeltaPosition *= t;
            history[0].DeltaRotation *= t;
            break;
        }
    }

    serverState = serverFrame;

    // If predicted and server velocity difference exceeds the tolerance,
    // replay inputs. This is only needed if the
    // velocity for one frame depends on the velocity of the previous
    // frame. Depending on your game you may also need
    // to do this for angular velocity or other variables.
    if ((serverState.Velocity - history[0].Velocity).Magnitude >     
        velocityTolerance)
{
        predictedState = serverState;
        foreach (frame in history)
        {
            newState = playerController.Update(predictedState,
                frame.DeltaTime, frame.Input);
            frame.DeltaPosition = newState.Position - 
                predictedState.Position;
            frame.DeltaRotation = newState.Rotation - 
                predictedState.Rotation;
            frame.Velocity = newState.Velocity;
            predictedState = newState;
        }
    }
    else
    {
        // Add deltas from history to server state to get predicted state.
        predictedState.Position = serverState.Position;
        predictedState.Rotation = serverState.Rotation;
        foreach (frame in history)
        {
            predictedState.Position += history.DeltaPosition;
            predictedState.Rotation += history.DeltaRotation;
        }
    }
}

// Called every client frame.
function Update(deltaTime, input)
{
    // Run player controller to get new prediction and add to history
    newState = playerController.Update(predictedState, deltaTime, input);
    frame = new Frame(deltaTime, input);
    frame.DeltaPosition = newState.Position - predictedState.Position;
    frame.DeltaRotation = newState.Rotation - predictedState.Rotation;
    frame.Velocity = newState.Velocity;
    history.Add(frame);
    historyDuration += deltaTime;

    // Extrapolate predicted position
    // CONVERGE_MULTIPLIER is a constant. Lower values make the client converge with the server more aggressively.
    // We chose 0.05.
    rotationalVelocity = (newState.Rotation - predictedState.Rotation) /
        deltaTime;
    extrapolatedPosition = predictedState.Position + newState.Velocity *
        latency * CONVERGE_MULTIPLIER;
    extrapolatedRotation = predictedState.Rotation + rotationalVelocity *
        latency * CONVERGE_MULTIPLIER;

    // Interpolate client position towards extrapolated position
    t = deltaTime / (latency * (1 + CONVERGE_MULTIPLIER));
    clientState.Position = (extrapolatedPosition - clientState.Position) *
        t;
    clientState.Rotation = (extrapolatedRotation - clientState.Rotation) *
        t;

    predictedState = newState;
}
