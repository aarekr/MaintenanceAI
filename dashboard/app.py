from dash import Dash, html, dcc
import plotly.express as px
import pandas as pd

app = Dash()

df = pd.DataFrame({
    "Category": ["Device age", "Residents", "Children"],
    "Amount": [4, 1, 2],
    "City": ["Helsinki", "Helsinki", "Helsinki"]
})

fig = px.bar(df, x="Category", y="Amount", color="City", barmode="group")

app.layout = html.Div(children=[
    html.H1(children='Dash Board'),
    html.Div(children='''Breakdowns per category'''),
    dcc.Graph(
        id='example-graph',
        figure=fig
    )
])

if __name__ == '__main__':
    app.run(debug=True)
