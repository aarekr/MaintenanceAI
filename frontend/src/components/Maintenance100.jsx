import { useState } from "react";
import Toast from 'react-bootstrap/Toast';
import StatusBadge from "./StatusBadge";

const Maintenance100 = (props) => {
    console.log('Maintenance props: ', props.repairTasks)
    const [ taskUpdate, setTaskUpdate ] = useState(0)

    let filteredTasks = props.repairTasks.filter(task => task.status != 'OK')
    const handleRepairStatusChange = (task, newStatus) => {
        console.log('handleRepairStatusChange:', task)
        task.status = newStatus
        setTaskUpdate(taskUpdate + 1)
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
            <h3>Cases in toast format</h3>
            {filteredTasks
                .filter(task => task.errorCode == 101)
                .sort((a,b) => a.errorCode - b.errorCode)
                .map(task =>
                <Toast className="d-inline-block m-1" bg={toastBGColor(task.errorCode)} key={task.flat}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <h4 className="me-auto">Flat {task.flat}</h4>
                        <h5>{StatusBadge(task.status)}</h5>
                    </Toast.Header>
                    <Toast.Body className={'text-white'}>
                        <h5>{task.device} - {task.errorCode}</h5>
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR STARTED')}>START</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR COMPLETED')}>COMPLETE</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'OK')}>REMOVE</button>
                    </Toast.Body>
                </Toast>
            )} <br />
            {filteredTasks
                .filter(task => task.errorCode == 102 || task.errorCode == 103)
                .sort((a,b) => a.errorCode - b.errorCode)
                .map(task =>
                <Toast className="d-inline-block m-1" bg={toastBGColor(task.errorCode)} key={task.flat}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <h4 className="me-auto">Flat {task.flat}</h4>
                        <h5>{StatusBadge(task.status)}</h5>
                    </Toast.Header>
                    <Toast.Body className={'text-white'}>
                        <h5>{task.device} - {task.errorCode}</h5>
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR STARTED')}>START</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR COMPLETED')}>COMPLETE</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'OK')}>REMOVE</button>
                    </Toast.Body>
                </Toast>
            )} <br />
            {filteredTasks
                .filter(task => task.errorCode == 104 || task.errorCode == 105)
                .sort((a,b) => a.errorCode - b.errorCode)
                .map(task =>
                <Toast className="d-inline-block m-1" bg={toastBGColor(task.errorCode)} key={task.flat}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <h4 className="me-auto">Flat {task.flat}</h4>
                        <h5>{StatusBadge(task.status)}</h5>
                    </Toast.Header>
                    <Toast.Body className={'text-white'}>
                        <h5>{task.device} - {task.errorCode}</h5>
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR STARTED')}>START</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'REPAIR COMPLETED')}>COMPLETE</button> {' '}
                        <button onClick={() => 
                            handleRepairStatusChange(task, 'OK')}>REMOVE</button>
                    </Toast.Body>
                </Toast>
            )}
        </div>
    )
}

export default Maintenance100
