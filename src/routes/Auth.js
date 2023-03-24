import axios from "axios";
import { Container, Row, Form, Button } from 'react-bootstrap';


const Auth = () => {

    const userLogin = (email, password) => {
        axios.get();
    }

    return (
        <Container className='justify-content-center'>
                <Form>
                    <Row>
                        <Form.Group className="mb-3" controlId='formBasicEmail'>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type='email' placeholder='ex) abc@gmail.com' />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control className="mb-3" type='password' placeholder='ex) abcd1234!' />
                        </Form.Group>
                    </Row>
                    <Button variant='primary' type='submit'>확인</Button>
                </Form>
        </Container>
    )
}

export default Auth;
