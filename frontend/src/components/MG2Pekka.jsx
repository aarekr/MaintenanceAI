import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StatusBadge from "./StatusBadge";
import ErrorBadge from "./ErrorBadge";

const MG2Pekka = (assignableTasks) => {
    const [ taskUpdate, setTaskUpdate ] = useState(0)

    let filteredTasks = assignableTasks['assignableTasks'].filter((task) => task.employee == 'pekka')
    const handleRepairStatusChange = (task, newStatus) => {
        task.status = newStatus
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
                        <Card.Text>Repair measure: {task.repairMeasure} {' '}
                            <button>fix on spot</button> {' '}
                            <button>replace</button> {' '}
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

    if (assignableTasks == 0) {
        return (
            <div>
                <h1>PEKKA - 1000 FLATS</h1>
                <hr />
                <h3>Nothing to fix</h3>
            </div>
        )
    }

    return (
        <div>
            <h1>PEKKA - 1000 FLATS</h1>
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

export default MG2Pekka
