'use strict';

const _ = require('lodash');
const config = require('../config');
const schedule = require('../schedule');
const Botkit = require('botkit');
const strftime = require('strftime');

var controller = Botkit.slackbot({});
var bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const msgDefaults = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI')
};

const sendMessage = (text) => {
  let msg = _.defaults({ text: text }, msgDefaults);
  bot.sendWebhook(msg, (err, res) => {
    if (err) throw err;
    console.log(`\n Starbot report delivered\n${res}`);
  });
};

const statusText = `_All engineers must report *immediately* their progress status. Thank you for your cooperation._ [*${config('SLACK_MENTION')}*]`;
const callText = `_All engineers must head *immediately* to the main chamber for an important meeting_. [*${config('SLACK_MENTION')}*]`;

let date = new Date();
let cause = schedule.check(date);

switch(cause) {
case "call":
  sendMessage(cause.text);
  break;
case "status":
  sendMessage(statusText);
  break;
case "holiday":
  let holiday = schedule.getHoliday(date);
  let nextWorkingDay = strftime('%A', holiday.end);
  sendMessage(`"_All engineers may rest. Today we celebrate "*${holiday.name}*", next *${nextWorkingDay}* we don't._`);
  break;
case null:
  // David eagerly awaits for the Monday to come.
}




