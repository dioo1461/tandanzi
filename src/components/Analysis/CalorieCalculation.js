import {useState, useEffect, } from 'react';

const CalorieCalculation = ({food, num, isGram, getCalories}) => {
    const [calories, setCalories] = useState(0);
    const calculate = () => {
        if (isGram) {
            setCalories(food.calories / food.gram_per_unit * num);
        } else {
            setCalories(food.calories * num);
        }
    }

    useEffect(calculate, [food, num, isGram]);
    useEffect(() => {
        getCalories(calories);
    }, [calories]);

    return (
        calories.toFixed(1)
    )
}

export default CalorieCalculation;