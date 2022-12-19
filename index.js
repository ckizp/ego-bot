const { Client, GatewayIntentBits, Collection, Partials, ActivityType } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({ intents: [ Guilds, GuildMembers, GuildMessages, GuildVoiceStates ],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
const { Player } = require('discord-player');
client.player = new Player(client);
const { registerPlayerEvents } = require('./playerEvents');
registerPlayerEvents(client.player);

const { loadEvents } = require('./handlers/eventHandler');
loadEvents(client);

client
    .login(client.config.token)
    .then(() => {
        console.log(`client logged in as ${client.user.username}`);
        client.user.setActivity(`${client.guilds.cache.size} guilds!`, {type: ActivityType.Watching})
    })
    .catch((error) => console.log("Error : " + error));

module.exports = {
    client
}