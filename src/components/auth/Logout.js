
export const Logout = () => {
    localStorage.removeItem('loginToken');
    window.location.reload();
}