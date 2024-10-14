import { useState } from "react"

const Simulator = (props) => {
    //const [ runSimulator, setRunSimulator ] = useState(false)
    //const [ recursionTime, setRecursionTime ] = useState(1000)
    //const [ simulatorNotification, setSimulatorNotification ] = useState('')
    const [ counter, setCounter ] = useState(0)
    //const [ newTask, setNewTask ] = useState('')

    let devices = ['dishwasher', 'microwave', 'oven', 'stove', 'washing machine']
    let errorCodes = [101, 102, 103, 104, 105]


    //const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    /*const greet = async () => {
        while (runSimulator) {
            if (runSimulator == false) {
                break
            }
            await sleep(recursionTime)
            let luku = Math.random()
            console.log('while:', luku, runSimulator, recursionTime)
            if (luku < 0.2) {
                let flatNumber = Math.floor(100 * Math.random().toFixed(2))
                //console.log('---> machine breaks, flat number:', flatNumber)
                let randomDevice = Math.floor(5 * Math.random())
                //console.log('---> device:', randomDevice, devices[randomDevice])
                let randomError = Math.floor(5 * Math.random())
                //console.log('---> randomError:', randomError, 'errorCode:', errorCodes[randomError])
                let newTaskObject = {
                    'flat': flatNumber,
                    'device': devices[randomDevice],
                    'errorCode': errorCodes[randomError]
                }
                console.log('newTaskObject:', newTaskObject)
                //props.setRepairTasks(props.repairTasks.push(newTaskObject))  // shows right number but no data
                //props.repairTasks = props.repairTasks.concat(newTaskObject)
                //props.setRepairsTasks(props.repairTasks)
                //lista = lista.concat('L')
                //lista = lista.concat(newTaskObject)
                //setLista(lista.concat('l'))
                handleListaAddition()
                //props.setRepairTasks(lista)
                //setCounter(counter + 1)
            }
            console.log('repairTasks:', props.repairTasks)
            console.log('lista:', lista)
            //console.log('counter:', counter)
        }
    }*/

    //console.log('runSimulator: ', runSimulator)

    const simulateToList = () => {
        let flatNumber = 1 + Math.floor(100 * Math.random())
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
                    : 'NA'
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

    const simulateNine = () => {
        /*setTimeout(() => {
            let newTaskObject = {
                'flat': 1 + Math.floor(100 * Math.random()),
                'device': devices[Math.floor(5 * Math.random())],
                'errorCode': 101,
                'status': 'BROKEN'
            }
            console.log('newTaskObject:', newTaskObject)
            setNewTask(newTaskObject)
            props.setRepairTasks(props.repairTasks.concat(newTask))
            setNewTask('')
        }, 1000)*/
        setTimeout(() => {
            simulateToList()
        }, 1000)
        setTimeout(() => {
            simulateToList()
        }, 1500)
        setTimeout(() => {
            simulateToList()
        }, 2000)
    }

    return (
        <div>
            <h1>SIMULATORS</h1> <br />
            <h4>Single flat simulator</h4>
            <p><button onClick={() => props.setDishWasher('BROKEN')}>break it!</button> Dish washer </p>
            <p><button onClick={() => props.setDoorLock('BROKEN')}>break it!</button> Lock </p>
            <p><button onClick={() => props.setOven('BROKEN')}>break it!</button> Oven </p>
            <p><button onClick={() => props.setWashingMachine('BROKEN')}>break it!</button> Washing machine </p>
            <hr />
            <h4>100 flats simulator</h4>
            <button onClick={() => simulateToList()}>SIMULATE TO LIST</button> {' '}
            <button onClick={() => simulateNine()}>SIMULATE 9</button> {' '}
            <hr />
        </div>
    )
}

export default Simulator
