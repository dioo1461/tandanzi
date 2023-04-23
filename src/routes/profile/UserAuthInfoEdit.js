import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row, Alert } from "react-bootstrap"
import { UnwrittenBadge, ConfirmedBadge, ErrorBadge } from "components/auth/signup/SignupBadges";
import { ValidateEmailForm, ValidatePasswordForm, ValidateUsernameForm } from "components/auth/signup/methods/validateSignupForm";
import { SignupErrorTooltip, PasswordConfirmationUnmatchTooltip, PasswordNonmixedTooltip, PasswordShortLengthTooltip, PasswordUnpermittedWordTooltip } from "components/auth/signup/SignupErrorTooltip";
import { isExternalModuleNameRelative } from "typescript";
import { checkEmailUnique, checkUsernameUnique, submitSignupForm, updateAuthInfo } from "api/auth/signupAxiosRequests";
import { CheckDuplicationButton, ReInputButton } from "components/auth/signup/SignupFormButtons";
import { useNavigate } from "react-router-dom";
import { checkPassword, requestLogin } from "api/auth/loginAxiosRequests.js";
import { EMAIL_ERROR_TYPE, PASS_ERROR_TYPE, USERNAME_ERROR_TYPE } from "components/auth/signup/methods/signupErrorTypes";
import { getMyAuthInfo, } from "api/users/userAxiosRequests";
import { EMAIL_ERROR_MESSAGE, PASS_ERROR_MESSAGE, USERNAME_ERROR_MESSAGE } from "components/auth/signup/methods/signupErrorMessages";


const UserAuthInfoEdit = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loginAttemptCount, setLoginAttemptCount] = useState(0);

    const [originEmail, setOriginEmail] = useState('');
    const [originUsername, setOriginUsername] = useState('');

    const [latestEmail, setLatestEmail] = useState('');
    const [latestUsername, setLatestUsername] = useState('');
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState('');

    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isUsernameEditing, setIsUsernameEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);

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
        if (e.target.value === originEmail) {
            setEmailError(EMAIL_ERROR_TYPE.unwritten);
        } else {
            const error = ValidateEmailForm(e.target.value);
            setEmailError(error);
        }
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
        getMyAuthInfo()
        .then(user => {
            setOriginEmail(user.email);
            setLatestEmail(user.email);
            setOriginUsername(user.username);
            setLatestUsername(user.username);
            setEmail(user.email);
            setUsername(user.username);
        });
    }, [])

    useEffect(() => {
        switch (emailError) {
            case EMAIL_ERROR_TYPE.unwritten:
            case EMAIL_ERROR_TYPE.confirmed:
                setIsEmailErrorEnabled(false);
                break;
            case EMAIL_ERROR_TYPE.invalid_form:
                setIsEmailErrorEnabled(true);
                setEmailErrorText(EMAIL_ERROR_MESSAGE.invalid_form);
                break;
            case EMAIL_ERROR_TYPE.existing_email:
                setIsEmailErrorEnabled(true);
                setEmailErrorText(EMAIL_ERROR_MESSAGE.existing_email);
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
                setPasswordErrorText(PASS_ERROR_MESSAGE.short_length);
                break;
            case PASS_ERROR_TYPE.unpermitted_character:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText(PASS_ERROR_MESSAGE.unpermitted_character);
                break;
            case PASS_ERROR_TYPE.non_mixed:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText(PASS_ERROR_MESSAGE.non_mixed);
                break;
            case PASS_ERROR_TYPE.confirmation_unmatch:
                setIsPasswordErrorEnabled(true);
                setPasswordErrorText(PASS_ERROR_MESSAGE.confirmation_unmatch);
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
                setUsernameErrorText(USERNAME_ERROR_MESSAGE.existing_username);
                break;
        }
    }, [usernameError])

    const handleEmailDuplicationCheck = async () => {
        await checkEmailUnique(email)
            .then(res => {
                setIsEmailUnique(res);
                if (res) {
                    setEmailError(EMAIL_ERROR_TYPE.confirmed);
                } else {
                    setEmailError(EMAIL_ERROR_TYPE.existing_email);
                }
            });
    }

    const handleUsernameDuplicationCheck = async () => {
        await checkUsernameUnique(username)
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
        const signupSuccess = await submitSignupForm(data);
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

    const handleEmailChangeCancel = () => {
        setEmail(originEmail);
        setEmailError(EMAIL_ERROR_TYPE.unwritten);
        setIsEmailEditing(false);
        setIsEmailUnique(false);
    }

    const handleEmailChangeConfirm = () => {
        console.log('email: ', email, 'pass: ', password, 'originEmail: ',originEmail);
        updateAuthInfo({email: email})
        .then(res => {
            console.log('email: ',email, 'pass: ', password);
            return requestLogin({email: email, password: password});
        })
        .then(res => {
            setOriginEmail(email);
            setEmailError(EMAIL_ERROR_TYPE.unwritten);
            setIsEmailEditing(false);
            setIsEmailUnique(false);
            console.log(res);
        })
    }

    const handleAuthorization = (e) => {
        e.preventDefault();
        checkPassword(password)
            .then(res => {
                console.log(res)
                if (res) {
                    setIsAuthorized(true);
                } else {
                    setLoginAttemptCount(prev => prev + 1);
                }
            })
    }

    return (
        <div>
            {isAuthorized ?
                <Container className='justify-content-center' fluid>
                    <Row>
                        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleSubmit}>
                                {!isEmailEditing ?
                                    <div>
                                        <Row className='mt-4 mb-3'>
                                            <Col>
                                                이메일 : {originEmail}
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col>
                                                <Button onClick={() => setIsEmailEditing(!isEmailEditing)}>수정</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    :
                                    <div>
                                        <Row>
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
                                                            <CheckDuplicationButton onClick={handleEmailDuplicationCheck} />
                                                        }
                                                    </>
                                                }
                                                <SignupErrorTooltip
                                                    target={emailBadgeRef}
                                                    show={isEmailErrorEnabled}
                                                    text={emailErrorText}
                                                />
                                                {isEmailUnique ?
                                                    <Form.Control disabled type='email' value={email} placeholder='ex) abc@gmail.com' />
                                                    :
                                                    <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                                                }
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {emailError === EMAIL_ERROR_TYPE.confirmed && isEmailUnique ?
                                                    <Button variant='primary' onClick={handleEmailChangeConfirm}>완료</Button>
                                                    :
                                                    <Button variant='primary' disabled>완료</Button>
                                                }
                                                <Button className='ms-2' variant='secondary' onClick={handleEmailChangeCancel}>취소</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                }
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
                :
                <Container className='justify-content-center' fluid>
                    <Row className='mt-5'>
                        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleAuthorization}>
                                <Form.Group>
                                    <Form.Label>비밀번호를 입력하세요</Form.Label>
                                    <Form.Control className="mb-3" type='password' value={password} onChange={handlePasswordChange} placeholder='ex) abcd1234!' />
                                </Form.Group>
                                <Button variant='primary' type='submit'>확인</Button>
                                <Button className='ms-2' variant='secondary' >취소</Button>
                            </Form>
                            {loginAttemptCount > 0 ?
                                <Alert className='mt-2' variant='danger'>{`비밀번호가 틀립니다. - ${loginAttemptCount}`}</Alert>
                                :
                                null
                            }
                        </Col>
                    </Row>
                </Container>
            }
        </div >
    )
}

export default UserAuthInfoEdit;