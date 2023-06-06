import { removeAccessToken } from "./accessTokenMethods";

export const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
}