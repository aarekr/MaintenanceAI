''' Helper functions '''

import random

def get_weekday(date):
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return str(days[date.weekday()])

def get_formatted_date(datetime_ticket_created):
    date_parts = str(datetime_ticket_created).split(" ")
    date_parts_split = date_parts[0].split("-")
    time_parts = date_parts[1].split(".")
    time_parts_split = time_parts[0].split(":")
    return time_parts_split[0]+":"+time_parts_split[1]+" on "+date_parts_split[2]+"."+date_parts_split[1]+"."

def get_employee_name_with_id(id):
    if id == 1:
        return "Matti"
    elif id == 2:
        return "Pekka"
    elif id == 3:
        return "Timo"
    return "No name"

def get_min_task_emps(all_tasks):
    dict_emp_tasks = {"Matti": 0, "Pekka": 0, "Timo": 0}
    min = 1000
    max = 0
    for task in all_tasks:
        if "Antin" in task[6] or "Kallen" in task[6] or "Lassen" in task[6] or \
            "Mickes" in task[6] or "Petrin" in task[6] or "Uunon" in task[6] or \
            "None" in task[6]:
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
    for name, tasks in dict_emp_tasks.items():
        if tasks == min:
            min_task_emps.append(name)
    return min_task_emps

def allocate_new_task_to_service_company(device_model, COMPANIES):
    brand = device_model.split(" ")[0]
    offers = {}
    for item in COMPANIES:
        if brand in item[1]:
            offers[item[0]] = random.randint(100, 200)
    sorted_offers = sorted(offers.items(), key=lambda x:x[1])
    all_offers_given = []
    all_offers_given.append(offers)
    for item in sorted_offers:
        print("service offer:", item[0], item[1])
    company_and_price = str(sorted_offers[0][0]) + " " + str(sorted_offers[0][1]) + " euro"
    return company_and_price, all_offers_given
