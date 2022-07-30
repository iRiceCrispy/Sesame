const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { User } = require('../../models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deduct')
    .setDescription('Deduct some 💸 from a user (admin only)')
    .addUserOption(option => option
      .setName('user')
      .setDescription('Select a user')
      .setRequired(true))
    .addNumberOption(option => option
      .setName('amount')
      .setDescription('Input amount')
      .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getNumber('amount');

    const dbUser = await User.findById(user.id);

    await dbUser.subtractBalance(amount);

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('addFunds')
      .setDescription(`${amount.toLocaleString()} 💸 has been deducted from ${user}`);

    await interaction.reply({ embeds: [embed] });
  },
};
