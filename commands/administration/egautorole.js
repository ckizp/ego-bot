const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
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
        let data = (await guild_model.findOne({id: interaction.guild.id})).addons.autorole;

        let embed = new EmbedBuilder();

        if (data.enabled) {
            if (!interaction.guild.roles.cache.get(data.role))
                await guild_model.updateOne({id: interaction.guild.id}, {
                    "addons.autorole": {
                        enabled: false,
                        role: null
                    }
                });
                data = (await guild_model.findOne({id: interaction.guild.id})).addons.autorole;
        }

        switch (interaction.options.getSubcommand()) {
            case 'check':
                const bot = interaction.guild.members.cache.get(client.application.id)

                if (data.enabled) {
                    const autorole = interaction.guild.roles.cache.get(data.role);
                    embed
                        .setColor(0x5c5cff)
                        .setTitle('Autorole')
                        .setDescription(`The current role of the guild is ${autorole}`)

                        if (autorole.comparePositionTo(bot.roles.highest) >= 0)
                            embed.addFields({name: '\u200B', value: ':warning: This role is higher than my highest role'});
                        if (!bot.permissions.has(PermissionFlagsBits.ManageRoles))
                            embed.addFields({name: '\u200B', value: ':warning: I don\'t have the permission to manage roles'});
                        if (autorole.permissions.has(PermissionFlagsBits.Administrator))
                            embed.addFields({name: '\u200B', value: ':warning: Please check the permissions of this role'});

                        return interaction.editReply({embeds: [embed]});
                } else {
                    embed
                        .setColor(0xee1010)
                        .setTitle('Autorole')
                        .setDescription('Option disabled on this guild !')

                    return interaction.editReply({embeds: [embed]});
                }
                break;
            case 'set':
                const role = interaction.options.getRole('role');
                
                await guild_model.updateOne({id: interaction.guildId}, {
                    "addons.autorole": {
                        enabled: true,
                        role: role.id
                    }
                });
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