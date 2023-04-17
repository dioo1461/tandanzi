import axios from 'axios';
import { authAxios } from 'utils/axiosFactory';


export const getMyUser = async () => {
    return await authAxios.get('/users/my')
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