'use strict'

const _ = require('lodash')
const config = require('../config')
const schedule = require('../schedule')
const Botkit = require('botkit')

var controller = Botkit.slackbot({})
var bot = controller.spawn()

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') })

const msgDefaults = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
  text: `${config('SLACK_MENTION')} Remember about daily-standup!`,
}

var attachments = [
];

var msg = _.defaults({ attachments: attachments }, msgDefaults);

if(schedule.check(new Date())) {
  bot.sendWebhook(msg, (err, res) => {
    if (err) throw err;

    console.log(`\n Starbot report delivered\n${res}`);
  });
}
