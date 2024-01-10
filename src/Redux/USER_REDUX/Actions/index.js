import * as user_dashboard_actions from "./userDashboardActions";
import * as user_summary_actions from "./userSummaryActions";
import * as user_activity_actions from "./userActivityActions";
import * as user_account_settings_actions from "./userAccountSettings";
import * as user_payment_actions from "./userPaymentActions";
import * as user_fav_actions from "./userFavsActions";
import * as user_claim_actions from "./userClaimActions";
import * as user_refer_n_earn_actions from "./userReferralActions";
import * as user_link_actions from "./userLinkActions";

module.exports = {
  ...user_dashboard_actions,
  ...user_account_settings_actions,
  ...user_activity_actions,
  ...user_summary_actions,
  ...user_fav_actions,
  ...user_payment_actions,
  ...user_claim_actions,
  ...user_refer_n_earn_actions,
  ...user_link_actions,
};
