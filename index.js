const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { JSON_Guilds } = require("./JSON_Object");
const obj = new JSON_Guilds("guilds.json");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({ intents: [ Guilds, GuildMembers, GuildMessages ],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.commands = new Collection();

/*const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}*/

var canvas = Canvas.createCanvas(1024, 500);
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";

Canvas.loadImage("./img/default.png")
    .then(async (img) => {
        ctx.drawImage(img, 0, 0, 1024, 500);
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
        ctx.fillStyle = "#000000";
        ctx.fillRect(30, 30, 964, 440);
        ctx.closePath();
        ctx.globalAlpha = 1.0;
        ctx.stroke();
        ctx.fill();
    });

client.login(client.config.token)
    .then(() => console.log("Connected"))
    .catch((error) => console.log("Error : " + error));