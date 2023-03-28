import { EMAIL_ERROR_TYPE, PASS_ERROR_TYPE } from "routes/auth/Signup";

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
        }
    }
    if (!val) {
        return PASS_ERROR_TYPE.unpermitted_word;
    }

    val = false;
    for (let i = 0; i < password.length; i++) {
        if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?~]/.test(password[i])) {
            val = true;
            break;
        }
    }
    if (!val) {
        return PASS_ERROR_TYPE.non_special;
    }

    if (password != passwordConfirmation) {
        return PASS_ERROR_TYPE.confirmation_unmatch;
    }

    return PASS_ERROR_TYPE.confirmed;
}