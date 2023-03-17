import { useState, } from 'react';
import { Button } from 'react-bootstrap';

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
                {!currentFood.isGram && `(${currentFood.food.gram_per_unit * currentFood.num}${currentFood.food.unit_name})`}
                <Button variant='light' onClick={onClickEdit}>편집</Button>
                <Button variant='light' onClick={onClickDelete}>삭제</Button>
                <br />
            </div>
        </>
    )
}

export default SelectedFoodDisplay;
