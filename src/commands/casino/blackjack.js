const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock } = require('discord.js');
const Blackjack = require('../../games/blackjack');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Starts a blackjack game'),
  async execute(interaction) {
    const blackjack = new Blackjack();
    const table = [];
    let started = false;
    let turn = 0;

    const startingEmbed = new EmbedBuilder()
      .setColor('Black')
      .setTitle('Blackjack')
      .setDescription('A blackjack game has started. Click the `Join` button to join. The game will start in 15 seconds or when the host clicks `start`.');

    const joinButton = new ButtonBuilder()
      .setCustomId('join')
      .setLabel('Join')
      .setStyle(ButtonStyle.Primary);

    const startButton = new ButtonBuilder()
      .setCustomId('start')
      .setLabel('Start')
      .setStyle(ButtonStyle.Success);

    const hitButton = new ButtonBuilder()
      .setCustomId('hit')
      .setLabel('Hit')
      .setStyle(ButtonStyle.Success);

    const standButton = new ButtonBuilder()
      .setCustomId('stand')
      .setLabel('Stand')
      .setStyle(ButtonStyle.Danger);

    const initialAction = new ActionRowBuilder()
      .addComponents(joinButton, startButton);

    const playAction = new ActionRowBuilder()
      .addComponents(hitButton, standButton);

    const hitOnlyAction = new ActionRowBuilder()
      .addComponents(hitButton);

    const msg = await interaction.reply({ embeds: [startingEmbed], components: [initialAction] });

    const collector = msg
      .createMessageComponentCollector({
        filter: i => ['join', 'start', 'hit', 'stand'].includes(i.customId),
      });

    collector.on('collect', async (i) => {
      await i.deferUpdate();

      if (!started) {
        switch (i.customId) {
          case 'join': {
            table.push(i.user);
            blackjack.addPlayer(i.user.id);

            const footer = table.map(p => `${p.username} has joined the game.`).join('\n');
            startingEmbed.setFooter({ text: footer });
            await interaction.editReply({ embeds: [startingEmbed], components: [initialAction] });
            break;
          }
          default: {
            blackjack.start();
            started = true;

            const playerHands = table.map(p => ({
              name: `${p.username}'s hand (score: ${blackjack.players[p.id].score})`,
              value: codeBlock(blackjack.players[p.id].hand.map(card => card.name).join(' ')),
            }));

            const playingEmbed = new EmbedBuilder()
              .setColor('Black')
              .setTitle(`${table[turn].username}'s turn`)
              .addFields({ name: `Dealer's hand (score: ${blackjack.dealer.faceupScore})`, value: codeBlock(`⬜ ${blackjack.dealer.hand[1].name}`) })
              .addFields(playerHands);

            await interaction.editReply({
              embeds: [startingEmbed, playingEmbed],
              components: [playAction],
            });
          }
        }
      }
      else {
        const player = blackjack.players[table[turn].id];

        switch (i.customId) {
          case 'stand': {
            player.stand();

            turn += 1;
            break;
          }
          default: {
            console.log('hit');
            player.draw(blackjack.deck);

            if (!player.hasHit) player.hit();
            if (player.busted) turn += 1;
          }
        }

        if (blackjack.gameover) return collector.stop();

        const playerHands = table.map(p => ({
          name: `${p.username}'s hand (score: ${blackjack.players[p.id].score})`,
          value: codeBlock(blackjack.players[p.id].hand.map(card => card.name).join(' ')),
        }));

        const playingEmbed = new EmbedBuilder()
          .setColor('Black')
          .setTitle(`${table[turn].username}'s turn`)
          .addFields({ name: `Dealer's hand (score: ${blackjack.dealer.faceupScore})`, value: codeBlock(`⬜ ${blackjack.dealer.hand[1].name}`) })
          .addFields(playerHands);

        await interaction.editReply({
          embeds: [startingEmbed, playingEmbed],
          components: [player.hasHit ? hitOnlyAction : playAction],
        });
      }
    });

    collector.on('end', async () => {
      blackjack.end();

      const playerHands = table.map(p => ({
        name: `${p.username}'s hand (score: ${blackjack.players[p.id].score})`,
        value: codeBlock(blackjack.players[p.id].hand.map(card => card.name).join(' ')),
      }));

      const playingEmbed = new EmbedBuilder()
        .setColor('Black')
        .setTitle('Game over')
        .addFields({ name: `Dealer's hand (score: ${blackjack.dealer.score})`, value: codeBlock(blackjack.dealer.hand.map(card => card.name).join(' ')) })
        .addFields(playerHands);

      await interaction.editReply({
        embeds: [startingEmbed, playingEmbed],
        components: [],
      });
    });
  },
};
