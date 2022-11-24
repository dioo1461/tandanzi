import {useState, } from 'react';
import Modal from 'react-modal';
import FoodDisplay from 'components/Analysis/FoodDisplay'

const FoodModal = ({currentFood, isModalEnabled, getModalExit, getCurrentFoodNum}) => {
    const [foodNum, setFoodNum] = useState(currentFood.num);
    const [unitIsGram, setUnitIsGram] = useState(true);


    const onChange = (event) => {
        if (event.target.value >= 0) {
            setFoodNum(event.target.value);
        } else {
            setFoodNum(0);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getModalExit();
        getCurrentFoodNum(foodNum);
    }

    return (
        <>
            <Modal isOpen={isModalEnabled} onRequestClose={getModalExit} ariaHideApp={false}>
                name : {currentFood.food.name} <br/>
                current selected : {
                    <form onSubmit={onSubmit}>
                        <input type='number' value={foodNum} onChange={onChange}/>
                        <input type='submit' value='confirm' />
                    </form>
                } <br/>

            </Modal>
        </>
    )

}

export default FoodModal;