import {AppImages} from './Images';
export const routerList = [
  {
    id: 11,
    title: 'home',
    route: 'Home',
    icon: 'home',
  },
  {
    id: 12,
    title: 'stores',
    route: 'AllStores',
    icon: 'store',
  },
  {
    id: 12,
    title: 'daily_deals',
    route: 'AllDeals',
    icon: 'brightness-percent',
  },
  {
    id: 13,
    title: 'my_account',
    member_access: true,
    icon: 'account-circle',
    child_routes: [
      // {
      //   id: 14,
      //   title: 'my_account',
      //   is_parent_first: true,
      //   icon: 'account-circle-outline',
      // },
      {
        id: 15,
        title: 'overview',
        route: 'UserDashboard',
        icon: 'account-details',
      },
      {
        id: 16,
        title: 'cashback_activities',
        icon: 'storefront',
        route: 'Clicks',
      },
      {
        id: 17,
        title: 'cashback_payment',
        icon: 'cash-multiple',
        route: 'CashbackPayment',
      },
      {
        id: 18,
        title: 'missing_cashback',
        icon: 'table-account',
        route: 'MissingClaims',
      },
      {
        id: 19,
        title: 'fav',
        route: 'Favorites',
        icon: 'heart',
      },
      {
        id: 20,
        title: 'refer_n_earn',
        icon: 'account-cash',
        route: 'ReferNEarn',
      },
      {
        id: 21,
        title: 'share_n_earn',
        icon: 'share-variant',
        route: 'ShareNEarn',
      },
      {
        id: 22,
        title: 'account_settings',
        icon: 'content-save-cog',
        route: 'AccountSettings',
      },
    ],
  },
  {
    id: 23,
    title: 'categories',
    // route: 'UserDashboard',
    icon: 'view-grid',
    child_routes: [
      // {
      //   id: 24,
      //   title: 'categories',
      //   is_parent_first: true,
      //   // route: 'UserDashboard',
      //   icon: 'view-grid',
      // },
      {
        id: 25,
        title: 'store_categories',
        route: 'AllStoreCategories',
        icon: 'store',
      },
      {
        id: 26,
        title: 'coupon_categories',
        route: 'AllCouponCategories',
        icon: 'offer',
      },
      {
        id: 27,
        title: 'deal_categories',
        route: 'AllDealsCategories',
        icon: 'label-percent',
      },
    ],
  },
  {
    id: 28,
    title: 'refer_n_earn',
    route: 'ReferNEarn',
    icon: 'account-cash',
  },
  {
    id: 29,
    title: 'share_n_earn',
    route: 'ShareNEarn',
    icon: 'share-variant',
  },
  {
    id: 30,
    title: 'about_us',
    icon: 'file-document',
    child_routes: [
      // {
      //   id: 31,
      //   title: 'about_us',
      //   is_parent_first: true,
      //   icon: 'file-document',
      // },
      {
        id: 32,
        title: 'about_company',
        route: 'AboutUs',
        icon: 'city-variant',
      },
      {
        id: 33,
        title: 'privacy_policy',
        route: 'PrivacyPolicy',
        icon: 'content-save-alert',
      },
      {
        id: 34,
        title: 'terms_of_use',
        route: 'TermsOfUse',
        icon: 'clipboard-check-multiple',
      },
    ],
  },
  {
    id: 35,
    title: 'help',
    icon: 'help-circle',
    child_routes: [
      // {
      //   id: 36,
      //   title: 'help',
      //   icon: 'help-circle',
      //   is_parent_first: true,
      // },
      {
        id: 37,
        title: 'how_it_works',
        route: 'HowItWorks',
        icon: 'card-text',
      },
      {
        id: 38,
        title: 'faqs',
        route: 'FAQs',
        icon: 'comma-circle',
      },
      {
        id: 39,
        title: 'contact_us',
        route: 'ContactUs',
        icon: 'book-account',
      },
    ],
  },
  // {
  //   id: 40,
  //   title: 'change_language',
  //   route: 'LanguageSelect',
  //   icon: AppImages.change_language_1,
  // },
  {
    id: 41,
    title: 'log_out',
    member_access: true,
    icon: 'logout',
    route: true,
  },
];

export const NavList = [
  {
    id: 111,
    title: 'cashback_activities',
    icon: 'storefront',
    route: 'Clicks',
  },
  {
    id: 222,
    title: 'cashback_payment',
    icon: 'cash-multiple',
    route: 'CashbackPayment',
  },
  {
    id: 333,
    title: 'missing_cashback',
    icon: 'table-account',
    route: 'MissingClaims',
  },
  {
    id: 444,
    title: 'fav',
    route: 'Favorites',
    icon: 'heart',
  },
  {
    id: 555,
    title: 'refer_n_earn',
    icon: 'account-cash',
    route: 'ReferNEarn',
  },
  {
    id: 666,
    title: 'share_n_earn',
    icon: 'share-variant',
    route: 'ShareNEarn',
  },
  {
    id: 999,
    title: 'account_settings',
    icon: 'content-save-cog',
    route: 'AccountSettings',
  },
  {
    id: 777,
    title: 'faqs',
    icon: 'comma-circle',
    route: 'FAQs',
  },
  {
    id: 888,
    title: 'contact_us',
    route: 'ContactUs',
    icon: 'book-account',
  },
  {
    id: 1000,
    title: 'log_out',
    icon: 'logout',
  },
];

const UserRoutes = [
  {
    id: 1111,
    title: 'clicks',
    route: 'Clicks',
    icon: 'cursor-default-click',
  },
  {
    id: 2222,
    title: 'shopping',
    route: 'Shopping',
    icon: 'shopping-outline',
  },
  {
    id: 3333,
    title: 'referral',
    route: 'Referral',
    icon: 'share-circle',
  },
  {
    id: 4444,
    title: 'bonus',
    route: 'Bonus',
    icon: 'hand-coin',
  },
  {
    id: 5555,
    title: 'cashback_payment_history',
    route: 'CashbackPaymentHistory',
    icon: 'cash-multiple',
  },
  {
    id: 6666,
    title: 'cashback_payment',
    route: 'CashbackPayment',
    icon: 'cash-multiple',
  },
  {
    id: 7777,
    title: 'create_new_claim',
    route: 'CreateClaim',
    icon: 'table-account',
  },
  {
    id: 8888,
    title: 'personal_information',
    route: 'personal_information',
    icon: 'account-box',
  },
  {
    id: 9999,
    title: 'change_password',
    route: 'change_password',
    icon: 'account-key',
  },
  {
    id: 10000,
    title: 'email',
    route: 'email',
    icon: 'email-edit',
  },
  {
    id: 10001,
    title: 'mobile_number',
    route: 'mobile_number',
    icon: 'cellphone-cog',
  },
  {
    id: 10002,
    title: 'view_all_claims',
    route: 'MissingClaims',
    icon: 'clipboard-list',
  },
  {
    id: 10003,
    title: 'your_referral_activities',
    route: 'ReferralActivities',
    icon: 'account-cash',
  },
  {
    id: 10004,
    title: 'invited_users',
    route: 'ReferralInvites',
    icon: 'account-supervisor-circle',
  },
  {
    id: 10005,
    title: 'refer_n_earn',
    route: 'ReferNEarn',
    icon: 'account-cash',
  },
  {
    id: 10006,
    title: 'share_n_earn_history',
    route: 'ShareNEarnHistory',
    icon: 'share-circle',
  },
  {
    id: 10007,
    title: 'share_n_earn',
    route: 'ShareNEarn',
    icon: 'share-variant',
  },
  {
    id: 10008,
    title: 'view_all_claims',
    route: 'MissingClaims',
    icon: 'clipboard-list',
  },
];

export const Register = [
  {
    id: 101,
    title: 'sign_in',
    route: 'Login',
    icon: 'account-arrow-right',
  },
  {
    id: 102,
    title: 'sign_up',
    route: 'Signup',
    icon: 'account-plus',
  },
];
export const get_nav_list = required_routes => {
  return NavList.filter(function (element) {
    return this.indexOf(element.id) !== -1;
  }, required_routes);
};

export const get_user_internal_nav_list = required_routes => {
  return UserRoutes.filter(function (element) {
    return this.indexOf(element.id) !== -1;
  }, required_routes);
};

export const get_route_name = slug => {
  const routes = {
    'all-stores': 'AllStores',
    'daily-deals': 'AllDeals',
    'all-store-categories': 'AllStoreCategories',
    'all-coupon-categories': 'AllCouponCategories',
    'coupon-category': 'CouponCatDetails',
    'store-category': 'StoreCatDetail',
    store: 'StoreDetails',
  };
  return routes[slug];
};
