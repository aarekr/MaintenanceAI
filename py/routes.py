from flask import render_template, redirect, request
from sqlalchemy.sql import text

from app import app
from db import db

import random
from datetime import datetime

DEVICES = ["Dishwasher", "Microwave", "Oven", "Stove", "Washing machine"]
ERROR_CODES = [101, 102, 103, 104, 105]
EMPLOYEES = ["Matti", "Pekka", "Timo"]

@app.route("/")
def index():
    return redirect("/simulator")
    #return render_template("index.html") 

@app.route("/simulator")
def simulator():
    return render_template("simulator.html")

@app.route("/createurgentcase", methods=["POST"])
def create_urgent_case():
    print("creating new urgent service case")
    flat_number = random.randint(1, 1000)
    device = random.choice(DEVICES)
    error_code = 101
    repair_status = "NA"
    repair_measure = "NA"
    employee = random.choice(EMPLOYEES)
    time_ticket_created = "DATE HERE" # datetime.now()
    resident_message = "..."
    visible = True
    sql = text("INSERT INTO maitasks (flat_number, device, error_code, repair_status, \
               repair_measure, employee, time_ticket_created, resident_message, visible) VALUES \
               (:flat_number, :device, :error_code, :repair_status, :repair_measure, :employee, \
               :time_ticket_created, :resident_message, :visible)")
    db.session.execute(sql, {"flat_number":flat_number, "device":device, "error_code":error_code, \
                             "repair_status":repair_status, "repair_measure":repair_measure, \
                                "employee":employee, "time_ticket_created":time_ticket_created, \
                                "resident_message":resident_message, "visible":visible})
    db.session.commit()
    return redirect("/simulator")

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
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    print("manager all_tasks:", all_tasks)
    return render_template("manager.html", all_tasks=all_tasks)

@app.route("/flat/<int:id>")
def page(id):
    return "This is flat " + str(id) + " page."