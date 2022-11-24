import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import FoodDisplay from 'components/Analysis/FoodDisplay'
import CalorieCalculation from './CalorieCalculation';

const FoodModal = ({currentFood, isModalEnabled, getModalExit, getCurrentFoodFromModal}) => {
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

    const getCalories = (calories) => {setCalories(calories);}

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
        <>
            <Modal isOpen={isModalEnabled} onRequestClose={getModalExit} ariaHideApp={false}>
                name : {currentFood.food.name} <br/>
                current selected : {
                    <form onSubmit={onSubmit}>
                        <input type='number' value={displayNum} onChange={onChange}/>
                        <input type='submit' value='confirm' />
                        <br/>
                        Unit : {isGram ? currentFood.food.unit_name : 'unit'} 
                        <div onClick={toggleUnit}>click to change unit</div>
                        <br/>
                        Calories : 
                        <CalorieCalculation
                            food={currentFood.food}
                            num={displayNum}
                            isGram={isGram}
                            getCalories={getCalories}
                        />
                    </form>
                } <br/>

            </Modal>
        </>
    )

}

export default FoodModal;