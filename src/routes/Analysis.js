import {useState, useEffect} from 'react';
import foodData from 'data/Foods.json'
import FoodDisplay from 'components/Analysis/FoodDisplay';
import FoodModal from 'components/Analysis/FoodModal';
import SelectedFoodDisplay from 'components/Analysis/SelectedFoodDisplay';

const Analysis = () => {
    const [currentSearching, setCurrentSearching] = useState("");
    const [foodArr, setFoodArr] = useState([]);

    const [currentFood, setCurrentFood] = useState(null);
    const [isModalEnabled, setIsModalEnabled] = useState(false);

    const [currentFoodNum, setCurrentFoodNum] = useState(0);
    const [isUnitGram, setisUnitGram] = useState(true);

    const [selectedFoodList, setSelectedFoodList] = useState([]); // {key: food, foodNum}

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

    const getFoodClick = (currentFood) => {
        setCurrentFood(currentFood);
        setIsModalEnabled(true);
    }

    const getModalExit = () => setIsModalEnabled(false);
    const getCurrentFoodNum = (num) =>  {
        if (num<=0) {
            return;
        }
        //setCurrentFoodNum(num);
        let isDuplicateExists = false;
        let idx = 0;
        (function findDuplicates() {
            for (idx; idx<selectedFoodList.length; idx++) {
                console.log(idx);
                if (selectedFoodList[idx].food.name === currentFood.name) {
                    isDuplicateExists = true;
                    break;
                }
            }
        })();
        if (!isDuplicateExists) {
            setSelectedFoodList([...selectedFoodList, {food: currentFood, num: Number(num)}]);
        } else {
            selectedFoodList[idx].num += Number(num);
        }
        console.log(selectedFoodList);
    }
    
    const getFoodList = (foodList) => foodList;

    return (
        <div>
            <form> 
                <input type='text' onChange={searchOnChange} value={currentSearching} />
            </form>
            <div>
                {/* 검색어에 맞는 음식들을 표시*/}
                {foodArr.map((element) =>
                    <FoodDisplay key={element.id} currentFood={element} getFoodClick={getFoodClick}/>
                )}
                { isModalEnabled && <FoodModal currentFood={currentFood} isModalEnabled={isModalEnabled} getModalExit={getModalExit} getCurrentFoodNum={getCurrentFoodNum}/>}
                <br/>
                -- Selected Foods --
                {selectedFoodList.map((element) => 
                    <SelectedFoodDisplay key={element.food.id} currentFood={element}/>)                   
                }
            </div>
        </div>
    )
}

export default Analysis;