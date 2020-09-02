const axios = require('axios');
const env = process.env;
const skills = require('./skills');

const parsePlayerInformation = username => {
  const userInfos = (await axios.get(env.RUNESCAPE_USER_ENDPOINT.replace(/XXX/g, username))).data;
  const { name, melee, magic, ranged, combatlevel, totalskill, questscomplete, activities, totalxp, } = userInfos;
  return `
  Hey, \`${name}\`
  There are some user informations:

  **Battle skill infos**
  >>>  :shield: _Combat_ level: ${combatlevel}
  :crossed_swords: _Melee_ : *${melee}*
  :mage: _Magic_ : *${magic}*
  :bow_and_arrow: _Ranged_ : *${ranged}*

  =========
  **Global infos**
  >>> Total skill: ${totalskill}
  Quests completed: ${questscomplete}
  Total XP: ${totalxp}

  **Skills infos**
  ||>>> ${skillvalues.map(skill => `_${skills[skill.id]}_ level: \`${skill.level}\` with a \`${skill.xp}\` total xp (Note, its ${skill.rank} rank)`)}||
  
  **Last activities**
  ||>>> ${activities.map(activity => activity.details)}||

  `;
}

const ping = async ({ bot, user, channelID }) => bot.sendMessage({
  to: channelID,
  message: `Pong, ${user}!`
});

const functionDefault = async ({ bot, user, channelID }) => bot.sendMessage({
  to: channelID,
  message: `Sorry, ${user}, I don't understood what you meant.`
});

const getUserData = async ({ bot, user, channelID, arguments }) => bot.sendMessage({
  to: channelID,
  message: await parsePlayerInformation(arguments[1])
});

module.exports = {
  ping,
  functionDefault,
}