import axios from 'axios';

import {baseURL, API_KEY} from '../constants/urls';

const params = {
    api_key: API_KEY,
};

const apiService = axios.create({baseURL, params});

export {
    apiService,
};