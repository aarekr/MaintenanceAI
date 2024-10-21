import { Link } from 'react-router-dom'

import { useState } from "react";
import { Table, Button } from "react-bootstrap"
import StatusBadge from "./StatusBadge";
import ErrorBadge from "./ErrorBadge";

const Manager = (props) => {
    console.log('Manager maintenance props: ', props.repairTasks)
    const [ taskUpdate, setTaskUpdate ] = useState(0)
    const [ searchFlat, setSearchFlat ] = useState('')
    const [ searchDevice, setSearchDevice ] = useState('')
    const [ searchErrorCode, setSearchErrorCode ] = useState('')
    const [ searchStatus, setSearchStatus ] = useState('')

    let filteredTasks = props.repairTasks.filter(task => task.status != 'OK')
    const handleRepairStatusChange = (task, newStatus) => {
        console.log('handleRepairStatusChange:', task)
        task.status = newStatus
        setTaskUpdate(taskUpdate + 1)
    }

    const handleSearchFlat = (event) => setSearchFlat(event.target.value)
    const handleSearchDevice = (event) => setSearchDevice(event.target.value)
    const handleSearchErrorCode = (event) => setSearchErrorCode(event.target.value)
    const handleSearchStatus = (event) => setSearchStatus(event.target.value)

    if (props.repairTasks.length == 0) {
        return (
            <div>
                <h1>MANAGER - 1000 FLATS</h1>
                <hr />
                <h3>Nothing to fix</h3>
            </div>
        )
    }

    return (
        <div>
            <h1>MANAGER - 1000 FLATS</h1>
            <hr />
            <h3>Work list</h3>
            <br />
            <Table striped>
                <thead>
                    <tr>
                        <th>FLAT</th>
                        <th>DEVICE</th>
                        <th><center>ERROR</center></th>
                        <th><center>STATUS</center></th>
                        <th><center>ACTIONS</center></th>
                    </tr>
                    <tr>
                        <td><input value={searchFlat} onChange={handleSearchFlat} /></td>
                        <td><input value={searchDevice} onChange={handleSearchDevice} /></td>
                        <td><center><input value={searchErrorCode} onChange={handleSearchErrorCode} /></center></td>
                        <td><center><input value={searchStatus} onChange={handleSearchStatus} /></center></td>
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
                        .sort((a,b) => a.errorCode - b.errorCode).map(task =>
                        <tr key={task.flat}>
                            <td><Link to={`/flat/${task.flat}`}>{task.flat}</Link></td>
                            <td>{task.device}</td>
                            <td><center>{ErrorBadge(task.errorCode)}</center></td>
                            <td><center>{StatusBadge(task.status)}</center></td>
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
}

export default Manager
