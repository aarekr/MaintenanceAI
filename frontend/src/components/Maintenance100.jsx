/* eslint-disable react/prop-types */

import { Table, Button } from "react-bootstrap"
import Toast from 'react-bootstrap/Toast';

const Maintenance100 = (props) => {
    console.log('Maintenance props: ', props.repairTasks)
    let filteredTasks = props.repairTasks.filter(task => task.status != 'OK')
    //let filteredTasksUrgent = filteredTasks.filter(task => task.errorCode == 101)
    //let filteredTasksNormal = filteredTasks.filter(task => task.errorCode == '102' || task.errorCode == '103')
    //let filteredTasksNotice = filteredTasks.filter(task => task.errorCode == '104' || task.errorCode == '105')
    //filteredTasks = filteredTasks.sort((a,b) => a.errorCode - b.errorCode)
    const handleRepairStatusChange = (task, newStatus) => {
        console.log('handleRepairStatusChange:', task)
        task.status = newStatus
        //props.setRepairTasks(props.repairTasks)
    }
    const toastBGColor = (errorCode) => {
        if (errorCode == 101) {
            return 'danger'
        } else if (errorCode == 102 || errorCode == 103) {
            return 'warning'
        } else {
            return 'secondary'
        }
    }
    return (
        <div>
            <h1>MAINTENANCE 100 FLATS</h1>
            <hr />
            {props.repairTasks.length == 0
                ? <h3>Nothing to fix</h3>
                : <h3>Things to fix</h3>}
            <Table striped>
                <thead>
                    <tr>
                        <th>FLAT</th>
                        <th>DEVICE</th>
                        <th>ERROR</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.sort((a,b) => a.errorCode - b.errorCode).map(task =>
                        <tr key={task.flat}>
                            <td>{task.flat}</td>
                            <td>{task.device}</td>
                            <td>{task.errorCode}</td>
                            <td>{task.status}</td>
                            <td>
                                <Button size='sm' onClick={() => handleRepairStatusChange(task, 'STARTED')}>START</Button> {' '}
                                <Button size='sm' variant='success' onClick={() => handleRepairStatusChange(task, 'COMPLETED')}>COMPLETE</Button> {' '}
                                <Button size='sm' variant='danger' onClick={() => handleRepairStatusChange(task, 'OK')}>REMOVE</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <hr />
            {filteredTasks.map(task =>
                <Toast className="d-inline-block m-1" bg={toastBGColor(task.errorCode)} key={task.flat}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <strong className="me-auto">Flat {task.flat}</strong>
                        <small>{task.status}</small>
                    </Toast.Header>
                    <Toast.Body className={'text-white'}>
                        {task.device} - {task.errorCode} <br />
                        <button onClick={() => handleRepairStatusChange(task, 'STARTED')}>START</button> {' '}
                        <button onClick={() => handleRepairStatusChange(task, 'COMPLETED')}>COMPLETE</button> {' '}
                        <button onClick={() => handleRepairStatusChange(task, 'OK')}>REMOVE</button>
                    </Toast.Body>
                </Toast>
            )}
            
        </div>
    )
}

export default Maintenance100
