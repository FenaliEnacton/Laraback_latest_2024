// Route::get('dashboard', 'UserController@dashboard')->name('user.dashboard');
// Route::get('module/{module}', 'UserController@moduleInfo')->name('user.module.info');
// Route::get('modules', 'UserController@modulesList')->name('user.modules');

const route_urls = {
  "user.dashboard": "user/dashboard",
  "user.activity.bonus": "user/activity/bonus/",
  "user.activity.cashback": "user/activity/cashback/",
  "user.activity.click.recent": "user/activity/click/recent",
  "user.activity.click": "user/activity/click/",
  "user.activity.referral": "user/activity/referral/",
  "user.claim.list": "user/claim/list",
  "user.claim.make": "user/claim/make",
  "user.claim.store.clicks": "user/claim/storeClicks/",
  "user.claim.stores": "user/claim/stores",
  "user.fav.add": "user/favs/add/",
  "user.fav.list": "user/favs/list/",
  "user.fav.remove": "user/favs/remove/",
  "user.link.create": "user/link/create",
  "user.links.list": "user/link/list",
  "user.module.info": "user/module/",
  "user.modules": "user/modules",
  "user.passbook": "user/passbook/",
  "user.payment.list": "user/payment/list/",
  "user.payment.method.add": "user/payment/method",
  "user.payment.methods": "user/payment/methods",
  "user.payment.request": "user/payment/request",
  "user.referral.invites": "user/referral/invites",
  "user.referral.invite.send": "user/referral/invite",
  "user.referral.list": "user/referral/list",
  "user.summary.bonus": "user/summary/bonus",
  "user.summary.cashback": "user/summary/cashback",
  "user.summary.click": "user/summary/click",
  "user.summary.payment": "user/summary/payment",
  "user.summary.referral": "user/summary/referral",
  "public.coupon.data": "public/coupons",
  "public.coupon.filter": "public/couponsFilter",
  "public.deal.data": "public/deals",
  "public.countries": "public/countries",
  "public.deal.data": "public/dealsFilter",
  "public.store.list": "public/stores",
  "public.store.category": "public/stores/",
  "user.profile.update.name": "user/profile/change/name",
  "user.profile.update.lang": "user/profile/change/lang",
  "user.claim.close": "user/claim/close/",
  "user.claim.comment": "user/claim/comment/",
  "user.claim.info": "user/claim/info/",
  "user.change.web.password": "user/profile/change/web-password",
  "user.change.password": "user/profile/change/password",
  "user.account.activation": "user/account/resend/activation",
  "user.profile.meta": "user/profile/meta",
  "user.graph.clicks": "user/graph/click/30",
  "user.graph.earning": "user/graph/earning/year",
  "user.payment.email_request": "user/payment/reverify/",
};

const get_url_value = (route_name) => {
  return "/" + route_urls[route_name];
};

export default get_url_value;
