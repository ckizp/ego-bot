const { Events, GuildMember, PermissionFlagsBits } = require("discord.js");
const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js')
const guild_model = require('../models/guild');

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * @param {GuildMember} member 
     */
    async execute(member) {
        const bot = member.guild.members.cache.get(member.client.application.id);
        const addons = (await guild_model.findOne({id: member.guild.id})).addons;

        if (addons.autonick.enabled) {
            if (bot.permissions.has(PermissionFlagsBits.ChangeNickname))
                member.setNickname(addons.autonick.nickname);
        }

        const role = member.guild.roles.cache.get(addons.autorole.role);
        if (!role) {
            await guild_model.updateOne({id: member.guild.id}, {
                "addons.autorole": {
                    enabled: false,
                    role: null
                }
            });
            addons.autorole.enabled = false;
        }

        if (addons.autorole.enabled) { 
            if (bot.permissions.has(PermissionFlagsBits.ManageRoles)) {
                if (role.comparePositionTo(bot.roles.highest) < 0 ) {
                    member.roles.add(role);
                }
            }
        }
        
        if (!addons.welcome.enabled) return;

        const welcomeChannel = member.guild.channels.cache.get(addons.welcome.channel);
        if (!bot.permissionsIn(welcomeChannel).has(PermissionFlagsBits.SendMessages)) return;

        if (!welcomeChannel) {
            guild_model.updateOne({id: member.guild.id}, {
                "addons.welcome": {
                    enabled: false,
                    channel: null,
                    background: null
                }
            });
            return;
        }

        var canvas = Canvas.createCanvas(1024, 500);
        var ctx = canvas.getContext("2d");
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        
        let img = new Canvas.Image();

        if (addons.welcome.background) {
            const url = new URL(addons.welcome.background);
            if (url || !addons.welcome.background) {
                img = await Canvas.loadImage(url.href);
            } else {
                img = await Canvas.loadImage('img/default.png');
                if (!addons.welcome.background) {
                    await guild_model.updateOne({id: member.guild.id}, {
                        "addons.welcome.background": null
                    })
                }
            }
        } else {
            img = await Canvas.loadImage('img/default.png');
        }

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
    }
}