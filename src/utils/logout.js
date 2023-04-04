import { removeAccessToken } from "./accessTokenMethods";

export const logout = () => {
    removeAccessToken();
    window.location.reload();
}