/* eslint-disable react/prop-types */

import { useState } from "react"

const Simulator = (props) => {
    const [ runSimulator, setRunSimulator ] = useState(false)
    const [ recursionTime, setRecursionTime ] = useState(1000)
    const [ lista, setLista ] = useState([])
    const [ counter, setCounter ] = useState(0)

    let devices = ['dishwasher', 'microwave', 'oven', 'stove', 'washing machine']
    let errorCodes = [101, 102, 103, 104, 105]

    const handleListaAddition = () => {
        console.log('---> handleListaAddition, lista:', lista, counter)
        setLista(lista)
        setCounter(counter + 1)
        console.log('---> handleListaAddition, lista:', lista, counter)
    }

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    const greet = async () => {
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
    }

    console.log('runSimulator: ', runSimulator)
    //let arvo = true
    function rekursio(arvo) {
        console.log('rekursio: ', runSimulator)
        setTimeout(() => {
            rekursio(arvo)
        }, 1000)
    }
    /*const simulateEvents = () => {
        if (runSimulator == undefined) {
            console.log('UNDEFINED', runSimulator)
        } else if (runSimulator == true) {
            console.log('TRUE', runSimulator)
        } else if (runSimulator == false) {
            console.log('FALSE', runSimulator)
        }
    }*/
    /*setInterval(() => {
        console.log('interval')
        simulateEvents()
    }, 1000)*/


    const simulateToList = () => {
        let flatNumber = Math.floor(100 * Math.random().toFixed(2))
        //console.log('---> machine breaks, flat number:', flatNumber)
        let randomDevice = Math.floor(5 * Math.random())
        //console.log('---> device:', randomDevice, devices[randomDevice])
        let randomError = Math.floor(5 * Math.random())
        //console.log('---> randomError:', randomError, 'errorCode:', errorCodes[randomError])
        let newTaskObject = {
            'flat': flatNumber,
            'device': devices[randomDevice],
            'errorCode': errorCodes[randomError],
            'status': 'NA'
        }
        console.log('newTaskObject:', newTaskObject)
        //handleSimulateToList(newTaskObject)
        console.log('handleSimulateToList')
        setCounter(counter + 1)
        setLista(lista.concat(newTaskObject))
        props.setRepairTasks(props.repairTasks.concat(newTaskObject))
        console.log('list after addition:', lista)
        console.log('repairTasks after addition:', props.repairTasks)
    }

    return (
        <div>
            <h1>SIMULATOR</h1>
            <p><button onClick={() => props.setDishWasher('BROKEN')}>break it!</button> Dish washer </p>
            <p><button onClick={() => props.setDoorLock('BROKEN')}>break it!</button> Lock </p>
            <p><button onClick={() => props.setOven('BROKEN')}>break it!</button> Oven </p>
            <p><button onClick={() => props.setWashingMachine('BROKEN')}>break it!</button> Washing machine </p>
            <hr />
            <button onClick={() => simulateToList()}>SIMULATE TO LIST</button>
            <hr />
            <h4>Automatic simulator </h4>
            <button onClick={() => setRunSimulator(true)}>RUN</button> {' '}
            <button onClick={() => setRunSimulator(false)}>STOP</button> <br />
            <button onClick={() => rekursio(true)}>REKURSIO</button> <br />
            <button onClick={() => greet()}>GREET</button> {' '}
            <button onClick={() => setRecursionTime(100000)}>100000</button> 
        </div>
    )
}

export default Simulator
