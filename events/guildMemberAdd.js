const { Events } = require("discord.js");

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