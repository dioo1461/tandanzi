

export const CheckIsLoggedIn = () => {
    if (localStorage.getItem('loginToken')) {
        return true;
    }
    return false;
}