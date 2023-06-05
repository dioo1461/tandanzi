import { useState, } from 'react';
import { Button } from 'react-bootstrap';

const SelectedFoodDisplay = ({ currentFood, onClickEdit, onClickDelete }) => {

    const handleEdit = () => {
        onClickEdit(currentFood);
    }
    const handleDelete = () => {
        onClickDelete(currentFood.food);
    }
    return (
        <div>
                {`${currentFood.food.name}, 
                ${currentFood.num}${currentFood.isGram ? currentFood.food.unit_name : '인분'}`}
                {!currentFood.isGram && `(${currentFood.food.gram_per_unit * currentFood.num}${currentFood.food.unit_name})`}
                <Button className='ms-2' variant='light' onClick={handleEdit}>편집</Button>
                <Button className='ms-2' variant='light' onClick={handleDelete}>삭제</Button>
                <br />
        </div>
    )
}

export default SelectedFoodDisplay;
