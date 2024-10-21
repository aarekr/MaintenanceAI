const MG1Matti = (assignableTasks) => {
    console.log('MG1 Matti tasks:', assignableTasks['assignableTasks'].map(task => task.employee == 'matti' ? task : null))
    return (
        <div>
            <h1>MATTI</h1>
            <ul>
                {assignableTasks['assignableTasks']
                    .filter((task) => task.employee == 'matti')
                    .map(task => <li key={task.flat}>{task.flat} - {task.device} - {task.errorCode}</li>)}
            </ul>
        </div>
    )
}

export default MG1Matti
