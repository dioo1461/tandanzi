import { useState, } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const SelectedFoodDisplay = ({ currentFood, onClickEdit, onClickDelete }) => {

    const handleEdit = () => {
        onClickEdit(currentFood);
    }
    const handleDelete = () => {
        onClickDelete(currentFood.food);
    }
    return (
        <Container fluid>
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    {`${currentFood.food.name}, 
                ${currentFood.num}${currentFood.isGram ? currentFood.food.unit_name : '인분'}`}
                    {!currentFood.isGram && `(${currentFood.food.gram_per_unit * currentFood.num}${currentFood.food.unit_name})`}
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button className='ms-2 text-right' variant='light' onClick={handleEdit}>편집</Button>
                    <Button className='ms-2' variant='light' onClick={handleDelete}>삭제</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SelectedFoodDisplay;
