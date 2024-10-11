import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Simulator from './components/Simulator'
import Maintenance from './components/Maintenance'
import Resident from './components/Resident'
import { useState } from 'react'

const App = () => {
  const [ dishWasher, setDishWasher ] = useState('OK')
  const [ doorLock, setDoorLock ] = useState('OK')
  const [ oven, setOven ] = useState('OK')
  const [ washingMachine, setWashingMachine ] = useState('OK')

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/simulator">Simulator</Link>
        <Link style={padding} to="/resident">Resident</Link>
        <Link style={padding} to="/maintenance">Maintenance</Link>
      </div>
      <hr />
      <Routes>
        <Route path="/simulator" element={<Simulator dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine} />} />
        <Route path="/resident" element={<Resident dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine} />} />
        <Route path="/maintenance" element={<Maintenance dishWasher={dishWasher} setDishWasher={setDishWasher}
            doorLock={doorLock} setDoorLock={setDoorLock} oven={oven} setOven={setOven}
            washingMachine={washingMachine} setWashingMachine={setWashingMachine} />} />
      </Routes>
    </Router>
  )
}

export default App
