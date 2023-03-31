import { RemoveLoginToken } from "./login/LoginJwtMethods";

export const Logout = () => {
    RemoveLoginToken();
    window.location.reload();
}