import { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

const CategorySelect = ({ getCategories }) => {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');

    const firstCategoryList = ['완제품', '신선류'];
    const secondCategoryList = ['구이류', '국 및 탕류', '볶음류', '튀김류', '찜류', '면류'];
    const thirdCategoryList = ['1', '2', '3'];

    const onFirstSelectChange = (e) => {
        setFirst(e.target.value);
        setSecond('');
        setThird('');
    }

    const onSecondSelectChange = (e) => {
        setSecond(e.target.value);
        setThird('');
    }

    const onThirdSelectChange = (e) => {
        setThird(e.target.value);
    }

    const onSubmit = () => {
        getCategories(first, second, third);
    }

    const onClickClear = () => {
        setFirst('');
        setSecond('');
        setThird('');
    }

    return (

        <Form>
            <Form.Select value={first} onChange={onFirstSelectChange}>
                <option value=''>전체</option>
                {firstCategoryList.map((element, index) => {
                    return (
                        <option key={`${element}-${index}`} value={element}>{element}</option>
                    )
                })}
            </Form.Select>
            {first === '' ? null :
                <Form.Select value={second} onChange={onSecondSelectChange}>
                    <option value=''>전체</option>
                    {secondCategoryList.map((element, index) => {
                        return (
                            <option key={`${element}-${index}`} value={element}>{element}</option>
                        )
                    })}
                </Form.Select>}
            {second === '' ? null :
                <Form.Select value={third} onChange={onThirdSelectChange}>
                    <option value=''>전체</option>
                    {thirdCategoryList.map((element, index) => {
                        return (
                            <option key={`${element}-${index}`} value={element}>{element}</option>
                        )
                    })}
                </Form.Select>}
            <Button variant='success' onClick={onSubmit}>선택 완료</Button>
            <Button variant='light' onClick={onClickClear}>초기화</Button>
        </Form>


    )
}

export default CategorySelect;