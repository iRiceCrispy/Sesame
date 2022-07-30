const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../../models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin. Guess the correct side to win.')
    .addStringOption(option => option
      .setName('call')
      .setDescription('Choose heads or tails')
      .setRequired(true)
      .addChoices(
        { name: 'Heads', value: 'heads' },
        { name: 'Tails', value: 'tails' },
      ))
    .addNumberOption(option => option
      .setName('wager')
      .setDescription('Input amount you wish to wager')
      .setRequired(true)),
  async execute(interaction) {
    const player = interaction.user;
    const call = interaction.options.getString('call');
    const wager = interaction.options.getNumber('wager');
    const coin = Math.floor(Math.random() * 2) > 0 ? 'heads' : 'tails';
    const hasWon = coin === call;

    const dbPlayer = await User.findById(player.id);

    if (hasWon) {
      await dbPlayer.addBalance(wager);
    }
    else {
      await dbPlayer.subtractBalance(wager);
    }

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Coin Flip')
      .setDescription(`You guessed ${call}.\nCoin landed on ${coin}.\nYou ${hasWon ? 'won' : 'lost'} ${wager} 💸.`);

    await interaction.reply({ embeds: [embed] });
  },
};
