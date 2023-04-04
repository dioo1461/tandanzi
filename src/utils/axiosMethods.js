import axios from 'axios';
import { getAccessToken } from './accessTokenMethods';


export const defaultAxios = (url, options) => {
    return axios.create({ url: url, ...options });
}

export const authAxios = (url, options) => {
    const token = getAccessToken();
    return axios.create(
        {
            headers: { Authorization: 'Bearer ' + token },
            url: url,
            ...options,
        })
}