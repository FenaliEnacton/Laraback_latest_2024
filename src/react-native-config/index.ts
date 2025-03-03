export const Config = {
  APP_NAME: 'LarabackPro',
  IS_PLUS: false,
  API_URL: 'https://api-laraback.enactweb.com',
  PUBLIC_PREFIX: '/public',
  APP_URL: 'https://laraback.enactweb.com/',
  CURRENCY: {
    id: 53,
    name: { en: 'Rupees', fr: 'Rupee', hi: 'Rupee' },
    iso_code: 'INR',
    symbol: '$',
    display_as: 'prefix',
  },
  APP_OUT_URL: 'https://api-laraback.enactweb.com/mout/:type/:type_id/:user_id',
  CURRENCY_PREFIX: '$',
  DEFAULT_COUNTRY: 'IN',
  DEFAULT_LANG: 'en',
  DEFAULT_COUNTRY_CODE: 91,
  LANG: 'en',
  // IMAGE_URL: window.image_path,
  CURRENCIES: ['USD', 'INR'],
  REGISTER_PAGE: 'https://laraback.enactweb.com/signup?referral=',
  HOME_URL: 'https://laraback.enactweb.com/:locale',
  SHARE_LINK_URL: 'https://laraback.enactweb.com/l/:code',
  SINGLE_DEAL_URL: 'https://laraback.enactweb.com/:locale/deal/:slug',
  STORE_URL: 'https://laraback.enactweb.com/:locale/store/:slug',
  ALL_STORES_PAGE: 'https://laraback.enactweb.com/:locale/all-stores',
  DOD_PAGE: ' https://laraback.enactweb.com/:locale/daily-deals',
  DATE_FORMAT: 'MMMM DD,YYYY h:mm a',
  PAGINATION: [25, 50, 100, 250],
  MAX_CLAIM_DAYS: 3,
  MIN_CLAIM_DAYS: 15,
  REFERRAL_ON: 1,
  REFERRAL_PERCENT: 10,
  SHOULD_VERIFY_PHONE: 1,
  LANGS: { en: 'English', hi: 'हिंदी' },
  contact_prefix: '91',
  CB_ICON: 'https://laraback.enactweb.com//img/money-back-guarantee.png',
  ONE_SIGNAL: '26d502ce-957b-4561-aaac-1504ed59013d',
  DEEP_LINK_URL: 'larabackpro://larabackpro.com/',
  EMPTY_IMAGE_URL: 'https://laraback.enactweb.com//images/blank.png',
  GOOGLE_ID:
    '1031532029612-2n05bigcvcmn7i9vutnct7r4taje5ue2.apps.googleusercontent.com',
  ...global.Config,
};
