'use strict';

const _ = require('lodash');
const config = require('../config');

const Schedule = {
  // Sunday
  '0': null,
  // Monday
  '1': 'status',
  // Tuesday
  '2': 'call',
  // Wednesday
  '3': 'status',
  // Thursday
  '4': 'call',
  // Friday
  '5': 'status',
  // Saturday
  '6': null,
};

const byDay = (date) => {
  let day = date.getDay();
  if(Schedule[day] == 'status' || Schedule[day] == null) {
    return false;
  }
  return {
    text: `All engineers must head immediately to the main chamber for an important meeting. [${config('SLACK_MENTION')}]`
  };
};

const Holidays = require('date-holidays');
const PolishHolidays = new Holidays('PL');

let checkHoliday = (date) => {
  let holiday = PolishHolidays.isHoliday(date);
  if(!holiday) {
    return false;
  } else {
    return {
      text: `${date} is "${holiday.name}" in Poland. Ends on ${holiday.end}`
    };
  }
}

const Pipeline = [byDay, checkHoliday];

module.exports.check = (date) => {
  return _.reduce(Pipeline,
                  (v, fun) => { return v || fun(date); },
                  false);
}
