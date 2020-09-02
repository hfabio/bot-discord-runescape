const Discord = require('discord.io');
const logger = require('winston');
const env = process.env;
const

const bot = new Discord.Client({
  token: env.DISCORD_TOKEN,
  autorun: true,
});

const functionalities = require('./functionalities');

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', async function (user, userID, channelID, message, evt) {
  if (!message[0] === env.COMMAND_PREFIX) return;
  const event_data = { user, userID, channelID, message, evt };
  const command = message.split(' ')[0].replace(env.COMMAND_PREFIX, '');

  const arguments = message.split(' ').splice(1);

  switch (command.toLowerCase()) {
    case 'ping':
      return functionalities.ping(event_data);
    case 'player':
      return await functionalities.getUserData({ ...event_data, arguments });
    default:
      return functionalities.function_default(event_data);
  }
});