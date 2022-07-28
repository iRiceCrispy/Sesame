const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../../models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Returns your (or another user\'s) balance')
    .addUserOption(option => option
      .setName('user')
      .setDescription('Select a user')),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const dbUser = await User.findById(user?.id || interaction.user.id);

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Balance')
      .setDescription(`${user || 'You'} ${user ? 'has' : 'have'} ${dbUser.balance.toLocaleString()} 💸`);

    await interaction.reply({ embeds: [embed] });
  },
};
