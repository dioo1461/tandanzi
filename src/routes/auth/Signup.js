import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { UnwrittenBadge, ConfirmedBadge, ErrorBadge } from "components/auth/signup/SignupBadges";
import { ValidateEmailForm, ValidatePasswordForm, ValidateUsernameForm } from "components/auth/signup/ValidateSignupForm";
import { SignupErrorTooltip, PasswordConfirmationUnmatchTooltip, PasswordNonmixedTooltip, PasswordShortLengthTooltip, PasswordUnpermittedWordTooltip } from "components/auth/signup/SignupErrorTooltip";
import { isExternalModuleNameRelative } from "typescript";
import { CheckEmailUnique, CheckUsernameUnique, SubmitSignupForm } from "api/auth/signupAxiosRequests";
import { CheckDuplicationButton, ReInputButton } from "components/auth/signup/SignupFormButtons";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "api/auth/loginAxiosRequests.js";

export const EMAIL_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    invalid_form: 'invalid_form', // 이메일 형식 미부합
    existing_email: 'existing_email', // 이미 존재하는 이메일
}

export const PASS_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    short_length: 'short_length', // 최소 6자
    unpermitted_character: 'unpermitted_character', // 영어, 숫자, 특수문자만 가능
    non_mixed: 'non_mixed', // 특수문자 최소 1개 포함
    confirmation_unmatch: 'confirmation_unmatch', // 두 비밀번호가 일치하지 않음
}

export const USERNAME_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    existing_username: 'existing_username'
}

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState('');

    const [emailError, setEmailError] = useState(EMAIL_ERROR_TYPE.unwritten);
    const [passwordError, setPasswordError] = useState(PASS_ERROR_TYPE.unwritten);
    const [usernameError, setUsernameError] = useState(USERNAME_ERROR_TYPE.unwritten);

    const [isEmailErrorEnabled, setIsEmailErrorEnabled] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [isPasswordErrorEnabled, setIsPasswordErrorEnabled] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [isUsernameErrorEnabled, setIsUsernameErrorEnabled] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState('');

    const [isEmailUnique, setIsEmailUnique] = useState(false);
    const [isUsernameUnique, setIsUsernameUnique] = useState(false);

    const emailBadgeRef = useRef(null);
    const passwordBadgeRef = useRef(null);
    const usernameBadgeRef = useRef(null);
    //const emailBadgeRef = useRef(null);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const error = ValidateEmailForm(e.target.value);
        setEmailError(error);

    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const error = ValidatePasswordForm(e.target.value, passwordConfirmation);
        setPasswordError(error);
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
        const error = ValidatePasswordForm(password, e.target.value);
        setPasswordError(error);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        const error = ValidateUsernameForm(e.target.value);
        setUsernameError(error);

    }

    useEffect(() => {
        switch (emailError) {
            case EMAIL_ERROR_TYPE.unwritten:
            case EMAIL_ERROR_TYPE.confirmed:
                setIsEmailErrorEnabled(false);
                break;
            case EMAIL_ERROR_TYPE.invalid_form:
                setIsEmailErrorEnabled(true);
                setEmailErrorText('유효한 형식의 이메일을 입력해야 합니다.');
                break;
            case EMAIL_ERROR_TYPE.existing_email:
                setIsEmailErrorEnabled(true);
                setEmailErrorText('중복된 이메일이 존재합니다.');
                break;
        }
    }, [emailError])

    useEffect(() => {
        switch (passwordError) {
            case PASS_ERROR_TYPE.unwritten:
            case PASS_ERROR_TYPE.confirmed:
                setIsPasswordErrorEnabled(false);
                break;
            case PASS_ERROR_TYPE.short_length:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText('비밀번호는 최소 6자 이상이어야 합니다.');
                break;
            case PASS_ERROR_TYPE.unpermitted_character:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText('비밀번호는 영어, 숫자, 특수문자로 구성되어야 합니다.');
                break;
            case PASS_ERROR_TYPE.non_mixed:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText('비밀번호에는 각각 최소 1개의 영어, 숫자, 특수문자가 포함되어야 합니다.');
                break;
            case PASS_ERROR_TYPE.confirmation_unmatch:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText('두 비밀번호가 일치하지 않습니다.');
                break;
        }
    }, [passwordError])

    useEffect(() => {
        switch (usernameError) {
            case USERNAME_ERROR_TYPE.unwritten:
            case USERNAME_ERROR_TYPE.confirmed:
                setIsUsernameErrorEnabled(false);
                break;
            case USERNAME_ERROR_TYPE.existing_username:
                setIsUsernameErrorEnabled(true);
                setUsernameErrorText('중복된 닉네임이 존재합니다.');
                break;
        }
    }, [usernameError])

    const checkEmailUnique = async () => {
        await CheckEmailUnique(email)
            .then(res => {
                setIsEmailUnique(res);
                if (res) {
                    setEmailError(EMAIL_ERROR_TYPE.confirmed);
                } else {
                    setEmailError(EMAIL_ERROR_TYPE.existing_email);
                }
            });
    }

    const checkUsernameUnique = async () => {
        await CheckUsernameUnique(username)
            .then(res => {
                setIsUsernameUnique(res);
                if (res) {
                    setUsernameError(USERNAME_ERROR_TYPE.confirmed);
                } else {
                    setUsernameError(USERNAME_ERROR_TYPE.existing_username);
                }
            });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
            username: username
        }
        const signupSuccess = await SubmitSignupForm(data);
        if (signupSuccess) {
            const { username, ...rest } = data;
            const loginSuccess = await requestLogin(rest);
            console.log('loginSuccess:', loginSuccess);
            if (loginSuccess) {
                navigate('/profile/edit');
            } else {
                navigate('/auth');
            }
        }
    }

    return (
        <Container className='justify-content-center' fluid>
            <Row>
                <Col xs={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId='formBasicEmail'>
                        <Form.Label className='me-2' >이메일</Form.Label>
                        {emailError === EMAIL_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {emailError === EMAIL_ERROR_TYPE.invalid_form && <ErrorBadge ref={emailBadgeRef} />}
                        {emailError === EMAIL_ERROR_TYPE.existing_email && <ErrorBadge ref={emailBadgeRef} />}
                        {emailError === EMAIL_ERROR_TYPE.confirmed &&
                            <>
                                <ConfirmedBadge />
                                {isEmailUnique ?
                                    <ReInputButton onClick={() => setIsEmailUnique(false)} />
                                    :
                                    <CheckDuplicationButton onClick={checkEmailUnique} />
                                }
                            </>
                        }
                        <SignupErrorTooltip
                            target={emailBadgeRef}
                            show={isEmailErrorEnabled}
                            text={emailErrorText}
                        />
                        {isEmailUnique ?
                            <Form.Control disabled type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                            :
                            <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='formBasicEmail'>
                        <Form.Label className='me-2' >닉네임</Form.Label>
                        {usernameError === USERNAME_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {usernameError === USERNAME_ERROR_TYPE.existing_username && <ErrorBadge ref={usernameBadgeRef} />}
                        {usernameError === USERNAME_ERROR_TYPE.confirmed &&
                            <>
                                <ConfirmedBadge />
                                {isUsernameUnique ?
                                    <ReInputButton onClick={() => setIsUsernameUnique(false)} />
                                    :
                                    <CheckDuplicationButton onClick={checkUsernameUnique} />
                                }
                            </>
                        }
                        <SignupErrorTooltip
                            target={usernameBadgeRef}
                            show={isUsernameErrorEnabled}
                            text={usernameErrorText}
                        />
                        {isUsernameUnique ?
                            <Form.Control disabled value={username} placeholder='ex) nickname12' />
                            :
                            <Form.Control value={username} onChange={handleUsernameChange} placeholder='ex) nickname12' />
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='me-2'>비밀번호</Form.Label>
                        {passwordError === PASS_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {(
                            passwordError === PASS_ERROR_TYPE.short_length
                            || passwordError === PASS_ERROR_TYPE.unpermitted_character
                            || passwordError === PASS_ERROR_TYPE.non_mixed
                            || passwordError === PASS_ERROR_TYPE.confirmation_unmatch
                        )
                            &&
                            <ErrorBadge ref={passwordBadgeRef} />}
                        {passwordError === PASS_ERROR_TYPE.confirmed && <ConfirmedBadge />}
                        <SignupErrorTooltip
                            target={passwordBadgeRef}
                            show={isPasswordErrorEnabled}
                            text={passwordErrorText}
                        />
                        <Form.Control type='password' value={password} onChange={handlePasswordChange} placeholder='ex) abcd1234!' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label className='me-2'>비밀번호 확인</Form.Label>
                        <Form.Control type='password' value={passwordConfirmation} onChange={handlePasswordConfirmationChange} placeholder='ex) abcd1234!' />
                    </Form.Group>
                    {emailError === EMAIL_ERROR_TYPE.confirmed && isEmailUnique
                        && passwordError === PASS_ERROR_TYPE.confirmed
                        && usernameError === USERNAME_ERROR_TYPE.confirmed && isUsernameUnique ?
                        <Button variant='primary' type='submit' >회원가입</Button>
                        :
                        <Button variant='primary' type='submit' disabled>회원가입</Button>
                    }
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup;