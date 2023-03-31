import axios from "axios";


export const CheckEmailUnique = async (email) => {
    const params = { email: email }
    const res = await axios.get('/users', { params });

    if (res.data === '') {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

export const CheckUsernameUnique = async (username) => {
    const params = { username: username }
    const res = await axios.get('/users', { params });

    if (res.data === '') {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

/**  */
export const SubmitSignupForm = async (data) => {
    return await axios.post('/users', data)
    .then(res => {
        console.log('then');
        return true;
    })
    .catch(err => {
        return false;
    })
}

