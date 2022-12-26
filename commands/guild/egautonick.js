const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egautonick')
        .setDescription('Set the default nickname!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('check')
                .setDescription('Check autonick infos'))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('set')
                .setDescription('Set a new default nickname for your guild')
                .addStringOption((option) => 
                    option
                        .setName('nickname')
                        .setDescription('the nickname you want to give to new members !')
                        .setRequired(true)))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Remove autorole from the guild')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const data = (await guild_model.findOne({id: interaction.guildId})).addons.autonick;

        switch (interaction.options.getSubcommand()) {
            case 'check':
                const bot = interaction.guild.members.cache.find((member) => member.id === client.application.id);

                if (data.enabled) {
                    return interaction.editReply(`**Current nickname of the guild :** ${data.nickname}`
                        + ((!bot.permissions.has(PermissionFlagsBits.ChangeNickname)) ? (':warning: I don\'t have the permission to change nickname') : ('')));
                } else
                    return interaction.editReply('Option disabled on this guild !');
                break;
            case 'set':
                const nickname = interaction.options.getString('nickname');
                
                await guild_model.updateOne({id: interaction.guildId}, {
                    "addons.autonick": {
                        enabled: true,
                        nickname: nickname
                    }
                })
                return interaction.editReply('Guild autonick updated !')
                break;
            case 'remove':
                guild_model.updateOne({id: interaction.guildId}, {
                    "addons.nickname": {
                        enabled: false,
                        nickname: false
                    }
                })
                interaction.editReply('Guild autonick removed !')
                break;
        }
    }
}