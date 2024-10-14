import { useState } from "react"


const DoItYourself = ({ residentDeviceList, residentDeviceListStatuses,
    dishWasher, setDishWasher }) => {
    //console.log('Do It Yourself page: device', residentDeviceList, residentDeviceListStatuses)
    const [ electricity, setElectricity ] = useState('')
    const [ unplugging, setUnplugging ] = useState('')
    const [ functions, setFunctions ] = useState('')

    const showDeviceDetails = (device, status) => {
        return (
            <div className="container">
                <br />
                {dishWasher != 'OK'
                    ? <h5>{device} - {status} {status == 101 ? 'no electricity' : null}</h5>
                    : <h5>All devices function as they should</h5>}
                <br />
                <div className="container">
                    {status == 101 && electricity == ''
                        ? <p>Does the device turn on? {' '}
                            <button onClick={() => {
                                setElectricity('yes')
                                setFunctions('no')}}>YES</button> {' '}
                            <button onClick={() => setElectricity('no')}>NO</button> {' '}
                            <button onClick={() => setElectricity('???')}>I do not know</button> {' '}</p>
                        : null}
                    
                    {status == 101 && (electricity == 'no' || electricity == '???') && unplugging == ''
                        ? <p>Unplug the power cable from the socket and plug it in again.<br />
                            Did it help? {' '}
                            <button onClick={() => {
                                setElectricity('yes')
                                setUnplugging('power on')}}>YES, the power is on now</button> {' '}
                            <button onClick={() => {
                                setElectricity('no')
                                setUnplugging('no power')}}>NO, still not working</button></p>
                        : null}
                    {status == 101 && electricity == 'no' && unplugging == 'no power'
                        ? <p>Ask the maintenance company to fix it {' '}
                            <button onClick={() => setDishWasher('ASKED MAINTENANCE TO FIX')}>Send request</button>
                        </p>
                        : null}
                    {status == 101 && electricity == 'yes' && unplugging == 'power on' && functions == ''
                        ? <p>Does the device function now? {' '}
                            <button onClick={() => {
                                setDishWasher('OK')
                                setFunctions('yes')}}>YES</button> {' '}
                            <button onClick={() => setFunctions('no')}>NO</button> {' '}</p>
                        : null}
                    {status == 101 && electricity == 'yes' && functions == 'no'
                        ? <p>Does the device show any error codes? {' '}
                            <button>YES: E345</button> {' '}
                            <button>YES: E765</button> {' '}
                            <button>NO</button> {' '}</p>
                        : null}
                    <hr />
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1>Do it yourself page</h1>
            <hr />
            {residentDeviceListStatuses[0][0] == 'RESIDENT FIXES'
                ? showDeviceDetails(residentDeviceList[0], residentDeviceListStatuses[0][1])
                : null}
            {residentDeviceListStatuses[1][0] == 'RESIDENT FIXES'
                ? showDeviceDetails(residentDeviceList[1], residentDeviceListStatuses[1][1])
                : null}
            {residentDeviceListStatuses[2][0] == 'RESIDENT FIXES'
                ? showDeviceDetails(residentDeviceList[2], residentDeviceListStatuses[2][1])
                : null}
            {residentDeviceListStatuses[3][0] == 'RESIDENT FIXES'
                ? showDeviceDetails(residentDeviceList[3], residentDeviceListStatuses[3][1])
                : null}
        </div>
    )
}

export default DoItYourself
