const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const guild = require('../../models/guild');
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egautorole')
        .setDescription('Set the default role of your guild !')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption((option) => option.setName('role').setDescription('the role you want to give to new members !')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const data = await guild_model.findOne({id: interaction.guild.id});

        //Si activé et que pourtant le rôle n'existe pas, actualiser la base de données
        if (data.addons.autorole.enabled) {
            if (!interaction.guild.roles.cache.find((guild) => guild.id === data.addons.autorole.role))
                await guild_model.updateOne({id: interaction.guild.id}, {
                    "addons.autorole": {
                        enabled: false,
                        role: null
                    }
                });
        }

        const role = interaction.options.getRole('role');
        const bot = interaction.guild.members.cache.find((member) => member.id === client.application.id);

        if (!role) {
            if (data.addons.autorole.enabled) {
                const autorole = interaction.guild.roles.cache.find((role) => role.id === data.addons.autorole.role);
                return interaction.editReply({ content: `Current role of the guild : ${autorole}`
                    + ((autorole.comparePositionTo(bot.roles.highest)) >= 0 ? ('\n:warning: This role is higher than my highest role') : (''))
                    + ((!bot.permissions.has(PermissionFlagsBits.ManageRoles)) ? ('\n:warning: I don\'t have the permission to manage roles') : ('')) });
            } else 
                return interaction.editReply('Option disabled on this guild !');
        }

        await guild_model.findOneAndUpdate({id: interaction.guildId},
            { $set: {
                "addons.autorole": {
                    enabled: true,
                    role: role.id
                }
            }
        });

        if (role.comparePositionTo(interaction.guild.members.cache.get(client.application.id).roles.highest) >= 0)
            interaction.editReply('Server autorole updated but this role is higher than my highest role !')
        else
            interaction.editReply(' Server autorole updated !');
    }
}