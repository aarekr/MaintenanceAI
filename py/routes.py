from flask import render_template, redirect, request
from sqlalchemy.sql import text

from app import app
from db import db

import random
from datetime import datetime, timedelta
import time

DEVICES = ["Dishwasher", "Microwave", "Oven", "Stove", "Washing machine"]
ERROR_CODES = [101, 102, 103, 104, 105]
EMPLOYEES = ["Matti", "Pekka", "Timo"]

@app.route("/")
def index():
    return redirect("/simulator")

@app.route("/simulator")
def simulator():
    return render_template("simulator.html")

def render_manager_page(all_tasks):
    return render_template("manager.html", all_tasks=all_tasks)

@app.route("/startautomaticsimulator", methods=["POST"])
def start_automatic_simulator():
    i = 0
    while i < 3:
        print(i)
        i = i + 1
        create_urgent_case()
        time.sleep(2)
        sql = text("SELECT * FROM maitasks")
        result = db.session.execute(sql, {})
        all_tasks = result.fetchall()
        print("manager all_tasks:", all_tasks)
        render_manager_page(all_tasks)
        time.sleep(2)
    return render_template("manager.html", all_tasks=all_tasks)

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
    time_ticket_created = datetime.now()
    time_eta = time_ticket_created + timedelta(days=2)
    resident_message = "..."
    visible = True
    sql = text("INSERT INTO maitasks (flat_number, device, error_code, repair_status, \
               repair_measure, employee, time_ticket_created, time_eta, resident_message, visible) VALUES \
               (:flat_number, :device, :error_code, :repair_status, :repair_measure, :employee, \
               :time_ticket_created, :time_eta, :resident_message, :visible)")
    db.session.execute(sql, {"flat_number":flat_number, "device":device, "error_code":error_code, \
                             "repair_status":repair_status, "repair_measure":repair_measure, \
                                "employee":employee, "time_ticket_created":time_ticket_created, \
                                "time_eta":time_eta, "resident_message":resident_message, "visible":visible})
    db.session.commit()
    return redirect("/simulator")

@app.route("/matti")
def matti():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    mattis_tasks = []
    for item in all_tasks:
        if item[6] == "Matti" and item[10] == True:
            mattis_tasks.append(item)
    return render_template("matti.html", mattis_tasks=mattis_tasks)

@app.route("/pekka")
def pekka():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    pekkas_tasks = []
    for item in all_tasks:
        if item[6] == 'Pekka' and item[10] == True:
            pekkas_tasks.append(item)
    return render_template("pekka.html", pekkas_tasks=pekkas_tasks)

@app.route("/timo")
def timo():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    timos_tasks = []
    for item in all_tasks:
        if item[6] == 'Timo' and item[10] == True:
            timos_tasks.append(item)
    return render_template("timo.html", timos_tasks=timos_tasks)

@app.route("/manager")
def manager():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    print("manager all_tasks:", all_tasks)
    return render_template("manager.html", all_tasks=all_tasks)

@app.route("/dashboard")
def dash_board():
    i = 0
    while i < 10:
        sql = text("SELECT * FROM maitasks")
        result = db.session.execute(sql, {})
        all_tasks = result.fetchall()
        return render_template("dashboard.html", all_tasks=all_tasks)

@app.route("/flat/<int:id>", methods=["GET"])
def page(id):
    print("flat page id:", id)
    sql = text("SELECT * FROM maitasks WHERE flat_number=" + str(id))
    result = db.session.execute(sql, {"flat_number":id})
    flat_info = result.fetchone()
    print("flat_info:", flat_info)
    return render_template("flat.html", flat_info=flat_info)

@app.route("/marktaskstarted/<int:id>/<int:emp>", methods=["POST"])
def mark_task_started(id, emp):
    print("emp:", emp)
    repair_status = "Repair started"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    #name = request.form["name"]
    #print("name:", name)
    if emp == 1: return redirect("/matti")
    if emp == 2: return redirect("/pekka")
    if emp == 3: return redirect("/timo")
    return redirect("/manager")

@app.route("/marktaskcompleted/<int:id>/<int:emp>", methods=["POST"])
def mark_task_completed(id, emp):
    repair_status = "Repair completed"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    if emp == 1: return redirect("/matti")
    if emp == 2: return redirect("/pekka")
    if emp == 3: return redirect("/timo")
    return redirect("/manager")

@app.route("/marktaskremoved/<int:id>/<int:emp>", methods=["POST"])
def mark_task_removed(id,emp):
    visible = False
    sql = text("UPDATE maitasks SET visible=:visible WHERE id=:id")
    db.session.execute(sql, {"id":id, "visible":visible})
    db.session.commit()
    if emp == 1: return redirect("/matti")
    if emp == 2: return redirect("/pekka")
    if emp == 3: return redirect("/timo")
    return redirect("/manager")

@app.route("/repairrecommendations")
def repair_recommendations():
    return render_template("repair_recommendations.html")
