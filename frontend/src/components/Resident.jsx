import { Link } from 'react-router-dom'
import { Table, Button } from "react-bootstrap"
import StatusBadge from "./StatusBadge"

const Resident = (props) => {
    function repairComponent(device, status, setter) {
        return (
            <tr>
                <td>{`Your ${device} in ${status} `} {' '}</td>
                <td><Button sm='sm' variant='warning' onClick={() => 
                    setter('RESIDENT FIXES')}>I WILL DO IT MYSELF</Button> {' '} </td>
                <td><Button sm='sm' variant='danger' onClick={() => 
                    setter('IGNORED')}>IGNORE</Button> {' '} </td>
                <td><Button sm='sm' variant='info' onClick={() => 
                    setter('ASKED MAINTENANCE TO FIX')}>ASK MAINTENANCE TO FIX IT</Button></td>
            </tr>
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
            <table>
                <tbody>
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
                </tbody>
            </table>
            <hr />
            <h3>Your appliances</h3>
            <div className="form-group row">
                <div className="col-5">
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
                                <td align='center'>{props.dishWasher == 'RESIDENT FIXES'
                                    ? <Link to="/doityourself">Do it yourself page</Link>
                                    : StatusBadge(props.dishWasher)}</td>
                            </tr>
                            <tr>
                                <td align="left">Door lock</td>
                                <td align='center'>{props.doorLock == 'RESIDENT FIXES'
                                    ? <Link to="/doityourself">Do it yourself page</Link>
                                    : StatusBadge(props.doorLock)}</td>
                            </tr>
                            <tr>
                                <td align="left">Oven</td>
                                <td align='center'>{props.oven == 'RESIDENT FIXES'
                                    ? <Link to="/doityourself">Do it yourself page</Link>
                                    : StatusBadge(props.oven)}</td>
                            </tr>
                            <tr>
                                <td align="left">Washing machine</td>
                                <td align='center'>{props.washingMachine == 'RESIDENT FIXES'
                                    ? <Link to="/doityourself">Do it yourself page</Link>
                                    : StatusBadge(props.washingMachine)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Resident
