*** Settings ***
Resource  resource.robot

*** Test Cases ***
Clicking Matti In Navigation Bar Should Open Matti Page
    Open Browser To Simulators Page
    Click link  Matti
    Page Should Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  TIMO
    Page Should Not Contain  MANAGER
    Page Should Not Contain  OFFERS

Clicking Pekka In Navigation Bar Should Open Pekka Page
    Open Browser To Simulators Page
    Click link  Pekka
    Page Should Contain  PEKKA
    Page Should Not Contain  MATTI
    Page Should Not Contain  TIMO
    Page Should Not Contain  MANAGER
    Page Should Not Contain  OFFERS

Clicking Timo In Navigation Bar Should Open Timo Page
    Open Browser To Simulators Page
    Click link  Timo
    Page Should Contain  TIMO
    Page Should Not Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  MANAGER
    Page Should Not Contain  OFFERS

Clicking Manager In Navigation Bar Should Open Manager Page
    Open Browser To Simulators Page
    Click link  Manager
    Page Should Contain  MANAGER
    Page Should Not Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  TIMO
    Page Should Not Contain  OFFERS

Clicking Offers In Navigation Bar Should Open Offers Page
    Open Browser To Simulators Page
    Click link  Offers
    Page Should Contain  OFFERS
    Page Should Not Contain  MATTI
    Page Should Not Contain  PEKKA
    Page Should Not Contain  TIMO
    Page Should Not Contain  MANAGER
