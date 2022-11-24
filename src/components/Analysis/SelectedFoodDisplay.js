import { useState, } from 'react';

const SelectedFoodDisplay = ({ currentFood, getEditEnter, getDeleteEnter }) => {

    const onClickEdit = () => {
        getEditEnter(currentFood.food, currentFood.num);
    }
    const onClickDelete = () => {
        getDeleteEnter(currentFood.food);
    }
    return (
        <>
            <div>
                name: {currentFood.food.name},
                num: {currentFood.num}
                <button onClick={onClickEdit}>edit</button>
                <button onClick={onClickDelete}>delete</button>
                <br />
            </div>
        </>
    )
}

export default SelectedFoodDisplay;