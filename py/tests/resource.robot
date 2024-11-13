*** Settings ***
Library  SeleniumLibrary  run_on_failure=NOTHING
# Library  ../../routes.py

*** Variables ***
${SERVER}       localhost:5000/
${BROWSER}      Chrome
${DELAY}        0.2 seconds
${HOME_URL}     http://${SERVER}
${MATTIS_URL}   http://${SERVER}/matti
${PEKKAS_URL}   http://${SERVER}/pekka
${TIMOS_URL}    http://${SERVER}/timo
${MANAGER_URL}  http://${SERVER}/manager
${OFFERS_URL}   http://${SERVER}/offers

*** Keywords ***
Open Browser To Simulators Page
    Open Browser        ${HOME_URL}     ${BROWSER}
    Set Selenium Speed  ${DELAY}
    Simulators Page Should Be Open

Simulators Page Should Be Open
    Title Should Be     Maintenance AI

Open Browser To Mattis Page
    Open Browser        ${MATTIS_URL}   ${BROWSER}
    Set Selenium Speed  ${DELAY}

Open Browser To Pekkas Page
    Open Browser        ${PEKKAS_URL}   ${BROWSER}
    Set Selenium Speed  ${DELAY}

Open Browser To Timos Page
    Open Browser        ${TIMOS_URL}    ${BROWSER}
    Set Selenium Speed  ${DELAY}

Open Browser To Manager Page
    Open Browser        ${MANAGER_URL}  ${BROWSER}
    Set Selenium Speed  ${DELAY}

Open Browser To Offers Page
    Open Browser        ${OFFERS_URL}   ${BROWSER}
    Set Selenium Speed  ${DELAY}
