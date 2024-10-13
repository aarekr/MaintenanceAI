/* eslint-disable react/prop-types */

import { Table, Button } from "react-bootstrap"
import StatusBadge from "./StatusBadge"

const Resident = (props) => {
    function repairComponent(device, status, setter) {
        return (
            <div>{`Your ${device} in ${status} `}
                <Button sm='sm' variant='warning' onClick={() => 
                    setter('RESIDENT FIXES')}>I WILL DO IT MYSELF</Button> {' '} 
                <Button sm='sm' variant='danger' onClick={() => 
                    setter('IGNORED')}>IGNORE</Button> {' '} 
                <Button sm='sm' variant='info' onClick={() => 
                    setter('ASKED MAINTENANCE TO FIX')}>ASK MAINTENANCE TO FIX IT</Button>
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
            <div className="form-group row">
                <div className="col-4">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>DEVICE</th>
                                <th><center>STATUS</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="left">Dishwasher</td>
                                <td align='center'>{StatusBadge(props.dishWasher)}</td>
                            </tr>
                            <tr>
                                <td align="left">Door lock</td>
                                <td align='center'>{StatusBadge(props.doorLock)}</td>
                            </tr>
                            <tr>
                                <td align="left">Oven</td>
                                <td align='center'>{StatusBadge(props.oven)}</td>
                            </tr>
                            <tr>
                                <td align="left">Washing machine</td>
                                <td align='center'>{StatusBadge(props.washingMachine)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Resident
