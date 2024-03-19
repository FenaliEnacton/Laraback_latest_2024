import { all } from 'redux-saga/effects';
import { watch_meta_data_request } from './metaDataSaga';
import { watch_user_auth_request } from './userAuthSaga';
import { watch_public_data_request } from './publicDataSaga';
import { watch_user_data_request } from './user';
import { watch_user_dashboard_request } from '../USER_REDUX/Sagas/userDashboardSaga';
import { watch_user_activities_request } from '../USER_REDUX/Sagas/userActivitySaga';
import { watch_user_claim_request } from '../USER_REDUX/Sagas/userClaimSaga';
import { watch_user_payment_request } from '../USER_REDUX/Sagas/userPaymentSaga';
import { watch_user_referral_request } from '../USER_REDUX/Sagas/userReferralSaga';
import { watch_user_summary_request } from '../USER_REDUX/Sagas/userSummarySaga';
import { watch_user_fav_request } from '../USER_REDUX/Sagas/userFavsSaga';
import { watch_user_account_settings_request } from '../USER_REDUX/Sagas/userAccountSettingsSaga';
import { watch_user_link_request } from '../USER_REDUX/Sagas/userLinkSaga';
// import {watch_user_dashboard_request} from '@user_redux/Sagas/userDashboardSaga';
// import {watch_user_account_settings_request} from '@user_redux/Sagas/userAccountSettingsSaga';
// import {watch_user_activities_request} from '@user_redux/Sagas/userActivitySaga';
// import {watch_user_link_request} from '@user_redux/Sagas/userLinkSaga';
// import {watch_user_claim_request} from '@user_redux/Sagas/userClaimSaga';
// import {watch_user_payment_request} from '@user_redux/Sagas/userPaymentSaga';
// import {watch_user_referral_request} from '@user_redux/Sagas/userReferralSaga';
// import {watch_user_summary_request} from '@user_redux/Sagas/userSummarySaga';
// import {watch_user_fav_request} from '@user_redux/Sagas/userFavsSaga';

function* rootSaga() {
  [
    yield all([
      watch_meta_data_request(),
      watch_public_data_request(),
      watch_user_auth_request(),
      watch_user_data_request(),
      watch_user_dashboard_request(),
      watch_user_activities_request(),
      watch_user_claim_request(),
      watch_user_payment_request(),
      watch_user_referral_request(),
      watch_user_summary_request(),
      watch_user_fav_request(),
      watch_user_account_settings_request(),
      watch_user_link_request(),
    ]),
  ];
}
export default rootSaga;
