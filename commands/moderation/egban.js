const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildBanManager } = require('discord.js');
const { JSON_Guilds } = require('../../JSON_Object');
const obj = new JSON_Guilds('./guilds.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egban')
        .setDescription('ban user')
        .addUserOption((option) => option.setName('member').setDescription('user to ban').setRequired(true))
        .addStringOption((option) => option.setName('time').setDescription('If you want to ban someone for a certain amount of time'))
        .addStringOption((option) => option.setName('reason').setDescription('reason of the ban')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();

        const member = interaction.options.getMember('member');
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.editReply('Don\'t have the permission to perform this command!');

        try {
            interaction.guild.bans.create(member.id, {reason: reason});
        } catch {
            return interaction.editReply('Don\'t have the permission to perform this command!');
        }

        if (time) {
            const current_time = Math.floor(Date.now() / 1000);
            let end_time = 0;
            
            const index = time.search(/\D/);
            const first_int = parseInt(time.match(/\d+/));

            switch (time.charAt(index)) {
                case 's':
                    end_time = first_int + current_time;
                    break;
                case 'm':
                    end_time = (first_int * 60) + current_time;
                    break;
                case 'h':
                    end_time = (first_int * Math.pow(60, 2)) + current_time;
                    break;
                case 'd':
                    end_time = (first_int * 24 * Math.pow(60, 2)) + current_time;
                    break;
                case 'w':
                    end_time = (first_int * 7 * 24 * Math.pow(60, 2)) + current_time;
                    break;
            }

            obj.addTempban(interaction.guildId, interaction.member.id, current_time, end_time);
        }

        const str = `${member} has been banned from the server` + (reason ? ' for \'' + reason + '\'' : '') + ' !';

        interaction.editReply(str)
    }
}