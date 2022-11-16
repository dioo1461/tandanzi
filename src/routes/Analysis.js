import {useState, } from 'react';
import foodData from 'data/Foods.json'
import FoodDisplay from 'components/FoodDisplay';

const Analysis = () => {
    const [currentFood, setCurrentFood] = useState(null);
    const [currentFoodNum, setCurrentFoodNum] = useState(0);
    const [isUnitGram, setisUnitGram] = useState(true);
    
    const [currentSearching, setCurrentSearching] = useState("");
    const [foodArr, setFoodArr] = useState([]);

    const searchOnChange = (event) => {
        const { value } = event.target;
        setCurrentSearching(value);
        setCurrentSearching('hi');
        console.log('value=',value);
        console.log('currentsearching=',currentSearching);
        // 검색어와 이름의 앞부분이 일치하는 객체들을 배열 foodArr에 담음
        setFoodArr(foodData.map((element) => {
            for (let i=0; i<currentSearching.length; i++) {
                console.log('id=',element.id);
                if (element.name[i] != currentSearching[i]) {
                    console.log('name=',element.name[i],' search=',currentSearching[i]);
                    console.log('incorrect');
                    return;
                }
            }
            console.log(element.id);
            return element; // 이런식으로 객체저장해도 되나?
        }));
    }
    
    return (
        <div>
            <form> 
                <input type='text' onChange={searchOnChange} value={currentSearching} />
            </form>
            <div>
                {/* 검색어에 맞는 음식들을 표시*/}
                {foodArr.map(element => 
                    <FoodDisplay key={element.id} currentFood={element} />
                )}
            </div>

        </div>
    )
}

export default Analysis;