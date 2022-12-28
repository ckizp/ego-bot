const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egwelcomechannel')
        .setDescription("définit le salon courant comme salon d'accueil des nouveaux utilisateurs")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('check')
                .setDescription('Check welcome channel infos'))
        .addSubcommandGroup((group) =>
            group
                .setName('set')
                .setDescription('setter')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('channel')
                        .setDescription('Set the welcome channel of your guild')
                        .addChannelOption((option) =>
                            option
                                .setName('welcomechannel')
                                .setDescription('the channel which will welcome new members')
                                .setRequired(true)))
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('background')
                        .setDescription('Set a custom background to your welcome message')
                        .addStringOption((option) =>
                            option
                                .setName('url')
                                .setDescription('the custom background (image URL)')
                                .setRequired(true))))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Disable the welcome channel option')),
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
    async execute(interaction) {
        await interaction.deferReply();

        let data = (await guild_model.findOne({id: interaction.guildId})).addons.welcome;
        const welcomechannel = interaction.guild.channels.cache.find((channel) => channel.id === data.channel);

        if (data.enabled && !welcomechannel) {
            await guild_model.updateOne({id: interaction.guildId}, {
                $set: {
                    "addons.welcome.enabled": false,
                    "addons.welcome.channel": null
                }
            })
            data = (await guild_model.findOne({id: interaction.guild.id})).addons.welcome;
        }

        let embed = new EmbedBuilder();

        switch (interaction.options.getSubcommand()) {
            case 'check':
                const img = new AttachmentBuilder('img/default.png');
                embed
                    .setColor(0x5c5cff)
                    .setTitle('Welcome channel')
                    .setDescription((data.enabled) ? (`The channel defined to receive members is ${welcomechannel}`) : ('Option disabled on this guild !'))
                    .setImage((data.background) ? (data.background) : ('attachment://default.png'));

                    if (!data.background)
                        return interaction.editReply({embeds: [embed], files: [img]});
                    else
                        return interaction.editReply({embeds: [embed]});
                break;
            case 'channel':
                const channel = interaction.options.getChannel('welcomechannel');

                await guild_model.updateOne({id: interaction.guildId}, {
                    $set: {
                        "addons.welcome.enabled": true,
                        "addons.welcome.channel": channel.id
                    }
                })

                embed
                    .setColor(0x2ed17d)
                    .setTitle('Welcome channel')
                    .setDescription(':white_check_mark: Guild welcome channel updated !');

                return interaction.editReply({embeds: [embed]});
                break;
            case 'background':
                const background = interaction.options.getString('url');
                if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(background)) {
                    const url = new URL(background);
                    if (url) {
                        await guild_model.updateOne({id: interaction.guildId}, {
                            $set: {
                                "addons.welcome.background": background
                            }
                        })

                        embed
                            .setColor(0x2ed17d)
                            .setTitle('Welcome channel')
                            .setDescription(':white_check_mark: Guild welcome channel updated !')

                        return interaction.editReply({embeds: [embed]})
                    }
                }
                embed
                    .setColor(0xee1010)
                    .setTitle('Welcome channel')
                    .setDescription(':x: An error has occurred ! Check if the URL is valid !')

                return interaction.editReply({embeds: [embed]})
                break;
            case 'remove':
                await guild_model.updateOne({id: interaction.guildId}, {
                    "addons.welcome": {
                        enabled: false,
                        channel: null,
                        background: null
                    }
                });

                embed
                    .setColor(0x2ed17d)
                    .setTitle('Welcome channel')
                    .setDescription(':white_check_mark: Guild welcome channel option removed !');

                return interaction.editReply({embeds: [embed]});
                break;
        }
    }
}