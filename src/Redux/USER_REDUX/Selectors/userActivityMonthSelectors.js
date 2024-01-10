import {createSelector} from 'reselect';
const max = require('lodash.max');
import Config from 'react-native-config';

const month_selector = (months) => {
  let revised_months = [];
  Object.entries(months).forEach(([key, value]) => {
    revised_months.push({month_id: key, month_title: value});
  });
  let recent_month = max(Object.keys(months));
  let has_no_data = recent_month ? false : true;
  return {revised_months, recent_month, has_no_data};
};

export const user_activity_months = createSelector(
  month_selector,
  (revised_months) => {
    return revised_months;
  },
);
