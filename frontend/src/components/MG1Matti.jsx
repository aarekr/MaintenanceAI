import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StatusBadge from "./StatusBadge";
import ErrorBadge from "./ErrorBadge";

const MG1Matti = (assignableTasks) => {
    const [ taskUpdate, setTaskUpdate ] = useState(0)

    let filteredTasks = assignableTasks['assignableTasks'].filter((task) => task.employee == 'matti')
    const handleRepairStatusChange = (task, newStatus) => {
        task.status = newStatus
        if (newStatus == 'OK') task.employee = 'not assigned'
        setTaskUpdate(taskUpdate + 1)
    }

    const setRepairMeasure = (task, newStatus) => {
        task.repairMeasure = newStatus
        setTaskUpdate(taskUpdate + 1)
    }

    const repairComponent = (task) => {
        let timeStamp = task.timeTicketCreated.toString().split(' ')
        let timeOnTicket = timeStamp[4]+' '+timeStamp[0]+' '+timeStamp[2]+' '+timeStamp[1]+' '+timeStamp[3]
        return (
            <div>
                <Card className="text-left">
                    <Card.Header><h3>Flat {task.flat}</h3></Card.Header>
                    <Card.Body>
                        <Card.Title>{task.device}</Card.Title>
                        <Card.Text>Status: {StatusBadge(task.status)}</Card.Text>
                        <Card.Text>Error code: {ErrorBadge(task.errorCode)} : explanation</Card.Text>
                        <Card.Text>Repair measure: {task.repairMeasure} {' '} <br />
                            <button onClick={() => setRepairMeasure(task, 'fix on spot')}>fix on spot</button> {' '}
                            <button onClick={() => setRepairMeasure(task, 'replace')}>replace</button> {' '}
                        </Card.Text>
                        <Card.Text>Message from resident: {task.residentMessage}</Card.Text>
                        <Button variant="primary" size="sm" onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR STARTED')}>Start</Button> {' '}
                        <Button variant="success" size="sm" onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR COMPLETED')}>Complete</Button> {' '}
                        <Button variant="danger" size="sm" onClick={() => 
                            handleRepairStatusChange(task, 'OK')}>Remove</Button> {' '}
                    </Card.Body>
                    <Card.Footer className="text-muted">Ticket created: {timeOnTicket}</Card.Footer>
                </Card> <br />
            </div>
        )
    }

    const redistributeWorkload = () => {
        let counts = [
            ['matti', Number(assignableTasks['assignableTasks'].filter((task) => 
                task.employee == 'matti' && task.status != 'REPAIR COMPLETED').length)],
            ['pekka', Number(assignableTasks['assignableTasks'].filter((task) => 
                task.employee == 'pekka' && task.status != 'REPAIR COMPLETED').length)],
            ['timo', Number(assignableTasks['assignableTasks'].filter((task) => 
                task.employee == 'timo' && task.status != 'REPAIR COMPLETED').length)]
        ]
        console.log('Matti distributeWorkload counts: ', counts)
        let min = 1000, max = -1000;
        let minEmp = [], maxEmp = [];
        for (let i=0; i<counts.length; i++) {
            console.log('for counts:', counts[i][1], counts[i][0])
            if (counts[i][1] > max) max = counts[i][1]
            if (counts[i][1] <= min) min = counts[i][1]
        }
        for (let i=0; i<counts.length; i++) {
            if (counts[i][1] >= max) maxEmp.push(counts[i][0])
            if (counts[i][1] <= min) minEmp.push(counts[i][0])
        }
        console.log('min, max & diff:', min, max, ' - ', max-min)
        console.log('minEmp, maxEmp:', minEmp, maxEmp)
        let allTasks = assignableTasks['assignableTasks'].filter((task) => 
            task.status != 'REPAIR COMPLETED' && task.status != 'OK')
        if (allTasks.includes(0) && allTasks.includes(2)) {
            console.log('allTasks 0&2:', allTasks)
        }
        if (max - min > 1) {
            console.log('max - min > 1')
            let chosenMaxEmp = 'NA', chosenMinEmp = 'NA'
            console.log('allTasks alussa:', allTasks)
            if (maxEmp.length > 1) {
                chosenMaxEmp = Math.random() > 0.5 ? maxEmp[0] : maxEmp[1]
                chosenMinEmp = Math.random() > 0.5 ? minEmp[0] : minEmp[1]
            }
            else if (maxEmp.length == 1) {
                chosenMaxEmp = maxEmp[0]
                chosenMinEmp = minEmp[0]
            }
            let length = assignableTasks['assignableTasks'].filter((task) => 
                task.employee == chosenMaxEmp && task.status != 'REPAIR COMPLETED').length
            console.log('redistributing tasks')
            assignableTasks['assignableTasks'].filter((task) => 
                task.employee == chosenMaxEmp && 
                task.status != 'REPAIR COMPLETED')[length-1]
                    .employee = chosenMinEmp
            console.log('allTasks lopussa:', allTasks)
            setTaskUpdate(taskUpdate + 1)
        }
        minEmp = []
        maxEmp = []
    }

    for (let i=0; i<1; i++) {
        redistributeWorkload()
    }

    if (assignableTasks == 0) {
        return (
            <div>
                <h1>MATTI - 1000 FLATS</h1>
                <hr />
                <h3>Nothing to fix</h3>
            </div>
        )
    }

    return (
        <div>
            <h1>MATTI - 1000 FLATS</h1>
            <hr />
            <br />
            <div className="form-group row">
                <div className="col-4">
                    <h3>To do list</h3> <br />
                    {filteredTasks
                        .filter(task => !task.status.includes('REPAIR'))
                        .sort((a,b) => a.errorCode - b.errorCode)
                        .map(task => repairComponent(task)
                    )}
                </div>
                <div className="col-4">
                    <h3>Repair started</h3> <br />
                    {filteredTasks
                        .filter(task => task.status == 'REPAIR STARTED')
                        .sort((a,b) => a.errorCode - b.errorCode)
                        .map(task => repairComponent(task)
                    )}
                </div>
                <div className="col-4">
                    <h3>Repair completed</h3> <br />
                        {filteredTasks
                            .filter(task => task.status == 'REPAIR COMPLETED')
                            .sort((a,b) => a.errorCode - b.errorCode)
                            .map(task => repairComponent(task)
                        )}
                </div>
            </div>
        </div>
    )
}

export default MG1Matti
