const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../../models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Sets up a user for testing purposes')
    .addUserOption(option => option
      .setName('user')
      .setDescription('Select a user')
      .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');

    try {
      await User.create({ id: user.id });

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`Setup sucessfully for ${user}`);

      await interaction.reply({ embeds: [embed] });
    }
    catch (err) {
      if (err.code === 11000) {
        await interaction.reply({ content: 'User has already been setup.', ephemeral: true });
      }
    }
  },
};
