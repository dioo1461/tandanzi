import {useState, } from 'react';
import Modal from 'react-modal';
import FoodDisplay from 'components/Analysis/FoodDisplay'

const FoodSelected = ({currentFood, isModalEnabled, getModalExit}) => {
    const [foodNum, setFoodNum] = useState(0);
    const [unitIsGram, setUnitIsGram] = useState(true);


    const onChange = (event) => {
        setFoodNum(event.target.value);
    }
    return (
        <>
            <Modal isOpen={isModalEnabled} onRequestClose={getModalExit} ariaHideApp={false}>
                name : {currentFood.name} <br/>
                current selected : {
                    <form>
                        <input type='text' value={foodNum} onChange={onChange}/>
                    </form>
                } <br/>

            </Modal>
        </>
    )

}

export default FoodSelected;