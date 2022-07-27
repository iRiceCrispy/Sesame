const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns bot ping'),
  async execute(interaction) {
    const msg = await interaction.deferReply({ fetchReply: true });

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(`**${msg.createdTimestamp - interaction.createdTimestamp}** ms`);

    await interaction.editReply({ embeds: [embed] });
  },
};
