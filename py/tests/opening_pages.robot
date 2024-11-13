*** Settings ***
Resource  resource.robot

*** Test Cases ***
Simulators Page Should Open With Right Content
    Open Browser To Simulators Page
    Title Should Be  Maintenance AI
    Page Should Contain  1000 flats, 3 employees, 6 services companies
    Page Should Not Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  TIMO
    Close Browser

Mattis Page Should Open With Right Content
    Open Browser To Mattis Page
    Page Should Contain  MATTI
    Page Should Contain  TO DO
    Page Should Contain  STARTED
    Page Should Contain  COMPLETED
    Page Should Not Contain  PEKKA
    Page Should Not Contain  TIMO
    Page Should Not Contain  MANAGER

Pekkas Page Should Open With Right Content
    Open Browser To Pekkas Page
    Page Should Contain  PEKKA
    Page Should Contain  TO DO
    Page Should Contain  STARTED
    Page Should Contain  COMPLETED
    Page Should Not Contain  MATTI
    Page Should Not Contain  TIMO
    Page Should Not Contain  MANAGER

Timos Page Should Open With Right Content
    Open Browser To Timos Page
    Page Should Contain  TIMO
    Page Should Contain  TO DO
    Page Should Contain  STARTED
    Page Should Contain  COMPLETED
    Page Should Not Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  MANAGER

Managers Page Should Open With Right Content
    Open Browser To Manager Page
    Page Should Contain  MANAGER
    Page Should Contain  Tasks overview
    Page Should Contain  Tasks per device
    Page Should Contain  Tasks per employee
    Page Should Contain  Brand & Model
    Page Should Contain  Employee / Company

Offers Page Should Open With Right Content
    Open Browser To Offers Page
    Page Should Contain  OFFERS
