import {useState, useEffect} from 'react';
import foodData from 'data/Foods.json'
import FoodDisplay from 'components/FoodDisplay';

const Analysis = () => {
    const [currentFood, setCurrentFood] = useState(null);
    const [currentFoodNum, setCurrentFoodNum] = useState(0);
    const [isUnitGram, setisUnitGram] = useState(true);
    
    const [currentSearching, setCurrentSearching] = useState("");
    const [foodArr, setFoodArr] = useState([]);
    const [tempToggle, setTempToggle] = useState(true);

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
        foodArr.map((element) => {
            console.log('foodArr name : ', element.name);
        })
    }, [currentSearching]);

    const searchOnChange = (event) => {
        const { value } = event.target;
        setCurrentSearching(value);
    }
    
    return (
        <div>
            <form> 
                <input type='text' onChange={searchOnChange} value={currentSearching} />
            </form>
            <div>
                {/* 검색어에 맞는 음식들을 표시*/}
                {foodArr.map((element) =>
                    <FoodDisplay key={element.id} currentFood={element} />
                )}
            </div>
        </div>
    )
}

export default Analysis;