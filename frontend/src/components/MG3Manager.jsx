import { Link } from 'react-router-dom'
import { useState } from "react";
import { Table, Button } from "react-bootstrap"
import StatusBadge from "./StatusBadge";
import ErrorBadge from "./ErrorBadge";

const MG3Manager = (props) => {
    console.log('MG3Manager props:', props.assignableTasks)
    const [ taskUpdate, setTaskUpdate ] = useState(0)
    const [ searchFlat, setSearchFlat ] = useState('')
    const [ searchDevice, setSearchDevice ] = useState('')
    const [ searchErrorCode, setSearchErrorCode ] = useState('')
    const [ searchStatus, setSearchStatus ] = useState('')
    const [ searchEmployee, setSearchEmployee ] = useState('')

    let filteredTasks = props.assignableTasks.filter(task => task.status != 'OK')

    const handleRepairStatusChange = (task, newStatus) => {
        task.status = newStatus
        if (newStatus == 'OK') task.employee = 'not assigned'
        setTaskUpdate(taskUpdate + 1)
    }

    const handleSearchFlat = (event) => setSearchFlat(event.target.value)
    const handleSearchDevice = (event) => setSearchDevice(event.target.value)
    const handleSearchErrorCode = (event) => setSearchErrorCode(event.target.value)
    const handleSearchStatus = (event) => setSearchStatus(event.target.value)
    const handleSearchEmployee = (event) => setSearchEmployee(event.target.value)

    if (props.assignableTasks.length == 0) {
        return (
            <div>
                <h1>MANAGER - 1000 FLATS, 3 EMPLOYEES</h1>
                <hr />
                <h3>Nothing to fix</h3>
            </div>
        )
    }

    return (
        <div>
            <h1>MANAGER - 1000 FLATS, 3 EMPLOYEES</h1>
            <hr />
            <div>
                <h4>Tasks per employee</h4>
                <ul>
                    <li><h6>Matti: {props.assignableTasks.filter((task) => task.employee == 'matti' && 
                        (task.status != 'REPAIR COMPLETED' || task.status != 'OK')).length}</h6></li>
                    <li><h6>Pekka: {props.assignableTasks.filter((task) => task.employee == 'pekka' &&
                        (task.status != 'REPAIR COMPLETED' || task.status != 'OK')).length}</h6></li>
                    <li><h6>Timo : {props.assignableTasks.filter((task) => task.employee == 'timo' &&
                        (task.status != 'REPAIR COMPLETED' || task.status != 'OK')).length}</h6></li>
                </ul>
            </div>
            <hr />
            <h3>Work list, tasks total: {props.assignableTasks.length}</h3>
            <br />
            <Table striped>
                <thead>
                    <tr>
                        <th>FLAT</th>
                        <th>DEVICE</th>
                        <th><center>ERROR</center></th>
                        <th><center>STATUS</center></th>
                        <th><center>EMPLOYEE</center></th>
                        <th><center>ACTIONS</center></th>
                    </tr>
                    <tr>
                        <td><input value={searchFlat} onChange={handleSearchFlat} /></td>
                        <td><input value={searchDevice} onChange={handleSearchDevice} /></td>
                        <td><center><input value={searchErrorCode} onChange={handleSearchErrorCode} /></center></td>
                        <td><center><input value={searchStatus} onChange={handleSearchStatus} /></center></td>
                        <td><center><input value={searchEmployee} onChange={handleSearchEmployee} /></center></td>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks
                        .filter(task => searchFlat == ''
                            ? task
                            : task.flat.toString().includes(searchFlat.toString())
                                ? task.flat
                                : null)
                        .filter(task => task.device.toLowerCase().includes(searchDevice.toLowerCase()))
                        .filter(task => searchErrorCode == ''
                            ? task
                            : task.errorCode.toString().includes(searchErrorCode.toString())
                                ? task.errorCode
                                : null)
                        .filter(task => task.status.toLowerCase().includes(searchStatus.toLowerCase()))
                        .filter(task => task.employee.toLowerCase().includes(searchEmployee.toLowerCase()))
                        .sort((a,b) => a.errorCode - b.errorCode).map(task =>
                        <tr key={task.flat}>
                            <td><Link to={`/flat/${task.flat}`}>{task.flat}</Link></td>
                            <td>{task.device}</td>
                            <td><center>{ErrorBadge(task.errorCode)}</center></td>
                            <td><center>{StatusBadge(task.status)}</center></td>
                            <td><center>{task.employee}</center></td>
                            <td><center>
                                <Button size='sm' onClick={() => 
                                    handleRepairStatusChange(task, 'REPAIR STARTED')}>START</Button> {' '}
                                <Button size='sm' variant='success' onClick={() => 
                                    handleRepairStatusChange(task, 'REPAIR COMPLETED')}>COMPLETE</Button> {' '}
                                <Button size='sm' variant='danger' onClick={() => 
                                    handleRepairStatusChange(task, 'OK')}>REMOVE</Button></center>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )

    /*
    return (
        <div>
            <h1>MANAGER - MG3</h1>
            <hr />
            <Table striped>
                <thead></thead>
            </Table>
            <p>Tasks on the list: {props.assignableTasks.length}</p>
            <div>
                Matti: {props.assignableTasks.filter((task) => task.employee == 'matti').length} <br />
                Pekka: {props.assignableTasks.filter((task) => task.employee == 'pekka').length} <br />
                Timo : {props.assignableTasks.filter((task) => task.employee == 'timo').length} <br />
            </div>
            <br />
            <ol>
                {props.assignableTasks.map(task => <li key={task.flat}>{task.flat} - {task.employee}</li>)}
            </ol>
        </div>
    )*/
}

export default MG3Manager
