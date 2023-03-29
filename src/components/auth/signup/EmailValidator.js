const { default: axios } = require("axios")


const EmailValidator = ({email, setIsEmailUnique}) => {

    

}

export const RequestEmailValidation = async(email) => {
    await axios.get(`/users/${email}`)
    .then(res => {
        if (res !== undefined) {
            console.log(res); // res가 undefined여도 true취급인지 확인

            return true;
        }
    })
    .catch(err => { });
    return false;
}
 