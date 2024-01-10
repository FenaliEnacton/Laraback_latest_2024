import apisauce from 'apisauce';
import {is_app} from '../Utils';
import Config from 'react-native-config';
import get_url_value from './api_routes';
export const internalApi = apisauce.create({
  baseURL: Config.API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
  withCredentials: true,
  // timeout: 10000,
});

const publicAPI = dataType => {
  return internalApi.get(dataType);
};

const user_app_api = (route_name, append_url = null, header) => {
  let url = Config.API_URL + get_url_value(route_name);
  if (append_url) {
    url = url + append_url;
  }
  return internalApi.get(url);
};
const user_post_app_api = (route_name, body = {}, append_url = null, header) => {
  let url = Config.API_URL + get_url_value(route_name);
  if (append_url) {
    url = url + append_url;
  }
  return internalApi.post(url, body);
};

const user_web_api = (route_name, append_url = null, query, header) => {
  let url = Config.API_URL + get_url_value(route_name);
  if (append_url) {
    url = url + append_url;
  }
  return internalApi.get(url, query);
};

const user_post_web_api = (route_name, body = {}, append_url = null, header) => {
  let url = Config.API_URL + get_url_value(route_name);
  if (append_url) {
    url = url + append_url;
  }
  return internalApi.post(url, body);
};

const user_auth_api = (url, body, header) => {
  return new Promise((resolve, reject) => {
    internalApi.get(Config.API_URL + '/auth/csrf-token').then(res => {
      // console.log(res);
      if (res.ok) {
        let request_body = {
          ...body,
          _token: res.data,
        };
        resolve(internalApi.post(Config.API_URL + get_url_value(url), request_body, {}));
      } else {
        reject();
      }
    });
  });
};

const user_api = {
  publicAPI,
  user_dashboard_api: is_app() ? user_app_api : user_web_api,
  user_dashboard_post_api: is_app() ? user_post_app_api : user_post_web_api,
  user_auth_api,
};

export default user_api;

//Claim.info route missing
