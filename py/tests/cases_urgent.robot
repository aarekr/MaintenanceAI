*** Settings ***
Resource  resource.robot

*** Test Cases ***
Clicking Urgent Creates One Urgent Case On Manager Page
    Open Browser To Simulators Page
    Click Button  URGENT
    Click link  Manager
    Page Should Contain  MANAGER
    Page Should Contain  101
    Page Should Contain  euro

Urgent Case Can Be Removed From The List
    Open Browser To Simulators Page
    Click link  Manager
    Click Button  Remove
    Page Should Contain  MANAGER
    Page Should Not Contain  101
    Page Should Not Contain  euro

Creating Urgent Case Leads To Offers From companies
    Open Browser To Simulators Page
    Click link  Offers
    Page Should Contain  OFFERS
    Page Should Contain  :
    Page Should Contain  1
    Page Should Contain  euro
