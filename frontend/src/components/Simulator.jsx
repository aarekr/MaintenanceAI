import { useState } from "react"
import Button from 'react-bootstrap/Button';

const Simulator = (props) => {
    const [ counter, setCounter ] = useState(0)
    //const [ newAssignedTask, setNewAssignedTask ] = useState('')

    let devices = ['Dishwasher', 'Microwave', 'Oven', 'Stove', 'Washing machine']
    let errorCodes = [101, 102, 103, 104, 105]
    let employeeList = ['matti', 'pekka', 'timo']

    /*const simulateToList = () => {
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
            'repairMeasure': 'NA',
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
    }*/

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
            'repairMeasure': 'NA',
            'worker': 'not assigned',
            'timeTicketCreated': new Date(),
            'residentMessage': '...',
        }
        setCounter(counter + 1)
        props.setRepairTasks(props.repairTasks.concat(newTaskObject))
    }

    const simulateAndAssignTask = (color) => {
        //console.log('simulateAndAssign color:', color)
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
        let employee;
        if (errorCode == 101) {
            console.log('going through assignableTasks:', props.assignableTasks.map(task => task.employee))
            let counts = [
                ['matti', Number(props.assignableTasks.filter((task) => 
                    task.employee == 'matti' && task.status != 'REPAIR COMPLETED').length)],
                ['pekka', Number(props.assignableTasks.filter((task) => 
                    task.employee == 'pekka' && task.status != 'REPAIR COMPLETED').length)],
                ['timo', Number(props.assignableTasks.filter((task) => 
                    task.employee == 'timo' && task.status != 'REPAIR COMPLETED').length)]
            ]
            console.log('simulateAndAssignTask counts: ', counts)
            let min = 1000, max = -1000;
            let minEmp = '', maxEmp = '';
            for (let i=0; i<counts.length; i++) {
                console.log('for counts:', counts[i][1], counts[i][0])
                if (counts[i][1] >= max) {
                    max = counts[i][1]
                    maxEmp = counts[i][0]
                }
                if (counts[i][1] <= min) {
                    min = counts[i][1]
                    minEmp = counts[i][0]
                }
            }
            console.log('min, max & diff:', min, max, ' - ', max-min)
            console.log('minEmp, maxEmp:', minEmp, maxEmp)
            if (max - min == 0) {
                employee = employeeList[(Math.floor(Math.random() * employeeList.length))]
            }
            else if (max - min == 1) {
                let minList = []
                for (let i=0; i<counts.length; i++) {
                    if (counts[i][1] == min) minList.push(counts[i][0])
                }
                if (minList.length == 1) employee = minList[0]
                else employee = Math.random() > 0.5 ? minList[0] : minList[1]
            }
            else if (max - min > 1) {
                let maxEmpTask = props.assignableTasks.filter((task) => task.employee == maxEmp)
                console.log('maxEmpTask:', maxEmp, maxEmpTask)
                let minEmpTask = props.assignableTasks.filter((task) => task.employee == minEmp)
                console.log('minEmpTask:', minEmp, minEmpTask)
                maxEmpTask[maxEmpTask.length - 1].employee = minEmp
                console.log('task reassigned:', props.assignableTasks.map(task => task.employee))
                employee = minEmp
            }
        }
        console.log('---> employee:', employee)
        let newTaskObject = {
            'flat': flatNumber,
            'device': devices[randomDevice],
            'errorCode': errorCode,
            'status': errorCode == 101
                ? 'BROKEN'
                : errorCode == 102 || errorCode == 103
                    ? 'MAINTENANCE'
                    : 'NA',
            'repairMeasure': 'NA',
            //'employee': employeeList[(Math.floor(Math.random() * employeeList.length))], // employee chosen randomly
            'employee': employee,
            'timeTicketCreated': new Date(),
            'residentMessage': '...',
        }
        setCounter(counter + 1)
        props.setAssignableTasks(props.assignableTasks.concat(newTaskObject))
        setCounter(counter + 1)
        setCounter(counter + 1)
    }

    const distributeWorkload = () => {
        let counts = [
            ['matti', Number(props.assignableTasks.filter((task) => 
                task.employee == 'matti' && task.status != 'REPAIR COMPLETED').length)],
            ['pekka', Number(props.assignableTasks.filter((task) => 
                task.employee == 'pekka' && task.status != 'REPAIR COMPLETED').length)],
            ['timo', Number(props.assignableTasks.filter((task) => 
                task.employee == 'timo' && task.status != 'REPAIR COMPLETED').length)]
        ]
        console.log('Simulator distributeWorkload counts: ', counts)
    }

    for (let i=0; i<1; i++) {
        distributeWorkload()
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
            <h4>1000 flats simulator - 1 maintenance page</h4>
            <Button size='sm' variant='danger' onClick={() => simulateColor('red')}>RED</Button> {' '}
            <Button size='sm' variant='warning' onClick={() => simulateColor('yellow')}>YELLOW</Button> {' '}
            <Button size='sm' variant='secondary' onClick={() => simulateColor('third')}>GREY</Button> {' '}
            <hr />
            <h4>1000 flats simulator - 3 maintenance workers</h4>
            <Button size='sm' variant='danger' onClick={() => simulateAndAssignTask('red')}>RED</Button> {' '}
            <Button size='sm' variant='warning' onClick={() => simulateAndAssignTask('yellow')}>YELLOW</Button> {' '}
            <Button size='sm' variant='secondary' onClick={() => simulateAndAssignTask('grey')}>GREY</Button> {' '}
            <hr />
            {counter}
        </div>
    )
}

export default Simulator

// <button onClick={() => simulateToList()}>SIMULATE TO LIST</button> {' '} - {' '}
