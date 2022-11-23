import { useState, } from 'react';

const SelectedFoodDisplay = ({currentFood}) => {
    
    const onClickEdit=() => {

    }
    return (
        <>
                <div>
                    name: {currentFood.food.name}, 
                    num: {currentFood.num}
                    <button onClick={onClickEdit}>edit</button>
                    <button>delete</button>
                    <br />
                </div>
        </>
    )
}

export default SelectedFoodDisplay;