const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../../models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give another user your currency')
    .addUserOption(option => option
      .setName('user')
      .setDescription('Select a user')
      .setRequired(true))
    .addNumberOption(option => option
      .setName('amount')
      .setDescription('Input amount')
      .setRequired(true)),
  async execute(interaction) {
    const { user } = interaction;
    const target = interaction.options.getUser('user');
    const amount = interaction.options.getNumber('amount');

    const dbTarget = await User.findById(target.id);
    const dbUser = await User.findById(user.id);

    await dbUser.transfer(dbTarget, amount);

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Give')
      .setDescription(`${user} gave ${target} ${amount.toLocaleString()} 💸`);

    await interaction.reply({ embeds: [embed] });
  },
};
