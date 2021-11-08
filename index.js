const { Client, Intents } = require('discord.js');

require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'invite') {
		const guild = await client.guilds.fetch(process.env.GUILD_ID);
		const channel = await guild.channels.cache.get(process.env.CHANNEL_ID);
        const invite = await channel.createInvite({
          maxUses: 1
        });
		await interaction.reply({ content: `Here is your one time invite: https://discord.gg/${invite.code}`, ephemeral: true });
	}
});

client.login(process.env.DISCORD_TOKEN);
