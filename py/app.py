from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/simulator")
def simulator():
    return render_template("simulator.html")

@app.route("/matti")
def matti():
    return "Matti"

@app.route("/pekka")
def pekka():
    return "Pekka"

@app.route("/timo")
def timo():
    return "Timo"

@app.route("/manager")
def manager():
    return "Manager"

@app.route("/flat/<int:id>")
def page(id):
    return "This is flat " + str(id) + " page."
