import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"
import StatusBadge from "./StatusBadge"

const Flat = (props) => {
    console.log('MG3Flat props:', props)
    const id = Number(useParams().id)
    let thisFlat = props.repairTasks.filter(flat => id == flat['flat'])[0]
    console.log('thisFlat:', thisFlat)
    if (thisFlat == undefined) {
        return (
            <div>
                no content on this page
            </div>
        )
    }
    let timeStamp = thisFlat.timeTicketCreated.toString().split(' ')
    let timeOnTicket = timeStamp[4]+' '+timeStamp[0]+' '+timeStamp[2]+' '+timeStamp[1]+' '+timeStamp[3]

    return (
        <div>
            <h1>RESIDENT - 1000 FLAT VIEW</h1>
            <hr />
            flat - {thisFlat.device} - {thisFlat.errorCode} - {thisFlat.status} - 
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
                                <th>DEVICE DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="left">{thisFlat.device}</td>
                                <td align='center'>{StatusBadge(thisFlat.status)}</td>
                                <td align='center'>{thisFlat.repairMeasure}</td>
                                <td>{timeOnTicket}</td>
                                <td>estimated time</td>
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
