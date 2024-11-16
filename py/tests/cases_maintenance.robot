*** Settings ***
Resource  resource.robot

*** Test Cases ***
Clicking Maintenance Creates One Maintenance Case On Manager Page
    Open Browser To Simulators Page
    Click Button  MAINTENANCE
    Click link  Manager
    Page Should Contain  MANAGER
    Page Should Contain  10

Maintenance Case Can Be Removed From The List
    Open Browser To Simulators Page
    Click link  Manager
    Click Button  Remove
    Page Should Contain  MANAGER
    Page Should Not Contain  10

Creating Three Maintenance Cases Allocates One Task To Each Employee
    Open Browser To Simulators Page
    Click Button  MAINTENANCE
    Click Button  MAINTENANCE
    Click Button  MAINTENANCE
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
