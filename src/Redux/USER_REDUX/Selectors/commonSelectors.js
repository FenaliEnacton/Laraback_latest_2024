import {createSelector} from 'reselect';
const get_new_arr = (max_length) => {
  return [...new Array(max_length)].map((u, i) => i);
};

export const get_pagination_arr = createSelector(
  get_new_arr,
  (pagination_arr) => {
    return pagination_arr;
  },
);

const get_link = (data) => {
  return data.link;
};

export const get_social_links = createSelector(get_link, (link) => {
  return {
    facebook: `https://www.facebook.com/sharer.php?u=${link}`,
    twitter: `https://twitter.com/intent/tweet?url=${link}`,
    whats_app: `https://api.whatsapp.com/send?text= Refer and Earn ${link}`,
  };
});
