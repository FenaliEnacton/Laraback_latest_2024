import { I18n } from 'i18n-js';

export const translationGetters = {
  ar: () => require('@translations/ar.json'),
  en: () => require('@translations/en.json'),
};

const i18n = new I18n();
export const translate = (key: any, config?: any) => i18n.t(key, config);
