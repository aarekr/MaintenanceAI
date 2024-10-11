/* eslint-disable react/prop-types */

const Simulator = (props) => {
    return (
        <div>
            <h1>SIMULATOR</h1>
            <p><button onClick={() => props.setDishWasher('BROKEN')}>break it!</button> Dish washer </p>
            <p><button onClick={() => props.setDoorLock('BROKEN')}>break it!</button> Lock </p>
            <p><button onClick={() => props.setOven('BROKEN')}>break it!</button> Oven </p>
            <p><button onClick={() => props.setWashingMachine('BROKEN')}>break it!</button> Washing machine </p>
        </div>
    )
}

export default Simulator
