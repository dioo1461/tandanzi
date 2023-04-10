import { getUserInstance } from 'api/users/userAxiosRequests';
import { useEffect, useState, } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Profile = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [age, setage] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');


    const getUserInfos = () => {
        
        
    }
    
    useEffect(() => {
        getUserInstance()

    }, [])

    return (
        <Container>
            <Row className='mt-5'>
                <Col md={{ span: 3, offset: 2 }}>
                    profile Image---------------------------
                    ------------------------------------------------------
                    ------------------------------------------------------
                    ----------------
                </Col>
                <Col md={5}>
                    <Row className='mb-4'>
                        닉네임 : {username}
                    </Row>
                    <Row className='mb-4'>
                        이메일 : {email}
                    </Row>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={{span:3, offset:2}}>
                    other details
                </Col>

            </Row>

        </Container>
    )

}

export default Profile;