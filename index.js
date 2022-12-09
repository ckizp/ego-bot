const { Client, GatewayIntentBits, Events, AttachmentBuilder} = require("discord.js");
const { JSON_Guilds } = require("./JSON_Object");
const { token, author_id } = require("./config.json")
const Canvas = require("canvas");
const fs = require("fs")

const obj = new JSON_Guilds("guilds.json");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
]
});

client.on(Events.ClientReady, async () => {
    client.guilds.cache.map((guild) => obj.addGuild(guild.id));
    //console.log(JSON.parse(fs.readFileSync("commands.json")).commands);
}); 

var canvas = Canvas.createCanvas(1024, 500);
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";

Canvas.loadImage("default.png")
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

client.login(token)
    .then(() => console.log("Connected"))
    .catch((error) => console.log("Error : " + error));

client.on(Events.GuildCreate, (guild) => {
    obj.addServer(guild.id);
})

client.on(Events.InteractionCreate, (interaction) => {
    let interactionChannel = interaction.channel;
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
        case "serverinfos":
            /*let serverInfoEmbed = new EmbedBuilder()
            .setTitle(`Informations sur le serveur ${interaction.guild.cache.name}`)*/
            //interaction.channel.send(client.guilds.cache.map(m => `${m.name} | ${m.id}`).join("\n"))
        break;
        default:
            return;
    }
    interaction.deleteReply();
});

client.on(Events.MessageCreate, (message) => {
    if (message.content === "test")
        message.reply("#750");
});

client.on(Events.GuildMemberAdd, async (member) => {
    if (obj.getPropertyValue(member.guild.id, "welcomeChannelID") === null) return;
    if (!member.guild.channels.cache.map((channel) => channel.id).includes(obj.getPropertyValue(member.guild.id, "welcomeChannelID"))) {
        obj.alter(member.guild.id, "welcomeChannelID", null); return;
    }

    const welcomeChannel = client.channels.cache.get(obj.getPropertyValue(member.guild.id, "welcomeChannelID"));
    let welcomeCanvas = canvas;

    welcomeCanvas.context.fillStyle = "#ffffff";
    welcomeCanvas.context.font = "42px sans-serif";
    welcomeCanvas.context.fillText(`Bienvenue ${member.user.tag.toUpperCase()}`, 512, 370);
    welcomeCanvas.context.font = "32px sans-serif"; 
    welcomeCanvas.context.fillText(`Membre #${member.guild.memberCount}`, 512, 420);
    await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'png' }))
    .then(async (img) => {
        welcomeCanvas.context.beginPath();
        welcomeCanvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
        welcomeCanvas.context.closePath();
        welcomeCanvas.context.clip();
        welcomeCanvas.context.stroke();
        welcomeCanvas.context.drawImage(img, 393, 47, 238, 238);
    });
    let attachment = new AttachmentBuilder(welcomeCanvas.toBuffer(), {name: `welcome-${member.id}.png`});
    try {
        welcomeChannel.send({content: `Bienvenue à ${member} sur le serveur ${member.guild.name} !`, files: [attachment]})
    } catch(error) {
        console.log(error);
    }
});