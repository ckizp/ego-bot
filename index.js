const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const Canvas = require("canvas");
const { token } = require("./config.json");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
]
});

var canvas = Canvas.createCanvas(1024, 500);
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";

Canvas.loadImage("blue-lock.png")
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

client.on("ready", async () => {
    await client.application.commands.set([
        {
            name: "serverinfos",
            description: "display server informations"
        }
    ]);
}); 

var toggle = false;

client.on("interactionCreate", (interaction) => {
    let interactionChannel = interaction.channel;
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
        case "serverinfos":
            /*let serverInfoEmbed = new EmbedBuilder()
            .setTitle(`Informations sur le serveur ${interaction.guild.cache.name}`)*/
            interactionChannel.send(`${interaction.channel}`);
        break;
        default:
            return;
    }
    interaction.deleteReply();
});

client.on("messageCreate", (message) => {
    if (message.content === "test")
        message.reply("#750");
});

client.on("guildMemberAdd", async (member) => {
    if (member.guild.id != "740468305655103580") return;
    const welcomeChannel = client.channels.cache.get("1045427228290338887");
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