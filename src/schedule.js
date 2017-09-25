'use strict';

const _ = require('lodash');
const config = require('./config');

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
  '6': null
};
const Holidays = require('date-holidays');

// NOTE: Would be nice to add both Spain and Canada.
const PolishHolidays = new Holidays('PL');

const checkHoliday = (date) => {
  return PolishHolidays.isHoliday(date);
};

const checkDate = (date) => {
  if(checkHoliday(date)) return 'holiday';
  return Schedule[date.getDay()];
};

module.exports.check = checkDate;
module.exports.getHoliday = checkHoliday;
