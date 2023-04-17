import { createProfile, getMyProfile, updateProfile } from "api/profiles/profilesAxiosRequests";
import { HeightInputWithDropdowns, WeightInputWithDropdowns } from "components/profile/ProfileEditInputs";
import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


const ProfileEdit = () => {
    const navigate = useNavigate();

    const [age, setAge] = useState(0.0);

    const [height, setHeight] = useState(0.0);

    const [weight, setWeight] = useState(0.0);

    const [bodyWater, setBodyWater] = useState(0.0);
    const [bodyProtein, setBodyProtein] = useState(0.0);
    const [bodyMineral, setBodyMineral] = useState(0.0);
    const [bodyFat, setBodyFat] = useState(0.0);

    const [skeletalMuscleMass, setSkeletalMuscleMass] = useState(0.0);

    const [waistHipRatio, setWaistHipRatio] = useState(0.0);

    const calculateSkeletalMuscleMass = () => {
        return (bodyWater + bodyProtein)
    }
    // 옵저버 패턴으로, 특정 항목이 비어있을 때 다른 정보를 조합하여 결과산출 용이하게.

    const initProfile = async() => {
        
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            age: age,
            height: height,
            weight: weight,
            bodyWater: bodyWater,
            bodyProtein: bodyProtein,
            bodyMineral: bodyMineral,
            bodyFat: bodyFat,
            waistHipRatio: waistHipRatio
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
                            <Form.Control value={age} onChange={(e) => setAge(e.target.value)} placeholder='24' />
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
                            <Form.Control value={bodyWater} onChange={(e) => setBodyWater(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                    <Col xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>단백질량</Form.Label>
                            <Form.Control value={bodyProtein} onChange={(e) => setBodyProtein(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 3 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>무기질량</Form.Label>
                            <Form.Control value={bodyMineral} onChange={(e) => setBodyMineral(e.target.value)} placeholder='24' />
                        </Form.Group>
                    </Col>
                    <Col xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                        <Form.Group Group className="mb-3">
                            <Form.Label className='me-2'>체지방량</Form.Label>
                            <Form.Control value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder='24' />
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