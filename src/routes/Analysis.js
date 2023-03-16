import { useState, useEffect, } from 'react';
import foodData from 'data/Foods.json'
import FoodDisplay from 'components/analysis/FoodDisplay';
import FoodModal from 'components/analysis/FoodModal';
import SelectedFoodDisplay from 'components/analysis/SelectedFoodDisplay';
import CalorieCalculation from 'components/analysis/CalorieCalculation';
import { Form } from 'react-bootstrap';

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

    useEffect(() => {
        // 검색어와 이름의 일부가 일치하는 객체들을 배열 foodArr에 담음
        const newArr = foodData.filter(isNameCorrect);
        setFoodArr(newArr);
    }, [currentSearching]);

    const searchOnChange = (event) => {
        const { value } = event.target;
        setCurrentSearching(value);
    }

    const getFoodClick = (food) => {
        setCurrentFood({ food, num: 0, isGram: false });
        setIsModalEnabled(true);
    }

    const getModalExit = () => {
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

    const getEditEnter = (currentFood) => {
        setIsModalEnabled(true);
        setCurrentFood(currentFood);
    }
    const getDeleteEnter = (food) => {
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
    useEffect(sumAllNutrients, [isModalEnabled, selectedFoodList]);


    return (
        <div>
            <Form.Control type='text' onChange={searchOnChange} value={currentSearching}>
            </Form.Control>
            <div>

                {isModalEnabled &&
                    <FoodModal
                        currentFood={currentFood}
                        isModalEnabled={isModalEnabled}
                        getModalExit={getModalExit}
                        getCurrentFoodFromModal={getCurrentFoodFromModal}
                    />}
                <br />
                -- Selected List --
                {selectedFoodList.map((element) =>
                    <SelectedFoodDisplay
                        key={element.food.id}
                        currentFood={element}
                        getEditEnter={getEditEnter}
                        getDeleteEnter={getDeleteEnter}
                    />)
                }
                <br />
                Total Calories :
                {totalCalories.toFixed(1)} kcal
                <br />
                {`탄 : ${totalCarbs.toFixed(1)}g  
                단 : ${totalProtein.toFixed(1)}g  
                지 : ${totalFat.toFixed(1)}g`}
                {/* 검색어에 맞는 음식들을 표시*/}
                {foodArr.map((element) =>
                    <FoodDisplay
                        key={element.id}
                        currentFood={element}
                        getFoodClick={getFoodClick}
                    />
                )}
            </div>
        </div>
    )
}

export default Analysis;