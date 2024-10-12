/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
                        <Card.Text>Status: {status}</Card.Text>
                        <Button variant="primary" size="sm" onClick={() => setter('REPAIR STARTED')}>Start</Button> {' '}
                        <Button variant="success" size="sm" onClick={() => setter('REPAIR COMPLETED')}>Complete</Button> {' '}
                        <Button variant="danger" size="sm" onClick={() => setter('OK')}>Remove</Button> {' '}
                    </Card.Body>
                    <Card.Footer className="text-muted">Time when notified of error</Card.Footer>
                </Card> <br />
            </div>
        )
    }
    return (
        <div>
            <h1>MAINTENANCE SINGLE FLAT</h1>
            <hr />
            {props.dishWasher == 'OK' && props.doorLock == 'OK' && 
             props.oven == 'OK' && props.washingMachine == 'OK'
                ? <h3>Nothing to fix</h3>
                : <h3>Things to fix</h3>}
            <br />
            {props.dishWasher != 'OK'
                ? repairComponent('dish washer', props.dishWasher, props.setDishWasher)
                : null}
            {props.doorLock != 'OK'
                ? repairComponent('door lock', props.doorLock, props.setDoorLock)
                : null}
            {props.oven != 'OK'
                ? repairComponent('oven', props.oven, props.setOven)
                : null}
            {props.washingMachine != 'OK'
                ? repairComponent('washing machine', props.washingMachine, props.setWashingMachine)
                : null}
        </div>
    )
}

export default MaintenanceSingle
