import axios from 'axios';
import { authAxios } from 'utils/axiosFactory';


export const getUserInstance = async () => {
    return await authAxios.get('/users')
    .then(res => {
        if (res.data === '') {
            return null;
        }
        return res.data;
    })
    .catch(err => {
        return null;
    });
}