import { getProfile } from 'api/profiles/profilesAxiosRequests';
import { getUserInstance } from 'api/users/userAxiosRequests';
import { Button } from 'react-bootstrap';
import { useEffect, useState, } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [username, setUsername] = useState('');

    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    const [bodyWater, setBodyWater] = useState(0);
    const [bodyProtein, setBodyProtein] = useState(0);
    const [bodyMineral, setBodyMineral] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);

    const [skeletalMuscleMass, setSkeletalMuscleMass] = useState(0);
    
    const [waistHipRatio, setWaistHipRatio] = useState(0);

    const getUserInfos = () => {


    }

    useEffect(() => {
        getProfile();
    }, [])

    const onEditButtonClick = () => {

    }

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
                <Col md={{ span: 3, offset: 2 }}>
                    other details
                </Col>

            </Row>
            <Row>
                <Col>
                    <Button onClick={() => navigate('/user/profile/edit')}>수정</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default Profile;