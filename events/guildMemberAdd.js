const { Events, GuildMember, PermissionFlagsBits, ButtonInteraction } = require("discord.js");
const Canvas = require('canvas');
const { JSON_Guilds } = require('../JSON_Object');
const obj = new JSON_Guilds('./guilds.json')
const { AttachmentBuilder } = require('discord.js')
const guild_model = require('../models/guild');
const guild = require("../models/guild");

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

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * @param {GuildMember} member 
     */
    async execute(member) {

        const bot = member.guild.members.cache.find((member) => member.id === member.client.application.id);
        const addons = (await guild_model.findOne({id: member.guild.id})).addons;

        if (addons.autonick.enabled) {
            if (bot.permissions.has(PermissionFlagsBits.ChangeNickname))
                member.setNickname(addons.autonick.nickname);
        }

        const role = member.guild.roles.cache.find((role) => role.id === addons.autorole.role);
        if (!role) {
            await guild_model.updateOne({id: member.guild.id}, {
            "addons.autorole": {
                enabled: false,
                    role: null
                }
             });
        }

        if (addons.autorole.enabled) { 
            if (bot.permissions.has(PermissionFlagsBits.ManageRoles)) {
                if (role.comparePositionTo(bot.roles.highest) < 0 ) {
                    member.roles.add(role);
                }
            }
        }
        

        if (obj.getPropertyValue(member.guild.id, "welcomeChannelID") === null) return;
        if (!member.guild.channels.cache.map((channel) => channel.id).includes(obj.getPropertyValue(member.guild.id, "welcomeChannelID"))) {
            obj.alter(member.guild.id, "welcomeChannelID", null); return;
        }

        const welcomeChannel = member.guild.channels.cache.get(obj.getPropertyValue(member.guild.id, "welcomeChannelID"));
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