import { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidator, setPasswordValidator] = useState('');
    const [nickName, setNickName] = useState('');


    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordValidatorChange = (e) => setPasswordValidator(e.target.value);

    const handleSubmit = (e) => {

    }
    

    return (
        <Container className='justify-content-center'>
                <Form  onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group className="mb-3" controlId='formBasicEmail'>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='ex) abc@gmail.com' />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control className="mb-3" type='password' value={password} onChange={handlePasswordChange} placeholder='ex) abcd1234!' />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control className="mb-3" type='password' value={passwordValidator} onChange={handlePasswordValidatorChange} placeholder='ex) abcd1234!' />
                        </Form.Group>
                    </Row>
                    <Button variant='primary' type='submit'>확인</Button>
                </Form>
        </Container>
    )
}

export default SignUp;