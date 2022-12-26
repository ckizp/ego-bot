const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ClientPresence } = require('discord.js');
const guild = require('../../models/guild');
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egautorole')
        .setDescription('Set the default role of your guild !')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('check')
                .setDescription('Check autorole infos'))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('set')
                .setDescription('Set a new default role for your guild')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('the role you want to give to new members !')
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
        const data = (await guild_model.findOne({id: interaction.guild.id})).addons.autorole;

        if (data.enabled) {
            if (!interaction.guild.roles.cache.find((guild) => guild.id === data.role))
                await guild_model.updateOne({id: interaction.guild.id}, {
                    "addons.autorole": {
                        enabled: false,
                        role: null
                    }
                });
        }

        switch (interaction.options.getSubcommand()) {
            case 'check':
                const bot = interaction.guild.members.cache.find((member) => member.id === client.application.id)

                if (data.enabled) {
                    const autorole = interaction.guild.roles.cache.find((role) => role.id === data.role);
                    return interaction.editReply({ content: `**Current role of the guild :** ${autorole}\n`
                        + ((autorole.comparePositionTo(bot.roles.highest)) >= 0 ? ('\n:warning: This role is higher than my highest role') : (''))
                        + ((!bot.permissions.has(PermissionFlagsBits.ManageRoles)) ? ('\n:warning: I don\'t have the permission to manage roles') : ('')) 
                        + ((autorole.permissions.has(PermissionFlagsBits.Administrator)) ? ('\n:warning: Please check the permissions of this role') : (''))});
                } else 
                    return interaction.editReply('Option disabled on this guild !');
                break;
            case 'set':
                const role = interaction.options.getRole('role');
                
                await guild_model.updateOne({id: interaction.guildId}, {
                    "addons.autorole": {
                        enabled: true,
                        role: role.id
                    }
                })
                return interaction.editReply('Guild autorole updated !');
                break;
            case 'remove':
                await guild_model.updateOne({id: interaction.guildId}, {
                    "addons.autorole": {
                        enabled: false,
                        role: null
                    }
                });
                return interaction.editReply('Guild autorole removed !');
                break;
        }
    }
}