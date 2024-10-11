/* eslint-disable react/prop-types */

const Resident = (props) => {
    function repairComponent(device, status, setter) {
        return (
            <div>{`Your ${device} in ${status} `} 
                <button onClick={() => setter('IGNORED')}>IGNORE</button> {' '} 
                <button onClick={() => setter('ASKED MAINTENANCE TO FIX')}>ASK MAINTENANCE TO FIX IT</button>
                <br />
            </div>
        )
    }
    return (
        <div>
            <h1>RESIDENT</h1>
            <hr />
            {props.dishWasher == 'OK' && props.doorLock == 'OK' && 
             props.oven == 'OK' && props.washingMachine == 'OK'
                ? <h3>All you appliances are working fine</h3>
                : null}
            {props.dishWasher == 'BROKEN'
                    ? repairComponent('dishwasher', props.dishWasher, props.setDishWasher)
                    : null}
            {props.doorLock == 'BROKEN'
                    ? repairComponent('door lock', props.doorLock, props.setDoorLock)
                    : null}
            {props.oven == 'BROKEN'
                    ? repairComponent('oven', props.oven, props.setOven)
                    : null}
            {props.washingMachine == 'BROKEN'
                    ? repairComponent('washing machine', props.washingMachine, props.setWashingMachine)
                    : null}
            <hr />
            <h3>Your appliances</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>DEVICE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th align="left">Dishwasher</th>
                        <th>{props.dishWasher}</th>
                    </tr>
                    <tr>
                        <th align="left">Door lock</th>
                        <th>{props.doorLock}</th>
                    </tr>
                    <tr>
                        <th align="left">Oven</th>
                        <th>{props.oven}</th>
                    </tr>
                    <tr>
                        <th align="left">Washing machine</th>
                        <th>{props.washingMachine}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Resident
