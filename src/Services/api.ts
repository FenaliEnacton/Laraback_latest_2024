import { Config } from '@/react-native-config';
import apisauce from 'apisauce';

export const rootApi = apisauce.create({
  baseURL: Config.API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
  // timeout: 10000,
});

const publicAPI = (url): Promise<any> => {
  return rootApi.get(url);
};

const publicPostAPI = (url: any, body?: any, header?: any): Promise<any> => {
  return rootApi.post(url, body, {});
};

const user_auth_api = (url: any, body?: any, header?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    rootApi.get(Config.API_URL + '/auth/csrf-token').then(res => {
      // console.log(res);
      if (res.ok) {
        let request_body = {
          ...body,
          _token: res.data,
        };
        resolve(rootApi.post(Config.API_URL + '/' + url, request_body, {}));
      } else {
        reject();
      }
    });
  });
};

export const userFbLogin = token => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(async responseJson => {
        return resolve(responseJson);
      })
      .catch(e => {
        console.log(e);
        let error = {
          message: 'Server not responding!',
        };
        reject(error);
      });
  });
};

export const api = {
  publicAPI,
  publicPostAPI,
  user_auth_api,
};

export default api;
