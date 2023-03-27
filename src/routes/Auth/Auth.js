import axios from "axios";
import { useState } from "react";
import { Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginAttemptCount, setLogiAttemptCount] = useState(0);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {email: email, password: password};


        axios.post('/auth/login', data)
          .then(response => {
            // console.log('res: ', response);
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
            // console.log(localStorage.getItem('token'));
          })
          .catch(error => { 
            setLogiAttemptCount(prev => prev+1);
           });
    }

    return (
        <Container className='justify-content-center'>
            {/* {console.log(localStorage.getItem('token'))} */}
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
                    <Button variant='primary' type='submit'>확인</Button>
                    <Button className='ms-2' variant='light' onClick={()=>navigate('/auth/sign-up')}>회원가입</Button>
                </Form>
                {loginAttemptCount > 0 ?
                    <Alert className='mt-2' variant='danger'>{`이메일 혹은 비밀번호가 일치하는지 확인하세요. - ${loginAttemptCount}`}</Alert>
                    :
                    null
                }
        </Container>
    )
}

export default Auth;

export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}