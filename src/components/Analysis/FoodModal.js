import {useState, } from 'react';
import Modal from 'react-modal';
import FoodDisplay from 'components/Analysis/FoodDisplay'

const FoodModal = ({currentFood, isModalEnabled, getModalExit, getCurrentFoodNum}) => {
    const [foodNum, setFoodNum] = useState(0);
    const [unitIsGram, setUnitIsGram] = useState(true);


    const onChange = (event) => {
        setFoodNum(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getModalExit();
        getCurrentFoodNum(foodNum);
    }

    return (
        <>
            <Modal isOpen={isModalEnabled} onRequestClose={getModalExit} ariaHideApp={false}>
                name : {currentFood.name} <br/>
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