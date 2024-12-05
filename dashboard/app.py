from dash import Dash, html, dcc
import plotly.express as px
import pandas as pd

app = Dash()

data = []
probabilities_1_resident = []
probabilities_2_residents = []
probabilities_3_residents = []
probabilities_4_residents = []
probabilities_5_residents = []
multiplier = 1

for i in range(1,11):
    data.append(i)
    multiplier *= 1.05
    probabilities_1_resident.append(100*(0.02*i*multiplier + 0.02*1 + 0.02*0))
    probabilities_2_residents.append(100*(0.02*i*multiplier + 0.02*2*multiplier + 0.02*0))
    probabilities_3_residents.append(100*(0.02*i*multiplier + 0.02*2*multiplier + 0.02*1*multiplier))
    probabilities_4_residents.append(100*(0.02*i*multiplier + 0.02*2*multiplier + 0.02*2*multiplier))
    probabilities_5_residents.append(100*(0.02*i*multiplier + 0.02*2*multiplier + 0.02*3 * multiplier))

df_1_resident = pd.DataFrame({ "Age": data, "Probability": probabilities_1_resident })
df_2_residents = pd.DataFrame({ "Age": data, "Probability": probabilities_2_residents })
df_3_residents = pd.DataFrame({ "Age": data, "Probability": probabilities_3_residents })
df_4_residents = pd.DataFrame({ "Age": data, "Probability": probabilities_4_residents })
df_5_residents = pd.DataFrame({ "Age": data, "Probability": probabilities_5_residents })

fig_1_resident = px.bar(df_1_resident, x="Age", y="Probability", barmode="group")
fig_2_residents = px.bar(df_2_residents, x="Age", y="Probability", barmode="group")
fig_3_residents = px.bar(df_3_residents, x="Age", y="Probability", barmode="group")
fig_4_residents = px.bar(df_4_residents, x="Age", y="Probability", barmode="group")
fig_5_residents = px.bar(df_5_residents, x="Age", y="Probability", barmode="group")

app.layout = html.Div(children=[
    html.H1(children='Dash Board'),
    html.Div(children='''Breakdown probabilities per device age and number of residents'''),
    dcc.Graph(id='example-graph-1', figure=fig_1_resident),
    dcc.Graph(id='example-graph-2', figure=fig_2_residents),
    dcc.Graph(id='example-graph-3', figure=fig_3_residents),
    dcc.Graph(id='example-graph-4', figure=fig_4_residents),
    dcc.Graph(id='example-graph-5', figure=fig_5_residents),
    dcc.Dropdown(id="dropdown", multi=True,
                 options=[{"label": "1 resident", "value": "1 resident"},
                          {"label": "2 residents", "value": "2 residents"},
                          {"label": "3 residents", "value": "3 residents"},
                          {"label": "4 residents", "value": "4 residents"},
                          {"label": "5 residents", "value": "5 residents"}])
])

if __name__ == '__main__':
    app.run(debug=True)
