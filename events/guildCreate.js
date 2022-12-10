const { Events } = require("discord.js");

client.on(Events.GuildCreate, (guild) => {
    obj.addServer(guild.id);
})
