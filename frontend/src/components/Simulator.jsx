import { useState } from "react"
import Button from 'react-bootstrap/Button';

const Simulator = (props) => {
    const [ counter, setCounter ] = useState(0)

    let devices = ['Dishwasher', 'Microwave', 'Oven', 'Stove', 'Washing machine']
    let errorCodes = [101, 102, 103, 104, 105]

    const simulateToList = () => {
        let flatNumber = 1 + Math.floor(1000 * Math.random())
        let randomDevice = Math.floor(5 * Math.random())
        let randomError = Math.floor(5 * Math.random())
        let errorCode = errorCodes[randomError]
        let newTaskObject = {
            'flat': flatNumber,
            'device': devices[randomDevice],
            'errorCode': errorCode,
            'status': errorCode == 101
                ? 'BROKEN'
                : errorCode == 102 || errorCode == 103
                    ? 'MAINTENANCE'
                    : 'NA',
            'timeTicketCreated': new Date()
        }
        console.log('newTaskObject:', newTaskObject)
        //handleSimulateToList(newTaskObject)
        console.log('handleSimulateToList')
        setCounter(counter + 1)
        //setNewTask(newTaskObject)
        //setLista(lista.concat(newTaskObject))
        props.setRepairTasks(props.repairTasks.concat(newTaskObject))
        //console.log('list after addition:', lista)
        console.log('repairTasks after addition:', props.repairTasks)
    }

    const simulateColor = (color) => {
        let flatNumber = 1 + Math.floor(1000 * Math.random())
        let randomDevice = Math.floor(5 * Math.random())
        let errorCode = 1
        if (color == 'red') {
            errorCode = errorCodes[0]
        } else if (color == 'yellow') {
            errorCode = Math.random() > 0.5 ? errorCodes[1] : errorCodes[2]
        } else if (color == 'third') {
            errorCode = Math.random() > 0.5 ? errorCodes[3] : errorCodes[4]
        }
        let newTaskObject = {
            'flat': flatNumber,
            'device': devices[randomDevice],
            'errorCode': errorCode,
            'status': errorCode == 101
                ? 'BROKEN'
                : errorCode == 102 || errorCode == 103
                    ? 'MAINTENANCE'
                    : 'NA',
            'timeTicketCreated': new Date(),
            'residentMessage': '...',
        }
        setCounter(counter + 1)
        props.setRepairTasks(props.repairTasks.concat(newTaskObject))
    }

    return (
        <div>
            <h1>SIMULATORS</h1> <br />
            <h4>Single flat simulator</h4>
            <p><button onClick={() => props.setDishWasher('BROKEN')}>Break it!</button> Dish washer </p>
            <p><button onClick={() => props.setDoorLock('BROKEN')}>Break it!</button> Lock </p>
            <p><button onClick={() => props.setOven('BROKEN')}>Break it!</button> Oven </p>
            <p><button onClick={() => props.setWashingMachine('BROKEN')}>Break it!</button> Washing machine </p>
            <hr />
            <h4>1000 flats simulator</h4>
            <button onClick={() => simulateToList()}>SIMULATE TO LIST</button> {' '} - {' '}
            <Button size='sm' variant='danger' onClick={() => simulateColor('red')}>RED</Button> {' '}
            <Button size='sm' variant='warning' onClick={() => simulateColor('yellow')}>YELLOW</Button> {' '}
            <Button size='sm' variant='secondary' onClick={() => simulateColor('third')}>GREY</Button> {' '}
            <hr />
        </div>
    )
}

export default Simulator
