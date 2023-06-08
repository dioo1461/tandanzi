export const calculateCalories = (food, num, isGram) => {
    if (isGram) {
        return food.calories / food.gram_per_unit * num;
    } else {
        return food.calories * num;
    }
}