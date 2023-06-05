// |이 코드는 React와 Bootstrap을 사용하여 카테고리를 선택하는 컴포넌트를 구현한 것입니다.
// |
// |좋은 점:
// |- 코드가 간결하고 가독성이 좋습니다.
// |- 상위 카테고리를 선택하면 하위 카테고리가 자동으로 업데이트되는 기능이 있습니다.
// |- 선택한 카테고리를 부모 컴포넌트로 전달하는 콜백 함수가 있습니다.
// |
// |나쁜 점:
// |- 카테고리 데이터가 JSON 파일로 하드코딩되어 있어서, 데이터를 변경하려면 코드를 수정해야 합니다.
// |- 카테고리 데이터를 가져오는 데에 비동기적인 방법을 사용하지 않았습니다. 데이터가 많거나 느리게 로딩될 경우 사용자 경험이 좋지 않을 수 있습니다.
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import firstCategoryData from 'data/Categories_first.json';
import secondCategoryData from 'data/Categories_second.json';
import thirdCategoryData from 'data/Categories_third.json';

const CategorySelect = ({ onCategoriesSelected }) => {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');

    const firstCategoryList = firstCategoryData.map(e => e.name);
    const [secondCategoryList, setSecondCategoryList] = useState([]);
    const [thirdCategoryList, setThirdCategoryList] = useState([]);

    useEffect(() => {
        setSecondCategoryList(secondCategoryData.filter(e => e.parent === first));
    }, [first]);

    useEffect(() => {
        setThirdCategoryList(thirdCategoryData.filter(e => e.parent === second));
    }, [second]);

    const onFirstSelectChange = (e) => {
        setFirst(e.target.value);
        setSecond('');
        setThird('');
    };

    const onSecondSelectChange = (e) => {
        setSecond(e.target.value);
        setThird('');
    };

    const onThirdSelectChange = (e) => {
        setThird(e.target.value);
    };

    const onSubmit = () => {
        onCategoriesSelected(first, second, third);
    };

    const onClickClear = () => {
        setFirst('');
        setSecond('');
        setThird('');
    };

    return (
        <Form>
            <Form.Select className="mb-1" value={first} onChange={onFirstSelectChange}>
                <option value=''>전체</option>
                {firstCategoryList.map((element, index) => (
                    <option key={`${element}-${index}`} value={element}>{element}</option>
                ))}
            </Form.Select>
            {(first === '' || secondCategoryList.length === 0) ? null :
                <Form.Select className="mb-1" value={second} onChange={onSecondSelectChange}>
                    <option value=''>전체</option>
                    {secondCategoryList.map((element, index) => (
                        <option key={`${element.name}-${index}`} value={element.name}>{element.name}</option>
                    ))}
                </Form.Select>}
            {(second === '' || thirdCategoryList.length === 0) ? null :
                <Form.Select className="mb-1" value={third} onChange={onThirdSelectChange}>
                    <option value=''>전체</option>
                    {thirdCategoryList.map((element, index) => (
                        <option key={`${element.name}-${index}`} value={element.name}>{element.name}</option>
                    ))}
                </Form.Select>}
            <Button className="mt-1" variant='success' onClick={onSubmit}>선택 완료</Button>
            <Button className="mt-1 ms-2" variant='light' onClick={onClickClear}>초기화</Button>
        </Form>
    );
};

export default CategorySelect;