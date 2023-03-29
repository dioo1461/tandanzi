import { useEffect, useRef, useState } from "react"
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap"
import { UnwrittenBadge, ConfirmedBadge, ErrorBadge } from "components/auth/signup/SignupBadges";
import { ValidateEmailForm, ValidatePasswordForm } from "components/auth/signup/ValidateSignupForm";
import { SignupErrorTooltip, PasswordConfirmationUnmatchTooltip, PasswordNonmixedTooltip, PasswordShortLengthTooltip, PasswordUnpermittedWordTooltip } from "components/auth/signup/SignupErrorTooltip";
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
    non_mixed: 'non_mixed', // 특수문자 최소 1개 포함
    confirmation_unmatch: 'confirmation_unmatch', // 두 비밀번호가 일치하지 않음
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nickName, setNickName] = useState('');

    const [emailError, setEmailError] = useState(EMAIL_ERROR_TYPE.unwritten);
    const [passwordError, setPasswordError] = useState(PASS_ERROR_TYPE.unwritten);

    const [isEmailErrorTooltipEnabled, setIsEmailErrorTooltipEnabled] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [isPasswordErrorTooltipEnabled, setIsPasswordErrorTooltipEnabled] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const [isEmailUnique, setIsEmailUnique] = useState(false);

    const emailBadgeRef = useRef(null);
    const passwordBadgeRef = useRef(null);
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

    const handleSubmit = (e) => {

    }


    useEffect(() => {
        switch (emailError) {
            case EMAIL_ERROR_TYPE.unwritten:
            case EMAIL_ERROR_TYPE.confirmed:
                setIsEmailErrorTooltipEnabled(false);
                break;
            case EMAIL_ERROR_TYPE.invalid_form:
                setIsEmailErrorTooltipEnabled(true);
                setEmailErrorText('유효한 형식의 이메일을 입력해야 합니다.');
                break;
            case EMAIL_ERROR_TYPE.existing_email:
                break;
        }
    }, [emailError])

    useEffect(() => {
        switch (passwordError) {
            case PASS_ERROR_TYPE.unwritten:
            case PASS_ERROR_TYPE.confirmed:
                setIsPasswordErrorTooltipEnabled(false);
                break;
            case PASS_ERROR_TYPE.short_length:
                setIsPasswordErrorTooltipEnabled(true);
                setPasswordErrorText('비밀번호는 최소 6자 이상이어야 합니다.');
                break;
            case PASS_ERROR_TYPE.unpermitted_word:
                setIsPasswordErrorTooltipEnabled(true);
                setPasswordErrorText('비밀번호는 영어, 숫자, 특수문자로 구성되어야 합니다.');
                break;
            case PASS_ERROR_TYPE.non_mixed:
                setIsPasswordErrorTooltipEnabled(true);
                setPasswordErrorText('비밀번호에는 각각 최소 1개의 영어, 숫자, 특수문자가 포함되어야 합니다.');
                break;
            case PASS_ERROR_TYPE.confirmation_unmatch:
                setIsPasswordErrorTooltipEnabled(true);
                setPasswordErrorText('두 비밀번호가 일치하지 않습니다.');
                break;
        }
    }, [passwordError])

    const returnPassErrors = () => {
        return (
            PASS_ERROR_TYPE.short_length ||
            PASS_ERROR_TYPE.unpermitted_word ||
            PASS_ERROR_TYPE.non_mixed ||
            PASS_ERROR_TYPE.confirmation_unmatch
        )
    }

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="mb-3" controlId='formBasicEmail'>
                        <Form.Label className='me-2' >이메일</Form.Label>
                        {emailError === EMAIL_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {emailError === EMAIL_ERROR_TYPE.invalid_form && <ErrorBadge ref={emailBadgeRef} />}
                        {emailError === EMAIL_ERROR_TYPE.confirmed && 
                        <>
                            <ConfirmedBadge />
                            { isEmailUnique ? 
                                <Button disabled className='ms-2' size='sm' variant='outline-primary'>확인 완료</Button>
                                :
                                <Button className='ms-2' size='sm' variant='outline-primary'>중복 확인</Button>
                            }
                        </>
                        }
                        <SignupErrorTooltip
                            target={emailBadgeRef}
                            show={isEmailErrorTooltipEnabled}
                            text={emailErrorText}
                        />
                        { isEmailUnique ?
                            <Form.Control disabled type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                            :
                            <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                        }
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" >
                        <Form.Label className='me-2'>비밀번호</Form.Label>
                        {passwordError === PASS_ERROR_TYPE.unwritten && <UnwrittenBadge />}
                        {(
                            passwordError === PASS_ERROR_TYPE.short_length
                            || passwordError === PASS_ERROR_TYPE.unpermitted_word
                            || passwordError === PASS_ERROR_TYPE.non_mixed
                            || passwordError === PASS_ERROR_TYPE.confirmation_unmatch
                        )
                            &&
                            <ErrorBadge ref={passwordBadgeRef} />}
                        {passwordError === PASS_ERROR_TYPE.confirmed && <ConfirmedBadge />}
                        <SignupErrorTooltip
                            target={passwordBadgeRef}
                            show={isPasswordErrorTooltipEnabled}
                            text={passwordErrorText}
                        />
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