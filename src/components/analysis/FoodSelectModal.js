// |이 코드는 React와 Bootstrap을 사용하여 모달 창을 구현하고, 사용자가 선택한 음식의 섭취량 정보를 입력받는 기능을 구현한 코드입니다.
// |
// |좋은 점:
// |- useState와 useEffect를 적절하게 사용하여 컴포넌트의 상태를 관리하고, 상태가 변경될 때마다 화면이 자동으로 업데이트됩니다.
// |- 부트스트랩을 사용하여 모달 창을 쉽게 구현할 수 있습니다.
// |- 음식의 섭취량 정보를 입력받을 때, 단위 변경 버튼을 클릭하여 간단하게 단위를 변경할 수 있습니다.
// |- 칼로리 계산을 위해 CalorieCalculation 컴포넌트를 사용하여 코드의 가독성을 높였습니다.
// |
// |나쁜 점:
// |- 코드의 가독성이 좋지 않습니다. 코드의 구조가 복잡하고, 변수명이 일관성 없이 사용되어 코드를 이해하기 어렵습니다.
// |- 코드의 중복이 많습니다. 음식의 섭취량 정보를 계산하는 부분이 여러 번 반복되어 코드의 길이가 늘어나고 유지보수가 어렵습니다.
// |- CSS 스타일링이 없어서 모달 창이 깔끔하게 보이지 않습니다.
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
                    {` ${isGram ? currentFood.food.unit_name : '인분'}`}
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