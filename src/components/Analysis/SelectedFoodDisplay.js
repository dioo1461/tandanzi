import { useState, } from 'react';

const SelectedFoodDisplay = ({ currentFood, getEditEnter, getDeleteEnter }) => {

    const onClickEdit = () => {
        getEditEnter(currentFood);
    }
    const onClickDelete = () => {
        getDeleteEnter(currentFood.food);
    }
    return (
        <>
            <div>
                {`${currentFood.food.name}, 
                ${currentFood.num}${currentFood.isGram ? currentFood.food.unit_name : ' unit'}`}
                <button onClick={onClickEdit}>edit</button>
                <button onClick={onClickDelete}>delete</button>
                <br />
            </div>
        </>
    )
}

export default SelectedFoodDisplay;