import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Simulator from './components/Simulator'
import MaintenanceSingle from './components/MaintenanceSingle'
import Maintenance1000 from './components/Maintenance1000'
import Resident from './components/Resident'
import { useState } from 'react'
import DoItYourself from './components/DoItYourself'
import Manager from './components/Manager'
import Flat from './components/Flat'
import MG1Matti from './components/MG1Matti'
import MG2Pekka from './components/MG2Pekka'
import MG3Timo from './components/MG3Timo'
import MG3Manager from './components/MG3Manager'

const App = () => {
  // single flat items
  const [ dishWasher, setDishWasher ] = useState('OK')
  const [ doorLock, setDoorLock ] = useState('OK')
  const [ oven, setOven ] = useState('OK')
  const [ washingMachine, setWashingMachine ] = useState('OK')

  const residentDeviceList = ['Dishwasher', 'Door lock', 'Oven', 'Washing machine']
  const residentDeviceListStatuses = [[dishWasher, 101], [doorLock, 102], [oven, 103], [washingMachine, 104]]
  const [ repairTasks, setRepairTasks ] = useState([])
  const [ assignableTasks, setAssignableTasks ] = useState([])

  const padding = { padding: 5 }
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
            <Nav.Link href="/maintenance-1000" as="span">
              <Link style={padding} to="/maintenance-1000">Maintenance-1000</Link>
            </Nav.Link>
            <Nav.Link href="/manager" as="span">
              <Link style={padding} to="/manager">Manager</Link>
            </Nav.Link>
            <Nav.Link href="/mg1-matti" as="span">
              <Link style={padding} to="/mg1-matti">Matti</Link>
            </Nav.Link>
            <Nav.Link href="/mg2-pekka" as="span">
              <Link style={padding} to="/mg2-pekka">Pekka</Link>
            </Nav.Link>
            <Nav.Link href="/mg3-timo" as="span">
              <Link style={padding} to="/mg3-timo">Timo</Link>
            </Nav.Link>
            <Nav.Link href="/manager-mg3" as="span">
              <Link style={padding} to="/manager-mg3">Manager-MG3</Link>
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
          repairTasks={repairTasks} setRepairTasks={setRepairTasks}
          assignableTasks={assignableTasks} setAssignableTasks={setAssignableTasks} />} />
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
        <Route path="/doityourself" element={<DoItYourself
          residentDeviceList={residentDeviceList}
          residentDeviceListStatuses={residentDeviceListStatuses}
          dishWasher={dishWasher} setDishWasher={setDishWasher} />} />

        <Route path="/flat/:id" element={<Flat repairTasks={repairTasks} />} />
        <Route path="/maintenance-1000" element={<Maintenance1000
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
        <Route path="/mg1-matti" element={<MG1Matti assignableTasks={assignableTasks} setAssignableTasks={setAssignableTasks} />} />
        <Route path="/mg2-pekka" element={<MG2Pekka assignableTasks={assignableTasks} setAssignableTasks={setAssignableTasks} />} />
        <Route path="/mg3-timo" element={<MG3Timo assignableTasks={assignableTasks} setAssignableTasks={setAssignableTasks} />} />
        <Route path="/manager-mg3" element={<MG3Manager assignableTasks={assignableTasks} setAssignableTasks={setAssignableTasks} />} />
      </Routes>
    </Router>
  )
}

export default App
