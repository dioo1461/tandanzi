import axios from "axios";
import { storeAccessToken } from "../../../utils/accessTokenMethods";

/** API서버에 Login 요청을 보내고, 토큰을 localStorage에 저장
 * @returns: 요청 성공시 true, 요청 실패시 해당 false 반환
 */
export const requestLogin = async (data) => {
    return axios.post('/auth/login', data)
        .then(response => {
            // console.log('res: ', response);
            storeAccessToken(response.data.access_token);
            return true;
            // console.log(localStorage.getItem('token'));
        })
        .catch(error => {
            return error;
        });
}