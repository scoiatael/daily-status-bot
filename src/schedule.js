'use strict';

const _ = require('lodash');

const Schedule = {
  // Sunday
  '0': false,
  // Monday
  '1': true,
  // Tuesday
  '2': false,
  // Wednesday
  '3': true,
  // Thursday
  '4': false,
  // Friday
  '5': true,
  // Saturday
  '6': false,
};

const byDay = (date) => {
  let day = date.getDay();
  if(Schedule[day]) {
    return false;
  }
  return {
    text: `Standup is not scheduled for weekday ${day}.`
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
