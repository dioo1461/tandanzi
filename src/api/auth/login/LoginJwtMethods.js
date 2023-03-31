import axios from "axios";


const tokenName = 'loginToken';

export const RemoveLoginToken = () => {
    localStorage.removeItem(tokenName);
}

export const CheckIsLoggedIn = () => {
    if (localStorage.getItem(tokenName)) {
        console.log(tokenName);
        return true;
    }
    return false;
}

export const StoreLoginToken = (jwt) => {
    localStorage.setItem(tokenName, jwt);
}

export const DecodeLoginToken = async() => {
    const token = localStorage.getItem(tokenName);
    axios.post('/auth')

}