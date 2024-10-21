const MG3Timo = (assignableTasks) => {
    return (
        <div>
            <h1>TIMO</h1>
            <ul>
                {assignableTasks['assignableTasks']
                    .filter((task) => task.employee == 'timo')
                    .map(task => <li key={task.flat}>{task.flat} - {task.device} - {task.errorCode}</li>)}
            </ul>
        </div>
    )
}

export default MG3Timo
