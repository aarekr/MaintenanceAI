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

def allocate_new_task_to_employee():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    dict_emp_tasks = {"Matti": 0, "Pekka": 0, "Timo": 0}
    min = 1000
    max = 0
    for task in all_tasks:
        dict_emp_tasks[task[6]] += 1
    for key, value in dict_emp_tasks.items():
        if value > max:
            max = value
        if value < min:
            min = value
    min_task_emps = []
    for name, tasks in dict_emp_tasks.items():
        if tasks == min:
            min_task_emps.append(name)
    chosen_emp = random.choice(min_task_emps)
    return chosen_emp

@app.route("/createurgentcase", methods=["POST"])
def create_urgent_case():
    print("creating new urgent service case")
    flat_number = random.randint(1, 1000)
    device = random.choice(DEVICES)
    error_code = 101
    repair_status = "NA"
    repair_measure = "NA"
    employee = allocate_new_task_to_employee()
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
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    mattis_tasks = []
    for item in all_tasks:
        if item[6] == "Matti" and item[9] == True:
            mattis_tasks.append(item)
    return render_template("matti.html", mattis_tasks=mattis_tasks)

@app.route("/pekka")
def pekka():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    pekkas_tasks = []
    for item in all_tasks:
        if item[6] == 'Pekka' and item[9] == True:
            pekkas_tasks.append(item)
    return render_template("pekka.html", pekkas_tasks=pekkas_tasks)

@app.route("/timo")
def timo():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    timos_tasks = []
    for item in all_tasks:
        if item[6] == 'Timo' and item[9] == True:
            timos_tasks.append(item)
    return render_template("timo.html", timos_tasks=timos_tasks)

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

@app.route("/marktaskstarted/<int:id>", methods=["POST"])
def mark_task_started(id):
    repair_status = "Repair started"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    #name = request.form["name"]
    #print("name:", name)
    return redirect("/matti")

@app.route("/marktaskcompleted/<int:id>", methods=["POST"])
def mark_task_completed(id):
    repair_status = "Repair completed"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    return redirect("/matti")

@app.route("/marktaskremoved/<int:id>", methods=["POST"])
def mark_task_removed(id):
    visible = False
    sql = text("UPDATE maitasks SET visible=:visible WHERE id=:id")
    db.session.execute(sql, {"id":id, "visible":visible})
    db.session.commit()
    return redirect("/matti")

@app.route("/repairrecommendations")
def repair_recommendations():
    return render_template("repair_recommendations.html")
