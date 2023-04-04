import jwtDecode from "jwt-decode";

const tokenName = 'accessToken';

export const removeAccessToken = () => {
    localStorage.removeItem(tokenName);
}

export const checkIsAccessTokenAvailable = () => {
    if (localStorage.getItem(tokenName)) {
        console.log(tokenName);
        return true;
    }
    return false;
}

export const storeAccessToken = (jwt) => {
    localStorage.setItem(tokenName, jwt);
}

export const getAccessToken = () => {
    return localStorage.getItem(tokenName);
}

export const decodeAccessToken = async() => {
    const token = localStorage.getItem(tokenName);
    return jwtDecode.decode(token);

}