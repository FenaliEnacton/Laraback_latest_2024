import i18n from 'i18n-js';

export const translationGetters = {
  ar: () => require('@translations/ar.json'),
  en: () => require('@translations/en.json'),
};

export const translate = (key, config) => i18n.t(key, config);
