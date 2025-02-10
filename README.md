# MaintenanceAI

### Structure
#### Functional
* chat folder has the Sami chatbot advising maintenance employees how to service the devices
* py folder has the main application code
#### Under construction
* dashboard folder contains dashboard where live breakdowns and services are shown (under construction)
* estimator folder contains breakdown simulation and will have machine learning tools for estimation (under construction)
#### Attempts and ended development
* chatbot folder has an OpenAI chatbot attempt (not functional and not developed)
* dialochat has Microsoft chatbot attempt (not functional and not developed)
* frontend folder contains the early phase of the project written in React (development ended)

### Starting the chat
* Train the model with: python3 train.py
* Run the app with: python3 app.py
* Some files are not included in the repo

### Starting the Python application
* Activate venv with: source venv/bin/activate
* Start the PostgreSQL database
* Start the app with: python3 run.py

### Robot tests
* Go to py directory
* Start the server
* Run tests with command:
```bash
robot tests
```
