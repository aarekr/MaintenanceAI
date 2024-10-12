/* eslint-disable react/prop-types */

const Maintenance = (props) => {
    console.log('Maintenance props: ', props.repairTasks)
    const repairComponent = (device, status, setter) => {
        return (
            <div>
                {`Flat 1: ${device} status is ${status}`} - {' '}
                <button onClick={() => setter('REPAIR STARTED')}>Start</button> {' '}
                <button onClick={() => setter('REPAIR COMPLETED')}>Complete</button> {' '}
                <button onClick={() => setter('OK')}>Remove from list</button>
            </div>
        )
    }
    return (
        <div>
            <h1>MAINTENANCE</h1>
            <hr />
            {props.dishWasher == 'OK' && props.doorLock == 'OK' && 
             props.oven == 'OK' && props.washingMachine == 'OK'
                ? <h3>Nothing to fix</h3>
                : <h3>Things to fix</h3>}
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
            {props.repairTasks.map(task => <li key={task.flat}>{task.flat} - {task.device} - {task.errorCode} - {task.status}</li>)}
        </div>
    )
}

export default Maintenance
