/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StatusBadge from './StatusBadge';

const MaintenanceSingle = (props) => {
    console.log('Maintenance props: ', props.repairTasks)
    const repairComponent = (device, status, setter) => {
        return (
            <div>
                <Card className="text-left">
                    <Card.Header><h3>Flat 1</h3></Card.Header>
                    <Card.Body>
                        <Card.Title>{device}</Card.Title>
                        <Card.Text>Message: resident message</Card.Text>
                        <Card.Text>Status: {StatusBadge(status)}</Card.Text>
                        <Button variant="primary" size="sm" onClick={() => 
                            setter('REPAIR STARTED')}>Start</Button> {' '}
                        <Button variant="success" size="sm" onClick={() => 
                            setter('REPAIR COMPLETED')}>Complete</Button> {' '}
                        <Button variant="danger" size="sm" onClick={() => 
                            setter('OK')}>Remove</Button> {' '}
                    </Card.Body>
                    <Card.Footer className="text-muted">Time when notified of error</Card.Footer>
                </Card> <br />
            </div>
        )
    }
    return (
        <div>
            <h1>MAINTENANCE - SINGLE FLAT</h1>
            <hr />
            {props.dishWasher == 'OK' && props.doorLock == 'OK' && 
                props.oven == 'OK' && props.washingMachine == 'OK'
                    ? <h3>Nothing to fix</h3>
                    : <h3>Things to fix</h3>}
            <br />
            <div className="form-group row">
                <div className="col-4">
                    <h4>To do</h4>
                    {props.dishWasher == 'BROKEN' || props.dishWasher == 'ASKED MAINTENANCE TO FIX'
                        ? repairComponent('dish washer', props.dishWasher, props.setDishWasher)
                        : null}
                    {props.doorLock == 'BROKEN' || props.doorLock == 'ASKED MAINTENANCE TO FIX'
                        ? repairComponent('door lock', props.doorLock, props.setDoorLock)
                        : null}
                    {props.oven == 'BROKEN' || props.oven == 'ASKED MAINTENANCE TO FIX'
                        ? repairComponent('oven', props.oven, props.setOven)
                        : null}
                    {props.washingMachine == 'BROKEN' || props.washingMachine == 'ASKED MAINTENANCE TO FIX'
                        ? repairComponent('washing machine', props.washingMachine, props.setWashingMachine)
                        : null}
                </div>
                
                <div className="col-4">
                    <h4>Resident fixes or ignored</h4>
                    {props.dishWasher == 'RESIDENT FIXES' || props.dishWasher == 'IGNORED'
                        ? repairComponent('dish washer', props.dishWasher, props.setDishWasher)
                        : null}
                    {props.doorLock == 'RESIDENT FIXES' || props.doorLock == 'IGNORED'
                        ? repairComponent('door lock', props.doorLock, props.setDoorLock)
                        : null}
                    {props.oven == 'RESIDENT FIXES' || props.oven == 'IGNORED'
                        ? repairComponent('oven', props.oven, props.setOven)
                        : null}
                    {props.washingMachine == 'RESIDENT FIXES' || props.washingMachine == 'IGNORED'
                        ? repairComponent('washing machine', props.washingMachine, props.setWashingMachine)
                        : null}
                </div>
                <div className="col-4">
                    <h4>Repair started / completed</h4>
                    {props.dishWasher == 'REPAIR STARTED' || props.dishWasher == 'REPAIR COMPLETED'
                        ? repairComponent('dish washer', props.dishWasher, props.setDishWasher)
                        : null}
                    {props.doorLock == 'REPAIR STARTED' || props.doorLock == 'REPAIR COMPLETED'
                        ? repairComponent('door lock', props.doorLock, props.setDoorLock)
                        : null}
                    {props.oven == 'REPAIR STARTED' || props.oven == 'REPAIR COMPLETED'
                        ? repairComponent('oven', props.oven, props.setOven)
                        : null}
                    {props.washingMachine == 'REPAIR STARTED' || props.washingMachine == 'REPAIR COMPLETED'
                        ? repairComponent('washing machine', props.washingMachine, props.setWashingMachine)
                        : null}
                </div>
            </div>
            
        </div>
    )
}

export default MaintenanceSingle
