import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"
import StatusBadge from "./StatusBadge"
//const { addDays } = require("date-fns")
import { addBusinessDays } from "date-fns";

const Flat = (props) => {
    const id = Number(useParams().id)
    let thisFlat = props.assignableTasks.filter(flat => id == flat['flat'])[0]
    console.log('thisFlat:', thisFlat)
    console.log('thisFlat.timeTicketCreated:', thisFlat.timeTicketCreated)
    const repairETA = addBusinessDays(thisFlat.timeTicketCreated, 2).toString()
    let estimatedRepair = repairETA.split(' ')
    let displayedETA = estimatedRepair[4]+' '+estimatedRepair[0]+' '+estimatedRepair[2]+' '+estimatedRepair[1]
    console.log('displayedETA:', displayedETA)
    if (thisFlat == undefined) {
        return (
            <div>
                no content on this page
            </div>
        )
    }
    let timeStamp = thisFlat.timeTicketCreated.toString().split(' ')
    let timeOnTicket = timeStamp[4]+' '+timeStamp[0]+' '+timeStamp[2]+' '+timeStamp[1]

    return (
        <div>
            <h1>RESIDENT - 1000 FLAT VIEW</h1>
            <hr /> <br />
            <h3>Your appliances</h3>
            <div className="form-group row">
                <div className="col-10">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>DEVICE</th>
                                <th><center>STATUS</center></th>
                                <th>SERVICE MEASURE</th>
                                <th>TIME OF BREAKDOWN</th>
                                <th>ESTIMATED REPAIR</th>
                                <th>EMPLOYEE</th>
                                <th>DEVICE DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="left">{thisFlat.device}</td>
                                <td align='center'>{StatusBadge(thisFlat.status)}</td>
                                <td align='center'>{thisFlat.repairMeasure}</td>
                                <td>{timeOnTicket}</td>
                                <td>{displayedETA}</td>
                                <td>{thisFlat.employee}</td>
                                <td>details</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Flat
