*** Settings ***
Resource  resource.robot

*** Test Cases ***
Clicking Check Creates One Check Case On Manager Page
    Open Browser To Simulators Page
    Click Button  CHECK
    Click link  Manager
    Page Should Contain  MANAGER
    Page Should Contain  10

Check Case Can Be Removed From The List
    Click link  Manager
    Click Button  Remove
    Page Should Contain  MANAGER

Creating Three Maintenance Cases Allocates One Task To Each Employee
    Click link  Simulator
    Click Button  CHECK
    Click Button  CHECK
    Click Button  CHECK
    Click link  Matti
    Page Should Contain  Flat
    Page Should Contain  Repair measure
    Click link  Pekka
    Page Should Contain  Flat
    Page Should Contain  Repair measure
    Click link  Timo
    Page Should Contain  Flat
    Page Should Contain  Repair measure
    Click link  Manager
    Page Should Contain  Matti
    Page Should Contain  Pekka
    Page Should Contain  Timo
    Click Button  Remove
    Click Button  Remove
    Click Button  Remove

Creating Six Maintenance Cases And Completing Tasks Will Cause Reallocation
    Click link  Simulator
    Click Button  CHECK
    Click Button  CHECK
    Click Button  CHECK
    Click Button  CHECK
    Click Button  CHECK
    Click Button  CHECK
    Click link  Manager
    Page Should Contain  Matti
    Page Should Contain  Pekka
    Page Should Contain  Timo
    Click link  Matti
    Click Button  Start
    Click Button  Complete
    Click Button  Remove
    Click Button  Start
    Click Button  Complete
    Click Button  Remove
    Page Should Contain  Flat
    Page Should Contain  Repair measure
    Click link  Pekka
    Click Button  Start
    Click Button  Complete
    Click Button  Remove
    Page Should Contain  Flat
    Page Should Contain  Repair measure
    Click link  Timo
    Click Button  Start
    Click Button  Complete
    Click link  Manager
    Click Button  Remove
    Click Button  Remove
    Click Button  Remove
