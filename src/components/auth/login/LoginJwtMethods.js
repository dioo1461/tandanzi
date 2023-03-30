

const token = 'loginToken';

export const RemoveLoginToken = () => {
    localStorage.removeItem(token);
}

export const CheckIsLoggedIn = () => {
    if (localStorage.getItem(token)) {
        console.log(token);
        return true;
    }
    return false;
}

export const StoreLoginToken = (jwt) => {
    localStorage.setItem(token, jwt);
}