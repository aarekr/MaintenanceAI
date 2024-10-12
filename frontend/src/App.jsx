import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Simulator from './components/Simulator'
import MaintenanceSingle from './components/MaintenanceSingle'
import Maintenance100 from './components/Maintenance100'
import Resident from './components/Resident'
import { useState } from 'react'

const App = () => {
  const [ dishWasher, setDishWasher ] = useState('OK')
  const [ doorLock, setDoorLock ] = useState('OK')
  const [ oven, setOven ] = useState('OK')
  const [ washingMachine, setWashingMachine ] = useState('OK')

  const [ repairTasks, setRepairTasks ] = useState([])

  const padding = {
    padding: 5
  }
  //console.log('run simulator: ', runSimulator)
  //console.log('APP repairTasks:', repairTasks)

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Simulator</Link>
        <Link style={padding} to="/resident">Resident</Link>
        <Link style={padding} to="/maintenance-single">Maintenance-single</Link>
        <Link style={padding} to="/maintenance-100">Maintenance-100</Link>
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<Simulator dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine}
            repairTasks={repairTasks} setRepairTasks={setRepairTasks} />} />
        <Route path="/resident" element={<Resident dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine} />} />
        <Route path="/maintenance-single" element={<MaintenanceSingle dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine}
            repairTasks={repairTasks} />} />
        <Route path="/maintenance-100" element={<Maintenance100 dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine}
            repairTasks={repairTasks} />} />
      </Routes>
    </Router>
  )
}

export default App
