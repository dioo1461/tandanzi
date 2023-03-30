// |이 코드는 React와 axios를 사용하여 로그인 기능을 구현한 코드입니다.
// |
// |좋은 점:
// |- React의 useState 훅을 사용하여 상태를 관리하고 있습니다.
// |- axios를 사용하여 비동기적으로 서버와 통신하고 있습니다.
// |- useNavigate 훅을 사용하여 페이지 이동을 구현하고 있습니다.
// |- 로그인 실패 시, 실패 횟수를 카운트하여 알림창에 표시하는 기능을 구현하고 있습니다.
// |
// |나쁜 점:
// |- 로그아웃 기능이 별도의 파일로 분리되어 있지 않고, 같은 파일 내에서 export되고 있습니다. 이는 코드의 가독성을 떨어뜨릴 수 있습니다.
// |- 로그인 실패 시, 실패 횟수를 카운트하는 기능이 있지만, 일정 횟수 이상 실패 시 계정이 잠기는 등의 추가적인 보안 기능이 구현되어 있지 않습니다.
import axios from "axios";
import { RequestLogin } from "components/auth/login/LoginAxiosRequest";
import { useState } from "react";
import { Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginAttemptCount, setLoginAttemptCount] = useState(0);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {email: email, password: password};

        const response = await RequestLogin(data);
        console.log('Login, response: ', response);
        if (response) {
            navigate('/');
        } else {
            setLoginAttemptCount(prev=>prev+1);
        }
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

export default Login;

export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}