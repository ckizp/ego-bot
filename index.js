const { Client, GatewayIntentBits, Collection, Partials, Events } = require('discord.js');
const { JSON_Guilds } = require('./JSON_Object');
const obj = new JSON_Guilds('guilds.json');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, ActivityType } = Partials;

const client = new Client({ intents: [ Guilds, GuildMembers, GuildMessages ],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

const { loadEvents } = require('./handlers/eventHandler');
loadEvents(client);

client
    .login(client.config.token)
    .then(() => {
        console.log(`client logged in as ${client.user.username}`);
        client.user.setActivity(`${client.guilds.cache.size} guilds!`, {type: ActivityType.Watching})
    })
    .catch((error) => console.log("Error : " + error));