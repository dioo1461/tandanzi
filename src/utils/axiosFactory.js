import axios from 'axios';
import { getAccessToken } from './accessTokenMethods';
import { useState } from 'react';

const BASE_URL = 'http://localhost:3100'

export const createAxios = (options) => {
    return axios.create({ baseURL: BASE_URL, ...options });
}

export const createAuthAxios = (options) => {
    const token = getAccessToken();
    return axios.create(
        {
            headers: { Authorization: 'Bearer ' + token },
            baseURL: BASE_URL,
            ...options,
        })
}

export const updateAuthAxiosJwt = (token) => {
    authAxios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const defaultAxios = createAxios();
export const authAxios = createAuthAxios();