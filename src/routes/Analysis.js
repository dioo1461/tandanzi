import { useState, useEffect, useRef } from 'react';
import foodData from 'data/Foods.json';
import FoodSelectModal from 'components/analysis/FoodSelectModal';
import SelectedFoodDisplay from 'components/analysis/SelectedFoodDisplay';
import { Form, Button, Container, InputGroup, Collapse, Row, Col, ListGroup, Accordion } from 'react-bootstrap';
import CategorySelect from 'components/analysis/CategorySelect';
import styled from 'styled-components';
import { CarbohydrateBadge, FatBadge, ProteinBadge } from 'components/analysis/AnalysisBadges';

const Analysis = () => {
    const [currentSearching, setCurrentSearching] = useState("");
    const [foodArr, setFoodArr] = useState([]); // element=Foods.json의 객체

    const [currentFood, setCurrentFood] = useState(null); // {key: food, foodNum, isGram, calories}
    const [isModalEnabled, setIsModalEnabled] = useState(false);

    const [selectedFoodList, setSelectedFoodList] = useState([]); // element=currentFood
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalFat, setTotalFat] = useState(0);

    const [displayLimit, setDisplayLimit] = useState(0);

    const [isCategoryOpened, setIsCategoryOpened] = useState(false);
    const [isCategoryEnabled, setIsCategoryEnabled] = useState(false);
    const [firstCategory, setFirstCategory] = useState('');
    const [secondCategory, setSecondCategory] = useState('');
    const [thirdCategory, setThirdCategory] = useState('');

    const [scrollContainerHeight, setScrollContainerHeight] = useState(400);
    const scrollContainerRef = useRef(null);
    const scrollPosRef = useRef(0);

    const [accordionActiveKey, setAccordionActiveKey] = useState("")

    const handleWindowResize = () => setScrollContainerHeight(() => {
        let clampedRes = Math.min(Math.max(window.innerHeight - 400, 200), 300);
        return clampedRes;
    })

    const handleScroll = () => {
        scrollPosRef.current = scrollContainerRef.current.scrollTop;
    }

    // const clampScrollContainerHeight = (height) => {
    //     let clampedRes = Math.min(Math.max(height - 400, 200), 400);
    //     setScrollContainerHeight(clampedRes);
    // }

    // const handleWindowResize = () => (() => {
    //     clampScrollContainerHeight(window.innerHeight)
    // })


    const isNameCorrect = (element) => {
        if (currentSearching === '') {
            return true;
        }
        let cnt = 0, i = 0, j = 0;
        for (i; i < element.name.length; i++) {
            if (element.name[i] === currentSearching[j]) {
                cnt++;
                j++;
            } else {
                cnt = 0;
                j = 0;
            }
            if (cnt === currentSearching.length) {
                return true;
            }
        }
        return false;
    }

    const isCategoryCorrect = (element) => {
        if (firstCategory !== '' && firstCategory !== element.category_first) {
            return false;
        }
        if (secondCategory !== '' && secondCategory !== element.category_second) {
            return false;
        }
        if (thirdCategory !== '' && thirdCategory !== element.category_third) {
            return false;
        }
        return true;
    }

    const searchOnChange = (event) => {
        const { value } = event.target;
        setCurrentSearching(value);
    }

    const onFoodClick = (food) => {
        setCurrentFood({ food, num: 0, isGram: false });
        setIsModalEnabled(true);
    }

    const onModalExit = () => {
        setIsModalEnabled(false);
    }

    const getCurrentFoodFromModal = (num, isGram, calories) => {
        if (num <= 0) {
            return;
        }
        let isDuplicateExists = false;
        let idx = 0;
        (function findDuplicates() {
            for (idx; idx < selectedFoodList.length; idx++) {
                if (selectedFoodList[idx].food.name === currentFood.food.name) {
                    isDuplicateExists = true;
                    break;
                }
            }
        })();
        if (!isDuplicateExists) {
            setSelectedFoodList([...selectedFoodList, { food: currentFood.food, num: Number(num), isGram, calories }]);
        } else {
            selectedFoodList[idx] = { ...selectedFoodList[idx], num: Number(num), isGram, calories };
        }
    }

    const onClickEdit = (currentFood) => {
        setIsModalEnabled(true);
        setCurrentFood(currentFood);
    }
    const onClickDelete = (food) => {
        setSelectedFoodList(selectedFoodList.filter((element) => element.food.id !== food.id));
    }

    const sumAllNutrients = () => {
        let sum = 0;
        selectedFoodList.map((element) => sum += element.calories);
        setTotalCalories(sum);
        sum = 0;
        selectedFoodList.map((element) => sum += element.isGram ? element.num * element.food.carbs / element.food.gram_per_unit : element.num * element.food.carbs);
        setTotalCarbs(sum);
        sum = 0;
        selectedFoodList.map((element) => sum += element.isGram ? element.num * element.food.protein / element.food.gram_per_unit : element.num * element.food.protein);
        setTotalProtein(sum);
        sum = 0;
        selectedFoodList.map((element) => sum += element.isGram ? element.num * element.food.fat / element.food.gram_per_unit : element.num * element.food.fat);
        setTotalFat(sum);
        sum = 0;
    }

    const onCategoriesSelected = (first, second, third) => {
        setIsCategoryEnabled(true);
        setIsCategoryOpened(false);
        setFirstCategory(first);
        setSecondCategory(second);
        setThirdCategory(third);
    }

    const onCheckboxClick = () => {
        if (isCategoryEnabled) {
            setIsCategoryEnabled(false);
            setIsCategoryOpened(false);
        } else if (isCategoryOpened) {
            setIsCategoryOpened(false);
        } else {
            setIsCategoryOpened(true);
        }
    }

    const ScrollContainer = styled.div`
    overflow: auto;
    overflow-x: hidden;
    height: ${scrollContainerHeight}px;
    border: 1px solid white;
    `;

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        scrollContainerRef.current.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('resize', handleWindowResize);
            scrollContainerRef.current.addEventListener('scroll', handleScroll);
        })
    }, []);

    useEffect(() => {
        // 검색어와 이름의 일부가 일치하는 객체들을 배열 foodArr에 담음
        let newArr = foodData.filter(isNameCorrect);
        if (isCategoryEnabled) {
            newArr = newArr.filter(isCategoryCorrect);
        }
        setFoodArr(newArr);
    }, [currentSearching, isCategoryEnabled]);

    useEffect(() => {
        sumAllNutrients();
    }, [isModalEnabled, selectedFoodList]);

    useEffect(() => {
        if (selectedFoodList.length > 0) {
            setAccordionActiveKey("0")
        } else {
            setAccordionActiveKey("")
        }
    }, [selectedFoodList])

    useEffect(()=> {
        scrollContainerRef.current.scrollTop = scrollPosRef.current;
    })

    return (
        <div>
            <Container fluid>
                <Row sm={3}>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                        <Form.Check>
                            <Form.Check.Input id='FormCheck' type='checkbox' onChange={onCheckboxClick} />
                            <Form.Check.Label htmlFor='FormCheck'>카테고리 선택</Form.Check.Label>
                        </Form.Check>
                        <Collapse in={isCategoryOpened}>
                            <div>
                                <CategorySelect onCategoriesSelected={onCategoriesSelected} />
                            </div>
                        </Collapse>
                        <Form>
                            <Form.Label>음식 이름을 입력하세요</Form.Label>
                            <InputGroup>
                                <Form.Control type='text' onChange={searchOnChange} value={currentSearching} />
                                <Button variant='outline-secondary' onClick={() => setCurrentSearching('')}>clear</Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row sm={3} className='mt-3 mb-5'>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                        <ScrollContainer as='div' ref={scrollContainerRef} onScroll={handleScroll}>
                            {/* 검색어와 일치하는 음식들을 나열*/}
                            <ListGroup as='ul'>
                                {foodArr.map((element) =>
                                    <ListGroup.Item
                                        as='li'
                                        key={element.id}
                                        onClick={() => onFoodClick(element)}
                                        action>
                                        {element.name}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </ScrollContainer>

                        {isModalEnabled &&
                            <FoodSelectModal
                                currentFood={currentFood}
                                isModalEnabled={isModalEnabled}
                                onModalExit={onModalExit}
                                getCurrentFoodFromModal={getCurrentFoodFromModal}
                            />}
                        <br />
                        {/*선택한 음식들을 나열, 칼로리를 계산 */}

                        <Accordion activeKey={accordionActiveKey} className='mb-3'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header onClick={() => {
                                    accordionActiveKey === "0" ?
                                        setAccordionActiveKey("") : setAccordionActiveKey("0")
                                }}>
                                    선택한 식품 목록
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as='ul'>
                                        {selectedFoodList.map((element) =>
                                            <ListGroup.Item as='li' key={element.food.id}>
                                                <SelectedFoodDisplay
                                                    currentFood={element}
                                                    onClickEdit={onClickEdit}
                                                    onClickDelete={onClickDelete}
                                                />
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {`총 칼로리 : ${totalCalories.toFixed(1)} kcal`}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <CarbohydrateBadge />{` ${totalCarbs.toFixed(1)}g  `}
                            </div>
                            <div>
                                <ProteinBadge /> {` ${totalProtein.toFixed(1)}g  `}
                            </div>
                            <div>
                                <FatBadge /> {` ${totalFat.toFixed(1)}g  `}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='outline-primary' className='mt-4'>
                                일지에 식단 기록하기
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}



export default Analysis;