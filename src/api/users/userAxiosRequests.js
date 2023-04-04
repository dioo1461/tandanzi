import axios from 'axios';


const getUserPropsByEmail = async (email) => {
    const params = {email:email};
    return await axios.get('/users', params)
    .then(res => {
        if (res.data === '') {
            return null;
        }
        return res.data;
    })
    .catch(err => err);

}