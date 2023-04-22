import { createProfile, getMyProfile, updateProfile } from "api/profiles/profilesAxiosRequests";
import { HeightInputWithDropdowns, WeightInputWithDropdowns } from "components/profile/ProfileEditInputs";
import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


const ProfileEdit = () => {
    const navigate = useNavigate();

    const [age, setAge] = useState('');

    const [height, setHeight] = useState('');

    const [weight, setWeight] = useState('');

    const [bodyWater, setBodyWater] = useState('');
    const [bodyProtein, setBodyProtein] = useState('');
    const [bodyMineral, setBodyMineral] = useState('');
    const [bodyFat, setBodyFat] = useState('');

    const [skeletalMuscleMass, setSkeletalMuscleMass] = useState('');

    const [waistHipRatio, setWaistHipRatio] = useState('');

    const calculateSkeletalMuscleMass = () => {
        return (bodyWater + bodyProtein)
    }
    // 옵저버 패턴으로, 특정 항목이 비어있을 때 다른 정보를 조합하여 결과산출 용이하게.

    const initProfile = async() => {
        
        const profile = await getMyProfile();
        setAge(profile.age == 0 ? '' : profile.age);
        setHeight(profile.height == 0 ? '' : profile.height);
        setWeight(profile.weight == 0 ? '' : profile.weight);
        setBodyWater(profile.bodyWater == 0 ? '' : profile.bodyWater)
        setBodyProtein(profile.bodyProtein == 0 ? '' : profile.bodyProtein);
        setBodyMineral(profile.bodyMineral == 0 ? '' : profile.bodyMineral);
        setBodyFat(profile.bodyFat == 0 ? '' : profile.bodyFat);
        setWaistHipRatio(profile.waistHipRatio == 0 ? '' : profile.waistHipRatio);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            age: Number(age),
            height: Number(height),
            weight: Number(weight),
            bodyWater: Number(bodyWater),
            bodyProtein: Number(bodyProtein),
            bodyMineral: Number(bodyMineral),
            bodyFat: Number(bodyFat),
            waistHipRatio: Number(waistHipRatio)
        }
        console.log(data);
        updateProfile(data);
        navigate('/user/profile');
    }

    useEffect(() => {
        initProfile();
    }, [])


    return (
        <Container className='justify-content-center' fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label className='me-2'>나이</Form.Label>
                            <Form.Control type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 3 }}>
                        <HeightInputWithDropdowns height={height} setHeight={setHeight} />
                    </Col>
                    <Col xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                        <WeightInputWithDropdowns weight={weight} setWeight={setWeight} />
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label className='me-2'>체수분량</Form.Label>
                            <Form.Control type='number' value={bodyWater} onChange={(e) => setBodyWater(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                    <Col xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>단백질량</Form.Label>
                            <Form.Control type='number' value={bodyProtein} onChange={(e) => setBodyProtein(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 3 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>무기질량</Form.Label>
                            <Form.Control type='number' value={bodyMineral} onChange={(e) => setBodyMineral(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                    <Col xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>체지방량</Form.Label>
                            <Form.Control type='number' value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='justify-content-start mt-3'>
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 3 }}>
                        <Button variant='primary' type='submit'>수정 완료</Button>
                    </Col>
                </Row>
            </Form>
        </Container >
    )
}
export default ProfileEdit;