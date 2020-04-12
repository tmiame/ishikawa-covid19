import moment, { Moment } from 'moment';

const dateFromNowLabel = (date: Moment = moment()) => {
  const today = moment().set({ hour: 23, minute: 59 });
  const update = moment(date).set({ hour: 23, minute: 59 });
  const diffDays = today.diff(date, 'days');

  if (diffDays === 0) {
    return '今日';
  } else if (diffDays === 1) {
    return '昨日';
  } else if (diffDays === 2) {
    return '一昨日';
  }

  return update.format('M月D日(ddd)');
};

export default dateFromNowLabel;
