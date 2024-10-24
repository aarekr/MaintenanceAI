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
    return render_template("matti.html")

@app.route("/pekka")
def pekka():
    return render_template("pekka.html")

@app.route("/timo")
def timo():
    return render_template("timo.html")

@app.route("/manager")
def manager():
    return render_template("manager.html")

@app.route("/flat/<int:id>")
def page(id):
    return "This is flat " + str(id) + " page."
