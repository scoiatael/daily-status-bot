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
  return Schedule[date.getDay()];
};

const Holidays = require('date-holidays');
const PolishHolidays = new Holidays('PL');

let checkHoliday = (date) => {
  return !PolishHolidays.isHoliday(date);
}

const Pipeline = [byDay, checkHoliday];

module.exports.check = (date) => {
  return _.reduce(Pipeline,
                  (v, fun) => { return v && fun(date); },
                  true);
}
