client.player.on('botDisconnect', (queue) => {

});

client.player.on('channelEmpty', (queue) => {

});

client.player.on('connectionCreate', (queue, connection) => {

});

client.player.on('connectionError', (queue, error) => {

});

client.player.on('debug', (queue, message) => {
    
});

client.player.on('error', (queue, error) => {

});

client.player.on('queueEnd', (queue) => {
    queue.metadata.send({content: `Nothing to play `});
});

client.player.on('trackAdd', (queue, track) => {
    queue.metadata.send({content: `The song '${track.title}' has been added to the queue !`});
});

client.player.on('trackEnd', (queue, track) => {

});

client.player.on('trackStart', (queue, track) => {

});

client.player.on('tracksAdd', (queue, tack) => {

});