import { useEffect, useRef, useState } from "react"
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap"
import { UnwrittenBadge, ConfirmedBadge, ErrorBadge } from "components/auth/signup/SignupBadges";
import { ValidateEmailForm, ValidatePasswordForm } from "components/auth/signup/ValidateSignupForm";
import { EmailInvalidFormTooltip, PasswordConfirmationUnmatchTooltip, PasswordNonSpecialTooltip, PasswordShortLengthTooltip, PasswordUnpermittedWordTooltip } from "components/auth/signup/SignupTooltips";
import { Input } from "@mui/material";
import { isExternalModuleNameRelative } from "typescript";

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
    unpermitted_word: 'unpermitted_word', // 영어, 숫자, 특수문자만 가능
    non_special: 'non_special', // 특수문자 최소 1개 포함
    confirmation_unmatch: 'confirmation_unmatch', // 두 비밀번호가 일치하지 않음
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nickName, setNickName] = useState('');

    const [emailError, setEmailError] = useState(EMAIL_ERROR_TYPE.unwritten);
    const [passwordError, setPasswordError] = useState(PASS_ERROR_TYPE.unwritten);

    const emailBadgeRef = useRef(null);
    const passwordBadgeRef = useRef(null);
    //const emailBadgeRef = useRef(null);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(ValidateEmailForm(e.target.value));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(ValidatePasswordForm(e.target.value, passwordConfirmation));
    }
    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
        setPasswordError(ValidatePasswordForm(password, e.target.value));
    }

    const handleSubmit = (e) => {

    }

    const handleEmailError = () => {
        if (emailError === EMAIL_ERROR_TYPE.unwritten) {
            emailBadgeRef = 1;
        }
    }

    // useEffect(() => {
    //     console.log(emailBadgeRef.current)
    //     console.log(passwordBadgeRef.current)
    // }, [emailBadgeRef.current, passwordBadgeRef.current])

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="mb-3" controlId='formBasicEmail'>
                        <Form.Label className='me-2'>이메일</Form.Label>
                        {emailError === EMAIL_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {emailError === EMAIL_ERROR_TYPE.invalid_form &&
                            <>
                                <ErrorBadge ref={emailBadgeRef} />
                                <EmailInvalidFormTooltip target={emailBadgeRef} />
                            </>
                        }
                        {emailError === EMAIL_ERROR_TYPE.confirmed && <ConfirmedBadge />}

                        <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label className='me-2'>비밀번호</Form.Label>
                        {passwordError === PASS_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {passwordError === PASS_ERROR_TYPE.short_length
                            &&
                            <>
                                <ErrorBadge ref={passwordBadgeRef} />
                                <PasswordShortLengthTooltip target={passwordBadgeRef} />
                            </>
                        }
                        {passwordError === PASS_ERROR_TYPE.unpermitted_word
                            &&
                            <>
                                <ErrorBadge ref={passwordBadgeRef} />
                                <PasswordUnpermittedWordTooltip target={passwordBadgeRef} />
                            </>
                        }
                        {passwordError === PASS_ERROR_TYPE.non_special
                            &&
                            <>
                                <ErrorBadge ref={passwordBadgeRef} />
                                <PasswordNonSpecialTooltip target={passwordBadgeRef} />
                            </>
                        }
                        {passwordError === PASS_ERROR_TYPE.confirmation_unmatch
                            &&
                            <>
                                <ErrorBadge ref={passwordBadgeRef} />
                                <PasswordConfirmationUnmatchTooltip target={passwordBadgeRef} />
                            </>
                        }
                        {passwordError === PASS_ERROR_TYPE.confirmed && <ConfirmedBadge />}
                        <Form.Control type='password' value={password} onChange={handlePasswordChange} placeholder='ex) abcd1234!' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className='mb-3'>
                        <Form.Label className='me-2'>비밀번호 확인</Form.Label>
                        <Form.Control type='password' value={passwordConfirmation} onChange={handlePasswordConfirmationChange} placeholder='ex) abcd1234!' />
                    </Form.Group>
                </Row>
                <Button variant='primary' type='submit'>회원가입</Button>
            </Form>
        </Container>
    )
}

export default Signup;