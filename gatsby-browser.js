import axios from 'axios';

import './src/vars.css';
import './src/global.css';
import './i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Configure axios defaults and interceptor here
// https://github.com/axios/axios
axios.defaults.baseURL = process.env.GATSBY_DUMMY_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
