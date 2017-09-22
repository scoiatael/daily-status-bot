'use strict';

const _ = require('lodash');
const config = require('../config');
const schedule = require('../schedule');
const Botkit = require('botkit');

var controller = Botkit.slackbot({});
var bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const msgDefaults = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI')
};

var text = `_All engineers must report *immediately* their progress status. Thank you for your cooperation._ [*${config('SLACK_MENTION')}*]`;
let cause = schedule.check(new Date());
if(cause) {
  text = cause.text;
}

let msg = _.defaults({ text: text }, msgDefaults);

bot.sendWebhook(msg, (err, res) => {
  if (err) throw err;

  console.log(`\n Starbot report delivered\n${res}`);
});
