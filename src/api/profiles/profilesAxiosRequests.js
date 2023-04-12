import axios from 'axios';
import { authAxios } from 'utils/axiosFactory';


export const getProfile = async () => {
    return await authAxios.get('/profiles')
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

export const createProfile = async (data) => {
    return await authAxios.post('/profiles', data)
        .then(res => {

        })
        .catch(err => {
            throw err;
        })
}

export const updateProfile = async () => {

}