import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Simulator from './components/Simulator'
import MaintenanceSingle from './components/MaintenanceSingle'
import Maintenance100 from './components/Maintenance100'
import Resident from './components/Resident'
import { useState } from 'react'
import DoItYourself from './components/DoItYourself'
import Manager from './components/Manager'

const App = () => {
  const [ dishWasher, setDishWasher ] = useState('OK')
  const [ doorLock, setDoorLock ] = useState('OK')
  const [ oven, setOven ] = useState('OK')
  const [ washingMachine, setWashingMachine ] = useState('OK')

  const residentDeviceList = ['Dishwasher', 'Door lock', 'Oven', 'Washing machine']
  const residentDeviceListStatuses = [[dishWasher, 101], [doorLock, 102], [oven, 103], [washingMachine, 104]]
  const [ repairTasks, setRepairTasks ] = useState([])

  const padding = {
    padding: 5
  }
  //console.log('run simulator: ', runSimulator)
  //console.log('APP repairTasks:', repairTasks)

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Maintenance AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" style={{marginLeft: "200"}}>
            <Nav.Link href="/" as="span">
              <Link style={padding} to="/">Simulator</Link>
            </Nav.Link>
            <Nav.Link href="/resident" as="span">
              <Link style={padding} to="/resident">Resident</Link>
            </Nav.Link>
            <Nav.Link href="/maintenance-single" as="span">
              <Link style={padding} to="/maintenance-single">Maintenance-single</Link>
            </Nav.Link>
            <Nav.Link href="/maintenance-100" as="span">
              <Link style={padding} to="/maintenance-100">Maintenance-100</Link>
            </Nav.Link>
            <Nav.Link href="/manager" as="span">
              <Link style={padding} to="/manager">Manager</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Routes>
        <Route path="/" element={<Simulator
          dishWasher={dishWasher}setDishWasher={setDishWasher}
          doorLock={doorLock} setDoorLock={setDoorLock}
          oven={oven} setOven={setOven}
          washingMachine={washingMachine} setWashingMachine={setWashingMachine}
          repairTasks={repairTasks} setRepairTasks={setRepairTasks} />} />
        <Route path="/resident" element={<Resident
          dishWasher={dishWasher} setDishWasher={setDishWasher}
          doorLock={doorLock} setDoorLock={setDoorLock}
          oven={oven} setOven={setOven}
          washingMachine={washingMachine} setWashingMachine={setWashingMachine} />} />
        <Route path="/maintenance-single" element={<MaintenanceSingle
          dishWasher={dishWasher} setDishWasher={setDishWasher}
          doorLock={doorLock} setDoorLock={setDoorLock}
          oven={oven} setOven={setOven}
          washingMachine={washingMachine} setWashingMachine={setWashingMachine}
          repairTasks={repairTasks} />} />
        <Route path="/maintenance-100" element={<Maintenance100
          dishWasher={dishWasher} setDishWasher={setDishWasher}
          doorLock={doorLock} setDoorLock={setDoorLock}
          oven={oven} setOven={setOven}
          washingMachine={washingMachine} setWashingMachine={setWashingMachine}
          repairTasks={repairTasks} />} />
        <Route path="/manager" element={<Manager
          dishWasher={dishWasher} setDishWasher={setDishWasher}
          doorLock={doorLock} setDoorLock={setDoorLock}
          oven={oven} setOven={setOven}
          washingMachine={washingMachine} setWashingMachine={setWashingMachine}
          repairTasks={repairTasks} />} />
        <Route path="/doityourself" element={<DoItYourself
          residentDeviceList={residentDeviceList}
          residentDeviceListStatuses={residentDeviceListStatuses}
          dishWasher={dishWasher} setDishWasher={setDishWasher} />} />
      </Routes>
    </Router>
  )
}

export default App
