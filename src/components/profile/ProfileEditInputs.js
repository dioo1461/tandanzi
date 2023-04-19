import React, { useState } from "react";
import { Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap"

export const HeightInputWithDropdowns = ({ height, setHeight, setUnit }) => {
    const [title, setTitle] = useState('cm');

    return (
        <Form.Group className="mb-3">
            <Form.Label className='me-2'>키</Form.Label>
            <InputGroup>
                <Form.Control type='number' value={height} onChange={(e) => setHeight(e.target.value)} placeholder='170' />
                <DropdownButton disabled variant='outline-secondary' title={title}>
                    <Dropdown.Item onClick={()=>setTitle('cm')}>cm</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setTitle('inch')}>inch</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </Form.Group>
    )
}

export const WeightInputWithDropdowns = ({ weight, setWeight, setUnit }) => {
    const [title, setTitle] = useState('kg');

    return (
        <Form.Group className="mb-3">
            <Form.Label className='me-2'>몸무게</Form.Label>
            <InputGroup>
                <Form.Control type='number' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='70' />
                <DropdownButton disabled variant='outline-secondary' title={title}>
                    <Dropdown.Item onClick={()=>setTitle('cm')}>kg</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setTitle('inch')}>pound</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </Form.Group>
    )
}
