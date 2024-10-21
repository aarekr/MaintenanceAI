import { Table } from "react-bootstrap"

const MG3Manager = (props) => {
    console.log('MG3Manager props:', props.assignableTasks)
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
    )
}

export default MG3Manager
