import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import firstCategoryData from 'data/Categories_first.json';
import secondCategoryData from 'data/Categories_second.json';
import thirdCategoryData from 'data/Categories_third.json';

const CategorySelect = ({ getCategories }) => {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');

    const firstCategoryList = firstCategoryData.map(e=>{return e.name;})
    const [secondCategoryList, setSecondCategoryList] = useState([]);
    const [thirdCategoryList, setThirdCategoryList] = useState([]);

    useEffect(() => {
        setSecondCategoryList(secondCategoryData.filter(e=>{return e.parent === first}));
    }, [first])

    useEffect(()=>{
        setThirdCategoryList(thirdCategoryData.filter(e=>{return e.parent === second}));
    }, [second])

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
            <Form.Select className="mb-1" value={first} onChange={onFirstSelectChange}>
                <option value=''>전체</option>
                {firstCategoryList.map((element, index) => {
                    return (
                        <option key={`${element}-${index}`} value={element}>{element}</option>
                    )
                })}
            </Form.Select>
            {(first === '' || secondCategoryList.length === 0) ? null :
                <Form.Select className="mb-1" value={second} onChange={onSecondSelectChange}>
                    <option value=''>전체</option>
                    {secondCategoryList.map((element, index) => {
                        return (
                            <option key={`${element.name}-${index}`} value={element.name}>{element.name}</option>
                        )
                    })}
                </Form.Select>}
            {(second === '' || thirdCategoryList.length === 0) ? null :
                <Form.Select className="mb-1" value={third} onChange={onThirdSelectChange}>
                    <option value=''>전체</option>
                    {thirdCategoryList.map((element, index) => {
                        return (
                            <option key={`${element.name}-${index}`} value={element.name}>{element.name}</option>
                        )
                    })}
                </Form.Select>}
            <Button className="mt-1" variant='success' onClick={onSubmit}>선택 완료</Button>
            <Button className="mt-1" variant='light' onClick={onClickClear}>초기화</Button>
        </Form>


    )
}

export default CategorySelect;