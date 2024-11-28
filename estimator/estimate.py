from sklearn.linear_model import LinearRegression
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

def ml_linear_regression():
    TRAIN_SET_COUNT = 100
    TRAIN_INPUT = list()
    TRAIN_OUTPUT = list()
    for i in range(TRAIN_SET_COUNT):
        device_age = 2 * random.randint(1,10)
        number_of_residents = 2 * random.choice([1,2,3,4,5])
        number_of_children = 2 * (number_of_residents - 2)
        if number_of_children < 0:
            number_of_children = 0
        breakdown_probability = 100*(0.02*device_age + 0.02*number_of_residents + 0.02*number_of_children)
        TRAIN_INPUT.append([device_age, number_of_residents, number_of_children])
        TRAIN_OUTPUT.append(breakdown_probability)
    predictor = LinearRegression(n_jobs=-1)
    predictor.fit(X=TRAIN_INPUT, y=TRAIN_OUTPUT)

    #X_TEST = [[10, 5, 3]]  # should be 36
    #outcome = predictor.predict(X=X_TEST)
    #coefficients = predictor.coef_
    #print('Outcome : {}\nCoefficients : {}'.format(outcome, coefficients))

    test_data = [
        [[2, 4, 2]],
        [[8, 5, 3]],
        [[3, 5, 3]],
        [[5, 1, 0]],
        [[9, 4, 2]]
    ]
    right_results = [16, 32, 22, 12, 30]
    for i in range(5):
        outcome = predictor.predict(X=test_data[i])
        #coefficients = predictor.coef_
        print("Outcome:", f"{outcome[0]:.0f}   difference:", f"{(right_results[i] - outcome[0]):.4f}")

if __name__ == "__main__":
    #main()
    ml_linear_regression()
