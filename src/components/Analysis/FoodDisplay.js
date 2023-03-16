import { useState, } from 'react'
import FoodSelected from "components/analysis/FoodModal";

const FoodDisplay = ({ currentFood, getFoodClick }) => {
    const [flag, setFlag] = useState(false);
    const onClick = () => {
        getFoodClick(currentFood);
    }

    return (
        <div onClick={onClick}>
            {currentFood.name}
        </div>
    )
}

export default FoodDisplay;