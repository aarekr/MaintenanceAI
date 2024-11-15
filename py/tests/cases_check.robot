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
    Open Browser To Simulators Page
    Click link  Manager
    Click Button  Remove
    Page Should Contain  MANAGER
    Page Should Not Contain  10
