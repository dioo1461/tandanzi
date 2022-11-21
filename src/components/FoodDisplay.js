

const FoodDisplay = ({currentFood}) => {
    console.log('currentFood.name : ', currentFood.name);
    return (
        <div>
            {currentFood.name}
        </div>
    )
}

export default FoodDisplay;