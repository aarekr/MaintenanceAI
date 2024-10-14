import { useState } from "react";
import { Table, Button } from "react-bootstrap"
import Badge from 'react-bootstrap/Badge';
import StatusBadge from "./StatusBadge";

const Manager = (props) => {
    console.log('Maintenance props: ', props.repairTasks)
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
                <h1>MAINTENANCE - 100 FLATS</h1>
                <hr />
                <h3>Nothing to fix</h3>
            </div>
        )
    }

    return (
        <div>
            <h1>MAINTENANCE - 100 FLATS</h1>
            <hr />
            {props.repairTasks.length == 0
                ? <h3>Nothing to fix</h3>
                : <h3>Things to fix</h3>}
            <br />
            <h3>Cases in a list format</h3>
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
                            <td>{task.flat}</td>
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

const ErrorBadge = (errorCode) => {
    if (errorCode == 101) return <Badge pill bg='danger'>{errorCode}</Badge>
    else if (errorCode == 102 || errorCode == 103) return <Badge pill bg='warning'>{errorCode}</Badge>
    else if (errorCode == 104 || errorCode == 105) return <Badge pill bg='secondary'>{errorCode}</Badge>
    else return <Badge pill bg='info'>{errorCode}</Badge>
}

export default Manager
