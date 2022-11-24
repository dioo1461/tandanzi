import {useState, useEffect,} from 'react';
import foodData from 'data/Foods.json'
import FoodDisplay from 'components/Analysis/FoodDisplay';
import FoodModal from 'components/Analysis/FoodModal';
import SelectedFoodDisplay from 'components/Analysis/SelectedFoodDisplay';
import CalorieCalculation from 'components/Analysis/CalorieCalculation';

const Analysis = () => {
    const [currentSearching, setCurrentSearching] = useState("");
    const [foodArr, setFoodArr] = useState([]);

    const [currentFood, setCurrentFood] = useState(null); // {key: food, foodNum, isGram, calories}
    const [isModalEnabled, setIsModalEnabled] = useState(false);

    const [selectedFoodList, setSelectedFoodList] = useState([]); // element={key: food, foodNum, isGram, calories}
    const [totalCalories, setTotalCalories] = useState(0);

    const isNameCorrect = (element) => {
        if (currentSearching === '') {
            return true;
        }
        for (let i=0; i<currentSearching.length; i++) {
            if (element.name[i] !== currentSearching[i]) {
                return false;
            }
        }
        return true;
    }
    
    useEffect(() => {
        // 검색어와 이름의 앞부분이 일치하는 객체들을 배열 foodArr에 담음
        const newArr = foodData.filter(isNameCorrect);
        setFoodArr(newArr);
    }, [currentSearching]);

    const searchOnChange = (event) => {
        const { value } = event.target;
        setCurrentSearching(value);
    }

    const getFoodClick = (food) => {
        setCurrentFood({food, num: 0, isGram:false});
        setIsModalEnabled(true);
    }

    const getModalExit = () => {
        setIsModalEnabled(false);
    }
    const getCurrentFoodFromModal = (num, isGram, calories) =>  {
        if (num<=0) {
            return;
        }
        let isDuplicateExists = false;
        let idx = 0;
        (function findDuplicates() {
            for (idx; idx<selectedFoodList.length; idx++) {
                if (selectedFoodList[idx].food.name === currentFood.food.name) {
                    isDuplicateExists = true;
                    break;
                }
            }
        })();
        if (!isDuplicateExists) {
            setSelectedFoodList([...selectedFoodList, {food: currentFood.food, num: Number(num), isGram, calories}]);
        } else {
            selectedFoodList[idx] = {...selectedFoodList[idx], num: Number(num), isGram, calories};
        }
    }
    
    const getEditEnter = (currentFood) => {
        setIsModalEnabled(true);
        setCurrentFood(currentFood);
    }
    const getDeleteEnter = (food) => {
        setSelectedFoodList(selectedFoodList.filter((element) => element.food.id !== food.id));
    }
    
    const sumAllCalories = () => {
        let sum = 0;
        selectedFoodList.map((element) => sum+=element.calories);
        setTotalCalories(sum);
    }
    useEffect(sumAllCalories,[isModalEnabled, selectedFoodList]);
    

    return (
        <div>
            <form>
                <input type='text' onChange={searchOnChange} value={currentSearching} />
            </form>
            <div>
                
                { isModalEnabled && 
                <FoodModal 
                    currentFood={currentFood} 
                    isModalEnabled={isModalEnabled} 
                    getModalExit={getModalExit} 
                    getCurrentFoodFromModal={getCurrentFoodFromModal}
                />}
                <br/>
                -- Selected List --
                {selectedFoodList.map((element) => 
                    <SelectedFoodDisplay 
                        key={element.food.id} 
                        currentFood={element} 
                        getEditEnter={getEditEnter}
                        getDeleteEnter={getDeleteEnter} 
                    />)                   
                }
                <br/>
                Total Calories : 
                {totalCalories.toFixed(1)} kcal
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