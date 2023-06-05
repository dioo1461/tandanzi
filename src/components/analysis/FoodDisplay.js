import { useState, } from 'react'
import FoodSelected from "components/analysis/FoodSelectModal";

const FoodDisplay = ({ currentFood, onFoodClick }) => {
    const [flag, setFlag] = useState(false);
    const onClick = () => {
        onFoodClick(currentFood);
    }

    return (
        <div onClick={onClick}>
            {currentFood.name}
        </div>
    )
}

export default FoodDisplay;