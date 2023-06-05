import { useState, } from 'react';
import { Button } from 'react-bootstrap';

const SelectedFoodDisplay = ({ currentFood, onEdit, onDelete }) => {

    const onClickEdit = () => {
        onEdit(currentFood);
    }
    const onClickDelete = () => {
        onDelete(currentFood.food);
    }
    return (
        <>
            <div>
                {`${currentFood.food.name}, 
                ${currentFood.num}${currentFood.isGram ? currentFood.food.unit_name : '인분'}`}
                {!currentFood.isGram && `(${currentFood.food.gram_per_unit * currentFood.num}${currentFood.food.unit_name})`}
                <Button variant='light' onClick={onClickEdit}>편집</Button>
                <Button variant='light' onClick={onClickDelete}>삭제</Button>
                <br />
            </div>
        </>
    )
}

export default SelectedFoodDisplay;
