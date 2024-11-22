import numpy as np
import pandas as pd
import random

def main():
    print("starting estimation")
    features = ["device_age",             # device age in years
                "number_of_residents",    # number of residents in a flat
                "number_of_children",     # number of children in a flat
                "breakdown_probability"]  # device breakdown probability
    data = []
    for i in range(10):
        device_age = random.randint(1,10)
        number_of_residents = random.choice([1,2,3,4,5])
        number_of_children = number_of_residents - 2
        if number_of_children < 0:
            number_of_children = 0
        breakdown_probability = 100*(0.02*device_age + 0.02*number_of_residents + 0.02*number_of_children)
        row = [device_age,
               number_of_residents,
               number_of_children,
               int(breakdown_probability)]
        data.append(row)
    print("data in the end:")
    for item in data:
        print(item)

if __name__ == "__main__":
    main()
