*** Settings ***
Resource  resource.robot

*** Test Cases ***
New Maintenance Case Is Displayed On Flat Page
    Open Browser To Simulators Page
    Click Button  MAINTENANCE
    Click Button  MAINTENANCE
    Click Button  MAINTENANCE
    Click link  Timo
    Click Button  Visit
    Page Should Contain  Suggested visiting times to resident
    Click link  Flat
    Page Should Contain  FLAT
    Page Should Contain  Visit
    Page Should Contain  Timo

Resident Can Accept Suggested Visiting Times
    Click Button  Accept
    Click link  Timo
    Page Should Contain  Agreed visiting time
    Click Button  Start
    Page Should Contain  Repair started

Manager Sees Service Status And Measure
    Click link  Manager
    Page Should Contain  Repair started
    Page Should Contain  Visit

Employee Can Mark Fix In Flat As Repair Measure
    Click link  Timo
    Select Radio Button  measure    1
    Click Button  Save measure
    Page Should Contain  Fix in flat at

Employee Can Mark Replace As Repair Measure
    Click link  Pekka
    Click Button  Visit
    Page Should Contain  Suggested visiting times to resident
    Click link  Flat
    Page Should Contain  FLAT
    Page Should Contain  Visit
    Page Should Contain  Pekka
    Click Button  Accept
    Click link  Pekka
    Page Should Contain  Agreed visiting time
    Click Button  Start
    Page Should Contain  Repair started
    Select Radio Button  measure    2
    Click Button  Save measure
    Page Should Contain  Replace at

Employee Can Complete And Remove Task
    Click link  Timo
    Click Button  Complete
    Page Should Contain  Repair completed
    Click Button  Remove
    Page Should Not Contain  Repair completed
    Page Should Not Contain  Repair status
    Page Should Not Contain  Flat

Employee Can Complete Task And Manager Remove It
    Click link  Pekka
    Click Button  Complete
    Page Should Contain  Repair completed
    Click link  Manager
    Click Button  Remove
    Click Button  Remove
    Page Should Not Contain  Repair completed
    Click link  Pekka
    Page Should Not Contain  Repair completed
    Page Should Not Contain  Repair status
    Page Should Not Contain  Flat