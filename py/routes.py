import sys
import random
from datetime import datetime, timedelta

from flask import render_template, redirect, request
from sqlalchemy.sql import text

from app import app
from db import db

import functions as f

DEVICES = ["Dishwasher", "Microwave", "Oven", "Stove", "Washing machine"]
DEVICE_MODELS = ["Bosch astianpesukone SMU2HVW71S",
                 "Kenwood mikroaaltouuni K30CSS21E",
                 "Electrolux uuni BOC001EW",
                 "Hisense liesi HCC8615WG",
                 "AEG pyykinpesukone LR734EX4E"]
ERROR_CODES = [101, 102, 103, 104, 105]
EMPLOYEES = ["Matti", "Pekka", "Timo"]
REPAIR_FLOW = ["",
               "Unplug the power cable from the socket and plug it in again.",
               "Does the device function now?",
               "Does it show any error codes?",
               "Which of these error codes?",
               "",
               "",
               "Double check that the power cable is OK."]
COMPANIES = [["Antin aparaatit Ay", "Bosch,Kenwood"],
             ["Kallen koneet Ky", "Electrolux,Hisense"],
             ["Lassen liesipalvelu LLC", "Hisense"],
             ["Mickes maskiner AB", "Bosch,AEG"],
             ["Petrin pesukoneet Oy", "Bosch,AEG"],
             ["Uunon uunit Oy", "Electrolux,Kenwood"]]

all_offers_given = []

@app.route("/")
def index():
    return redirect("/simulator")

@app.route("/simulator")
def simulator():
    return render_template("simulator.html")

def render_manager_page(all_tasks):
    return render_template("manager.html", all_tasks=all_tasks)

automated_tasks = []

@app.route("/semi-automatic")
def start_automatic_simulator():
    flat_number = random.randint(1, 1000)
    random_index = random.choice([0, 1, 2, 3, 4])
    device = DEVICES[random_index]
    device_model = DEVICE_MODELS[random_index]
    error_code = random.choice([101, 102, 103, 104, 105])
    repair_status = "NA"
    repair_measure = "NA"
    row_color = ""
    employee = ""
    if error_code == 101:
        employee = f.allocate_new_task_to_service_company(device_model, COMPANIES)
        row_color = "table_danger"
    elif error_code == 102 or error_code == 103:
        employee = random.choice(["Matti", "Pekka", "Timo"])
        row_color = "table_warning"
    elif error_code == 104 or error_code == 105:
        employee = random.choice(["Matti", "Pekka", "Timo"])
        row_color = "table_secondary"
    datetime_ticket_created = datetime.now()
    time_ticket_created = f.get_formatted_date(datetime_ticket_created)
    time_eta = f.get_formatted_date(datetime_ticket_created + timedelta(days=2))
    resident_message = "..."
    visible = True
    automated_tasks.append([0, flat_number, device, device_model, error_code, repair_status, \
                            repair_measure, employee, time_ticket_created, time_eta, \
                            resident_message, visible, None, row_color])
    print("automatic all_tasks:", automated_tasks)
    automatic_simulator_started = True
    #start_row_adder()
    return render_template("semi-automatic.html", automated_tasks=automated_tasks[-7:-1])

def allocate_new_task_to_employee():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    min_task_emps = f.get_min_task_emps(all_tasks)
    chosen_emp = random.choice(min_task_emps)
    return chosen_emp

def redistribute_tasks_between_employees():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    dict_emp_tasks = {"Matti": 0, "Pekka": 0, "Timo": 0}
    min = 1000
    max = 0
    for task in all_tasks:
        if "Antin" in task[6] or "Kallen" in task[6] or "Lassen" in task[6] or \
            "Mickes" in task[6] or "Petrin" in task[6] or "Uunon" in task[6] or "None" in task[6]:
            pass
        else:
            if task[10] != False:
                dict_emp_tasks[task[6]] += 1
    for key, value in dict_emp_tasks.items():
        if value > max:
            max = value
        if value < min:
            min = value
    min_task_emps = []
    max_task_emps = []
    for name, tasks in dict_emp_tasks.items():
        if tasks == min:
            min_task_emps.append(name)
        if tasks == max:
            max_task_emps.append(name)
    chosen_min_emp = str(random.choice(min_task_emps))
    chosen_max_emp = random.choice(max_task_emps)
    if max - min > 1:
        max_id = 0
        for item in all_tasks:
            if item[10] == True:
                if item[6] == chosen_max_emp:
                    max_id = item[0]
        sql_text = "UPDATE maitasks SET employee='" + chosen_min_emp + "' WHERE id=" + str(max_id)
        sql = text(sql_text)
        db.session.execute(sql, {"id":max_id, "employee":chosen_min_emp})
        db.session.commit()

@app.route("/offers")
def show_offers():
    return render_template("offers.html", all_offers_given=all_offers_given)

@app.route("/createurgentcase", methods=["POST"])
def create_urgent_case():
    flat_number = random.randint(1, 1000)
    random_index = random.choice([0, 1, 2, 3, 4])
    device = DEVICES[random_index]
    device_model = DEVICE_MODELS[random_index]
    error_code = 101
    repair_status = "NA"
    repair_measure = "NA"
    employee, all_offers = f.allocate_new_task_to_service_company(device_model, COMPANIES)
    print("all_offers:", all_offers)
    for offer in all_offers:
        print("---> offer:", offer)
        all_offers_given.append(offer)
    datetime_ticket_created = datetime.now()
    time_ticket_created = f.get_formatted_date(datetime_ticket_created)
    time_eta = f.get_formatted_date(datetime_ticket_created + timedelta(days=2))
    resident_message = "..."
    visible = True
    sql = text("INSERT INTO maitasks (flat_number, device, device_model, error_code, \
               repair_status, repair_measure, employee, time_ticket_created, time_eta, \
               resident_message, visible) VALUES \
               (:flat_number, :device, :device_model, :error_code, :repair_status, \
               :repair_measure, :employee, :time_ticket_created, :time_eta, :resident_message, \
               :visible)")
    db.session.execute(sql, {"flat_number":flat_number, "device":device, \
                             "device_model":device_model, "error_code":error_code, \
                             "repair_status":repair_status, "repair_measure":repair_measure, \
                                "employee":employee, "time_ticket_created":time_ticket_created, \
                                "time_eta":time_eta, "resident_message":resident_message, \
                                "visible":visible})
    db.session.commit()
    return redirect("/simulator")

@app.route("/createmaintenancecase", methods=["POST"])
def create_maintenance_case():
    flat_number = random.randint(1, 1000)
    random_index = random.choice([0, 1, 2, 3, 4])
    device = DEVICES[random_index]
    device_model = DEVICE_MODELS[random_index]
    error_code = random.choice([102, 103])
    repair_status = "NA"
    repair_measure = "NA"
    employee = allocate_new_task_to_employee()
    datetime_ticket_created = datetime.now()
    time_ticket_created = f.get_formatted_date(datetime_ticket_created)
    time_eta = f.get_formatted_date(datetime_ticket_created + timedelta(days=10))
    resident_message = "..."
    visible = True
    sql = text("INSERT INTO maitasks (flat_number, device, device_model, error_code, \
               repair_status, repair_measure, employee, time_ticket_created, time_eta, \
               resident_message, visible) VALUES \
               (:flat_number, :device, :device_model, :error_code, :repair_status, \
               :repair_measure, :employee, :time_ticket_created, :time_eta, :resident_message, \
               :visible)")
    db.session.execute(sql, {"flat_number":flat_number, "device":device, \
                             "device_model":device_model, "error_code":error_code, \
                             "repair_status":repair_status, "repair_measure":repair_measure, \
                                "employee":employee, "time_ticket_created":time_ticket_created, \
                                "time_eta":time_eta, "resident_message":resident_message, \
                                "visible":visible})
    db.session.commit()
    return redirect("/simulator")

@app.route("/createcheckupcase", methods=["POST"])
def create_checkup_case():
    flat_number = random.randint(1, 1000)
    random_index = random.choice([0, 1, 2, 3, 4])
    device = DEVICES[random_index]
    device_model = DEVICE_MODELS[random_index]
    error_code = random.choice([104, 105])
    repair_status = "NA"
    repair_measure = "NA"
    employee = allocate_new_task_to_employee()
    datetime_ticket_created = datetime.now()
    time_ticket_created = f.get_formatted_date(datetime_ticket_created)
    time_eta = f.get_formatted_date(datetime_ticket_created + timedelta(days=30))
    resident_message = "..."
    visible = True
    sql = text("INSERT INTO maitasks (flat_number, device, device_model, error_code, \
               repair_status, repair_measure, employee, time_ticket_created, time_eta, \
               resident_message, visible) VALUES \
               (:flat_number, :device, :device_model, :error_code, :repair_status, \
               :repair_measure, :employee, :time_ticket_created, :time_eta, :resident_message, \
               :visible)")
    db.session.execute(sql, {"flat_number":flat_number, "device":device, \
                             "device_model":device_model, "error_code":error_code, \
                             "repair_status":repair_status, "repair_measure":repair_measure, \
                                "employee":employee, "time_ticket_created":time_ticket_created, \
                                "time_eta":time_eta, "resident_message":resident_message, \
                                "visible":visible})
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
    return render_template("matti.html", mattis_tasks=mattis_tasks,
                           three_dates_list=three_dates_list,
                           suggested_visit_times=suggested_visit_times)

@app.route("/pekka")
def pekka():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    pekkas_tasks = []
    for item in all_tasks:
        if item[6] == 'Pekka' and item[10] == True:
            pekkas_tasks.append(item)
    return render_template("pekka.html", pekkas_tasks=pekkas_tasks,
                           three_dates_list=three_dates_list,
                           suggested_visit_times=suggested_visit_times)

@app.route("/timo")
def timo():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    timos_tasks = []
    for item in all_tasks:
        if item[6] == 'Timo' and item[10] == True:
            timos_tasks.append(item)
    return render_template("timo.html", timos_tasks=timos_tasks,
                           three_dates_list=three_dates_list,
                           suggested_visit_times=suggested_visit_times)

@app.route("/manager")
def manager():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    # table structure: [maintenance, check, total_to-do, not_started, started, completed]
    tasks_per_employee = {"Matti": [0,0,0,0,0,0], "Pekka": [0,0,0,0,0,0], "Timo": [0,0,0,0,0,0]}
    # table structure: [urgent, maintenance, check, not_started, started, fix, replace, completed]
    tasks_per_device = {"Dishwasher": [0,0,0,0,0,0,0,0], "Microwave": [0,0,0,0,0,0,0,0],
                        "Oven": [0,0,0,0,0,0,0,0], "Stove": [0,0,0,0,0,0,0,0],
                        "Washing machine": [0,0,0,0,0,0,0,0]}
    for item in all_tasks:
        #print("item:", item)
        # repair status
        if item[4] == "Repair completed":
            if item[3] != 101:
                tasks_per_employee[item[6]][5] += 1
            tasks_per_device[item[2]][7] += 1
            continue
        if item[3] != 101:
            if item[4] == "NA":
                tasks_per_employee[item[6]][3] += 1
            elif item[4] == "Repair started":
                tasks_per_employee[item[6]][4] += 1
        # case type
        if item[3] == 102 or item[3] == 103:     # maintenance cases
            tasks_per_employee[item[6]][0] += 1
            tasks_per_employee[item[6]][2] += 1
        elif item[3] == 104 or item[3] == 105:   # check up cases
            tasks_per_employee[item[6]][1] += 1
            tasks_per_employee[item[6]][2] += 1
        # devices
        if item[3] == 101:
            tasks_per_device[item[2]][0] += 1
        elif item[3] == 102 or item[3] == 103:
            tasks_per_device[item[2]][1] += 1
        elif item[3] == 104 or item[3] == 105:
            tasks_per_device[item[2]][2] += 1
        if item[4] == "NA":
            tasks_per_device[item[2]][3] += 1
        elif item[4] == "Repair started":
            tasks_per_device[item[2]][4] += 1
        if item[5] == "Fix in flat":
            tasks_per_device[item[2]][5] += 1
        elif item[5] == "Replace":
            tasks_per_device[item[2]][6] += 1
    return render_template("manager.html", all_tasks=all_tasks,
                           tasks_per_employee=tasks_per_employee,
                           tasks_per_device=tasks_per_device)

@app.route("/dashboard")
def dash_board():
    sql = text("SELECT * FROM maitasks")
    result = db.session.execute(sql, {})
    all_tasks = result.fetchall()
    return render_template("dashboard.html", all_tasks=all_tasks[-10:])

@app.route("/flat/<int:id>", methods=["GET"])
def page(id):
    print("flat page id:", id)
    sql = text("SELECT * FROM maitasks WHERE flat_number=" + str(id))
    result = db.session.execute(sql, {"flat_number":id})
    flat_info = result.fetchone()
    print("flat_info:", flat_info)
    return render_template("flat.html", flat_info=flat_info,
                           suggested_visit_times=suggested_visit_times)

def get_suggested_service_dates():
    date_1 = datetime.now() + timedelta(days=1)
    date_1 = str(date_1.hour)+":00 "+f.get_weekday(date_1)+" "+str(date_1.day)+"."+str(date_1.month)+"."
    date_2 = datetime.now() + timedelta(days=1, hours=2)
    date_2 = str(date_2.hour)+":00 "+f.get_weekday(date_2)+" "+str(date_2.day)+"."+str(date_2.month)+"."
    date_3 = datetime.now() + timedelta(days=1, hours=5)
    date_3 = str(date_3.hour)+":00 "+f.get_weekday(date_3)+" "+str(date_3.day)+"."+str(date_3.month)+"."
    three_dates_list.append("Not chosen")
    three_dates_list.append(date_1)
    three_dates_list.append(date_2)
    three_dates_list.append(date_3)
    return three_dates_list
suggested_visit_times = {}
three_dates_list = []

@app.route("/markvisit/<int:id>/<int:flat>/<int:emp>", methods=["POST"])
def mark_visit(id, flat, emp):
    repair_measure = "Visit"
    sql = text("UPDATE maitasks SET repair_measure=:repair_measure WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_measure":repair_measure})
    db.session.commit()
    threeDatesList = get_suggested_service_dates()
    print("threeDatesList:", threeDatesList)
    suggested_visit_times[(flat, f.get_employee_name_with_id(emp))] = [0, threeDatesList]
    if emp == 1:
        return redirect("/matti")
    if emp == 2:
        return redirect("/pekka")
    if emp == 3:
        return redirect("/timo")
    return redirect("/manager")

@app.route("/flat/chooseservicetime/<int:id>/<int:flat>/<int:time>")
def save_visit_time(id, flat, time):
    time_visit = three_dates_list[time]
    print("flat:", flat, "time_visit:", time_visit)
    sql = text("UPDATE maitasks SET time_visit=:time_visit WHERE id=:id")
    db.session.execute(sql, {"id":id, "time_visit":time_visit})
    db.session.commit()
    suggested_visit_times.clear()
    three_dates_list.clear()
    address = "/flat/" + str(flat)
    return redirect(address)

@app.route("/marktaskstarted/<int:id>/<int:emp>", methods=["POST"])
def mark_task_started(id, emp):
    repair_status = "Repair started"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    if emp == 1:
        return redirect("/matti")
    if emp == 2:
        return redirect("/pekka")
    if emp == 3:
        return redirect("/timo")
    return redirect("/manager")

@app.route("/markmeasure/<int:id>/<int:emp>", methods=["POST"])
def mark_measure(id, emp):
    measure = request.form["measure"]
    repair_measure = ""
    if measure == str(1):
        repair_measure = "Fix in flat"
    elif measure == str(2):
        repair_measure = "Replace"
    sql = text("UPDATE maitasks SET repair_measure=:repair_measure WHERE id=" + str(id))
    db.session.execute(sql, {"id:":id, "repair_measure":repair_measure})
    db.session.commit()
    if emp == 1:
        return redirect("/matti")
    if emp == 2:
        return redirect("/pekka")
    if emp == 3:
        return redirect("/timo")
    return redirect("/manager")

@app.route("/marktaskcompleted/<int:id>/<int:emp>", methods=["POST"])
def mark_task_completed(id, emp):
    repair_status = "Repair completed"
    sql = text("UPDATE maitasks SET repair_status=:repair_status WHERE id=:id")
    db.session.execute(sql, {"id":id, "repair_status":repair_status})
    db.session.commit()
    if emp == 1:
        return redirect("/matti")
    if emp == 2:
        return redirect("/pekka")
    if emp == 3:
        return redirect("/timo")
    return redirect("/manager")

@app.route("/marktaskremoved/<int:id>/<int:emp>", methods=["POST"])
def mark_task_removed(id, emp):
    visible = False
    sql = text("UPDATE maitasks SET visible=:visible WHERE id=:id")
    db.session.execute(sql, {"id":id, "visible":visible})
    db.session.commit()
    redistribute_tasks_between_employees()
    if emp == 1:
        return redirect("/matti")
    if emp == 2:
        return redirect("/pekka")
    if emp == 3:
        return redirect("/timo")
    return redirect("/manager")

#  99 device OK      -> redirect to employee
# 100 replace device -> ask for offers

@app.route("/repairrecommendations/<int:flat>/<int:answer>/<int:e_error>", methods=["GET", "POST"])
def repair_recommendations(flat, answer, e_error):
    print("repair recommendations flat:", flat, "answer:", answer)
    sql = text("SELECT * FROM maitasks WHERE flat_number=" + str(flat))
    result = db.session.execute(sql, {"flat_number":flat})
    flat_info = result.fetchone()
    DEVICE_E_ERROR_CODE = "E:" + str(e_error)
    print("E_ERROR:", DEVICE_E_ERROR_CODE)
    if answer == 99:  # device functions, return to employee page
        print("answer 99")
        print("flat_info:", flat_info[6].lower())
        mark_task_completed(flat_info[0], 1)
        address = "/" + str(flat_info[6].lower())
        answer = 0
        return redirect(address)
    return render_template("repair_recommendations.html", flat_info=flat_info,
                           repair_flow=REPAIR_FLOW, repair_flow_index=answer,
                           device_e_error_code=DEVICE_E_ERROR_CODE)
