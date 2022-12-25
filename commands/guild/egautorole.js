const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egautorole')
        .setDescription('Set the default role of your guild !')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption((option) => option.setName('role').setDescription('the role you want to give to new members !').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const role = interaction.options.getRole('role');
        const bot = interaction.guild.members.cache.find((member => member.id === client.application.id));

        await guild_model.updateOne({id: interaction.guildId},
            { $set: {
                "addons.autorole": {
                    enabled: true,
                    role: role.id
                }
            }
        });

        let err;

        if (role.comparePositionTo(interaction.guild.members.cache.get(client.application.id).roles.highest) >= 0) {
            err = 'but this role is higher than my highest role !';
        }
        interaction.editReply('Server autorole updated !' + (err ? err : ''));
    }
}