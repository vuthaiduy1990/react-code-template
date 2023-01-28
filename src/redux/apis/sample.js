import axios from 'axios';

import HttpStatus from '@@const/http-status';

/**
 * Get employee ajxa call
 */
export const getEmployees = () => {
  return axios({
    method: 'get',
    url: '/api/v1/employees',

    // this url has been configure as default.
    // @ee gastby-browser.js
    // baseURL: 'http://dummy.restapiexample.com/',
  }).then((res) => {
    if (res.status === HttpStatus.OK) {
      return res.data.data;
    }
    return Promise.reject(new Error(res.status));
  });
};
