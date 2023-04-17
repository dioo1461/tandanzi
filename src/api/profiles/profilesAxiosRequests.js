import axios from 'axios';
import { toEditorSettings } from 'typescript';
import { authAxios, defaultAxios } from 'utils/axiosFactory';


export const getMyProfile = async () => {
    return await authAxios.get('/profiles/my')
        .then(res => {
            if (res.data === '') {
                return null;
            }
            return res.data;
        })
        .catch(err => {
            throw err;
        });
}

export const getProfile = async (uid) => {
    return await defaultAxios.get(`profiles/${uid}`)
    .then(res => {
        if (res.data === '') {
            return null;
        }
        return res.data;
    })
    .catch(err => {
        throw err;
    })
}

export const createProfile = async (data) => {
    return await authAxios.post('/profiles', data)
        .then(res => {

        })
        .catch(err => {
            throw err;
        })
}

export const updateProfile = async (data) => {
    return await authAxios.post('/profiles', data)
    .then(res => {

    })
    .catch(err => {
        throw err;
    })
}