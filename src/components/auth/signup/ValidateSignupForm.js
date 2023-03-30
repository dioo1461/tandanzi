import { EMAIL_ERROR_TYPE, PASS_ERROR_TYPE, USERNAME_ERROR_TYPE } from "routes/auth/Signup";

export const ValidateEmailForm = (email) => {
    if (email === '') {
        return EMAIL_ERROR_TYPE.unwritten;
    }

    let val = false;
    let i = 0;
    for (i; i < email.length; i++) {
        if (email[i] === '@') {
            break;
        }
    }
    if (email.length - 1 > i) {
        val = true;
    }
    if (!val) {
        return EMAIL_ERROR_TYPE.invalid_form;
    }

    return EMAIL_ERROR_TYPE.confirmed;

}

export const ValidatePasswordForm = (password, passwordConfirmation) => {
    if (password === '') {
        return PASS_ERROR_TYPE.unwritten;
    }

    if (password.length < 6) {
        return PASS_ERROR_TYPE.short_length;
    }

    let val = true;
    for (let i = 0; i < password.length; i++) {
        if (!(/[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password[i]))) {
            val = false;
            break;
        } // ### sql injection 취약점 ###
    }
    if (!val) {
        return PASS_ERROR_TYPE.unpermitted_word;
    }

    let special, eng, num = false;
    for (let i = 0; i < password.length; i++) {
        if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?~]/.test(password[i])) {
            special = true;
            break;
        }
    }
    for (let i = 0; i < password.length; i++) {
        if (/[a-zA-Z]/.test(password[i])) {
            eng = true;
            break;
        }
    }
    for (let i = 0; i < password.length; i++) {
        if (/[0-9]/.test(password[i])) {
            num = true;
            break;
        }
    }
    if (!special || !eng || !num) {
        return PASS_ERROR_TYPE.non_mixed;
    }

    if (password != passwordConfirmation) {
        return PASS_ERROR_TYPE.confirmation_unmatch;
    }

    return PASS_ERROR_TYPE.confirmed;
}

export const ValidateUsernameForm = (username) => {
    if (username==='') {
        return USERNAME_ERROR_TYPE.unwritten;
    }

    return USERNAME_ERROR_TYPE.confirmed;
}
