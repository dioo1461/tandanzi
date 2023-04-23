import jwtDecode from "jwt-decode";
import { updateAuthAxiosJwt } from "./axiosFactory";

const tokenName = 'accessToken';

export const removeAccessToken = () => {
    localStorage.removeItem(tokenName);
}

export const checkIsAccessTokenAvailable = () => {
    if (localStorage.getItem(tokenName)) {
        return true;
    }
    return false;
}

export const storeAccessToken = (jwt) => {
    //console.log('origin token : ', localStorage.getItem(tokenName));
    localStorage.setItem(tokenName, jwt);
    //console.log('stored new token : ', localStorage.getItem(tokenName));
    updateAuthAxiosJwt(jwt);
}

export const getAccessToken = () => {
    return localStorage.getItem(tokenName);
}

export const decodeAccessToken = async() => {
    const token = localStorage.getItem(tokenName);
    return jwtDecode.decode(token);
}