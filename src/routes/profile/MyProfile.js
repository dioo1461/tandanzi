import { getMyProfile } from 'api/profiles/profilesAxiosRequests';
import { getMyAuthInfo, getUserInstance } from 'api/users/userAxiosRequests';
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState, } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
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

    const initProfile = async() => {
        const user = await getMyAuthInfo();
        setEmail(user.email);
        setUsername(user.username);
        
        const profile = await getMyProfile();
        setAge(profile.age);
        setHeight(profile.height);
        setWeight(profile.weight);
        setBodyWater(profile.bodyWater)
        setBodyProtein(profile.bodyProtein);
        setBodyMineral(profile.bodyMineral);
        setBodyFat(profile.bodyFat);
        setWaistHipRatio(profile.waistHipRatio);
    }

    useEffect(() => {
        initProfile();
    }, [])

    return (
        <Container>
            <Row className='mt-5'>
                <Col md={{ span: 3, offset: 2 }}>
                    <Image ></Image>
                </Col>
                <Col md={5}>
                    <Row className='mb-4'>
                        닉네임 : {username}
                    </Row>
                    <Row className='mb-4'>
                        이메일 : {email}
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Button onClick={() =>{navigate('/user/profile/authInfoEdit')}}>기본정보 수정</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={{ span: 3, offset: 2 }}>
                    {`나이 : ${age}`}
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 2 }}>
                    {`키 : ${height}`}
                </Col>
                <Col md={{ span: 3, offset: 2 }}>
                    {`몸무게 : ${weight}`}
                </Col>
            </Row>
            <Row sm={2}>
                <Col md={{ span: 3, offset: 2 }}>
                    {`체수분 : ${bodyWater}`}
                </Col>
                <Col md={{ span: 3, offset: 2 }}>
                    {`체수분 : ${bodyWater}`}
                </Col>
                <Col md={{ span: 3, offset: 2 }}>
                    {`체수분 : ${bodyWater}`}
                </Col>
                <Col md={{ span: 3, offset: 2 }}>
                    {`체수분 : ${bodyWater}`}
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Button onClick={() => navigate('/user/profile/edit')}>프로필 수정</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default MyProfile;