const MG2Pekka = (assignableTasks) => {
    return (
        <div>
            <h1>PEKKA</h1>
            <ul>
                {assignableTasks['assignableTasks']
                    .filter((task) => task.employee == 'pekka')
                    .map(task => <li key={task.flat}>{task.flat} - {task.device} - {task.errorCode}</li>)}
            </ul>
        </div>
    )
}

export default MG2Pekka
