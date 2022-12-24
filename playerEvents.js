const { EmbedBuilder } = require('discord.js')

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
    queue.metadata.send({content: `The queue has ended, disconnecting from the voice channel.`});
});

client.player.on('trackAdd', (queue, track) => {
    queue.metadata.send({content: `**${track.title}** has been added to the queue !`});
});

client.player.on('trackEnd', (queue, track) => {

});

client.player.on('trackStart', (queue, track) => {
    const embed = new EmbedBuilder()
        .setColor(0x000000 + Math.floor(Math.random() * 16777215))
        .setTitle(':musical_note:\u0009Now playing')
        .setDescription(track.title)
        .setThumbnail(track.thumbnail)
        .setFields(
            {name: 'Author', value: `\`${track.author}\``, inline: true},
            {name: 'Duration', value: `\`${track.duration}\``, inline: true}
        )
        .setFooter({text: `Requested by ${track.requestedBy.tag}`, iconURL: track.requestedBy.avatarURL({extension: 'png'})});
    queue.metadata.send({embeds: [embed]});
});

client.player.on('tracksAdd', (queue, tack) => {

});