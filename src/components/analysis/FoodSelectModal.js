import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CalorieCalculation from './CalorieCalculation';

const FoodSelectModal = ({ currentFood, isModalEnabled, getModalExit, getCurrentFoodFromModal }) => {

    const [displayNum, setDisplayNum] = useState(0);
    const [unitNum, setUnitNum] = useState(currentFood.num);
    const [gramNum, setGramNum] = useState(currentFood.num);
    const [isGram, setIsGram] = useState(currentFood.isGram);
    const [calories, setCalories] = useState(0);

    const onChange = (event) => {
        if (event.target.value >= 0) {
            setDisplayNum(event.target.value);
        } else {
            setDisplayNum(0);
            setUnitNum(0);
            setGramNum(0);
        }
    }

    // isGram=true 또는 false 이면 displayNum을 gramNum 또는 unitNum으로 변경
    useEffect(() => {
        isGram ? setUnitNum(Math.round(displayNum / currentFood.food.gram_per_unit)) :
            setGramNum(displayNum * currentFood.food.gram_per_unit);
    }, [displayNum]);

    const getCalories = (calories) => {
        setCalories(calories);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getModalExit();
        getCurrentFoodFromModal(displayNum, isGram, calories);
    }

    const toggleUnit = () => {
        setIsGram(prev => !prev);
    }
    useEffect(() => isGram ? setDisplayNum(gramNum) : setDisplayNum(unitNum)
        , [isGram]);

    return (
        <Modal show={isModalEnabled} onHide={getModalExit}>
            <Modal.Header closeButton>
                <Modal.Title>식품 섭취량 정보 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentFood.food.name}
                <br /> <br/>
                <Form onSubmit={onSubmit}>
                    <input type='number' value={displayNum} onChange={onChange} />
                    {` ${isGram ? currentFood.food.unit_name : 'unit'}`}
                    <br/>
                    <Button variant='light' onClick={toggleUnit}>단위 변경</Button>   
                    <br />
                    {` 탄 : ${(isGram ? currentFood.food.carbs / currentFood.food.gram_per_unit * displayNum
                        : currentFood.food.carbs * displayNum).toFixed(1)}  단 : 
                        ${(isGram ? currentFood.food.protein / currentFood.food.gram_per_unit * displayNum
                            : currentFood.food.protein * displayNum).toFixed(1)}  지 : 
                        ${(isGram ? currentFood.food.fat / currentFood.food.gram_per_unit * displayNum
                            : currentFood.food.fat * displayNum).toFixed(1)}
                        `}
                    <br />
                    칼로리 : 
                    <CalorieCalculation
                        food={currentFood.food}
                        num={displayNum}
                        isGram={isGram}
                        getCalories={getCalories}
                    />
                </Form>
                <br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={onSubmit}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default FoodSelectModal;