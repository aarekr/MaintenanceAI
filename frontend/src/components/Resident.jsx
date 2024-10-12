/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap"

const Resident = (props) => {
    function repairComponent(device, status, setter) {
        return (
            <div>{`Your ${device} in ${status} `}
                <button>I WILL DO IT MYSELF</button> {' '} 
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
            <Table striped>
                <thead>
                    <tr>
                        <th>DEVICE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="left">Dishwasher</td>
                        <td>{props.dishWasher}</td>
                    </tr>
                    <tr>
                        <td align="left">Door lock</td>
                        <td>{props.doorLock}</td>
                    </tr>
                    <tr>
                        <td align="left">Oven</td>
                        <td>{props.oven}</td>
                    </tr>
                    <tr>
                        <td align="left">Washing machine</td>
                        <td>{props.washingMachine}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Resident
