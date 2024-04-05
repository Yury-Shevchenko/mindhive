export default function TemplateSelector({ handleChange, runCode, sectionId }) {

  const sectionCodeStart = ``;

  // const linePlotCode = `fig = px.line(df, x=X, y=Y, color=Group)`;
  const scatterPlotCode = `

# indicate the name of the column where the participant id is defined
id_col = 'participant' # MH uses 'participant' but you uploaded data may use a different name!

Group=''

# TEXT-BOXES
legend_title='LEGEND'

# CHECK-BOXES
add_trend_line = False

######################################################################################################
######################### Don't you dare change anything below #######################################
######################################################################################################

# Currently takes the name of the parameter given in GUI input
axis_title = {
  X: X if xLabel == "" else xLabel, 
  Y: Y if yLabel == "" else yLabel
}

optional_params = {
  "marginal_x": "rug" if marginalPlot == 'rug' else "box" if marginalPlot=='box' else None,
  "marginal_y": "rug" if marginalPlot == 'rug' else "box" if marginalPlot=='box' else None,
}

import numpy as np
import pandas as pd
import matplotlib.colors as mcolors
import js_workspace as data
data = data.to_py()
df = pd.DataFrame(data)

# convert string to numbers
columns = [X, Y]
df[columns] = df[columns].apply(pd.to_numeric, errors='coerce')

# Convert 'NaN' strings to actual NaN values
df.replace('NaN', np.nan, inplace=True)

# Define custom aggregation function to handle NaN values
def agg_func(x):
    non_nan_values = x.dropna()
    if non_nan_values.empty:
        return np.nan
    else:
        return non_nan_values.iloc[0]
# agg_func = lambda x: x.dropna().iloc[0]

# Group by participant ID and aggregate data
if Group == '':
  grouped_df = df.groupby(id_col).agg({
      X: agg_func,  # Take the first non-NaN x value for each participant
      Y: agg_func   # Take the first non-NaN y value for each participant
  }).reset_index()
else:
  grouped_df = df.groupby(id_col).agg({
      X: agg_func,  # Take the first non-NaN x value for each participant
      Y: agg_func,  # Take the first non-NaN y value for each participant
      Group: agg_func,  # Take the first non-NaN y value for each participant
  }).reset_index()

if Group=='':
  if add_trend_line:
    
    print("dl statsmodels")
    await micropip.install("statsmodels")
    print("finish dl statsmodels")
    print('NOgroup-addtrendline')
    fig = px.scatter(grouped_df, x=X, y=Y, 
                      trendline="ols", 
                      title = graphTitle if graphTitle != '' else f"{X} vs {Y}",
                      labels=axis_title, 
                      template="seaborn",
                      **{k: v for k, v in optional_params.items() if v})
    fig.update_layout(showlegend=False)


  else:
    print('NOgroup-NOTaddtrendline')
    fig = px.scatter(grouped_df, x=X, y=Y,
                      title=graphTitle if graphTitle != '' else f"{X} vs {Y}",
                      labels=axis_title, 
                      template="seaborn",
                      **{k: v for k, v in optional_params.items() if v})
    fig.update_layout(showlegend=False)
else:
  if add_trend_line:
    print('group-addtrendline')

    print("dl statsmodels")
    await micropip.install("statsmodels")
    print("finish dl statsmodels")
    
    fig = px.scatter(grouped_df, x=X, y=Y, 
                      trendline="ols", 
                      title=graphTitle if graphTitle != '' else f"{X} vs {Y}",
                      color=Group,
                      labels=axis_title, 
                      template="seaborn",
                      **{k: v for k, v in optional_params.items() if v})
    fig.update_layout(showlegend=False)
    # for trace in fig.data:
    #   trace.showlegend = False
  else:
    print('group-NOTaddtrendline')
    fig = px.scatter(grouped_df, x=X, y=Y, 
                      color=Group, 
                      title=graphTitle if graphTitle != '' else f"{X} vs {Y}",
                      labels=axis_title, 
                      template="seaborn",
                      **{k: v for k, v in optional_params.items() if v})
    # fig.update_layout(showlegend=False)  
  `;
  const histogramCode = `
#~ OPTIONS ~#
# float input
bargap = 0.1
#nbins = ""

######################################################################################################
######################### Don't you dare change anything below #######################################
######################################################################################################

optional_params = {
  "marginal": "rug" if marginalPlot == 'rug' else "box" if marginalPlot=='box' else None,
}

import numpy as np
import pandas as pd
import matplotlib.colors as mcolors
import js_workspace as data

data = data.to_py()
df = pd.DataFrame(data)

df[X] = df[X].apply(pd.to_numeric, errors='coerce')

fig = px.histogram(df, x=X, 
                    #nbins=nbins, 
                    **{k: v for k, v in optional_params.items() if v})

fig.update_layout(title=graphTitle if graphTitle != '' else f"Histogram of {X}",
                  bargap=bargap,
                  xaxis_title_text=xLabel if xLabel != '' else X,
                  yaxis_title_text=yLabel if yLabel != '' else "Count"
                  )

`;
  const barGraphCode = `
#Example 1 (2 cols)
#columns = ['GT_gamble_percentage_mixed', 'GT_gamble_percentage_lose']
#labels = ['Mixed-condition', 'Lose-condition']

#Example 2 (3 cols)
columns = ['GT_gamble_percentage_mixed', 'GT_gamble_percentage_lose', 'GT_gamble_percentage_gain']
labels = ['Mixed', 'Lose', 'Gain']

legend_title='Condition'

#Choose a base color for your graph
base_color = 'pink'

######################################################################################################
######################### Don't you dare change anything below #######################################
######################################################################################################

title= graphTitle if graphTitle != "" else f"Barplot of {columns}"

import js_workspace as data
data = data.to_py()
df = pd.DataFrame(data)
  
import numpy as np
import pandas as pd
import matplotlib.colors as mcolors

df[columns] = df[columns].apply(pd.to_numeric, errors='coerce')

# Calculate mean, standard deviation, and confidence intervals for each column
statistics = {}

for column in columns:
    mean = np.mean(df[column])
    std = np.std(df[column])
    n = df[column].shape[0]
    conf_interval = 1.96 * np.sqrt(std**2 / n)  # 95% confidence interval
    statistics[column] = {'mean': mean, 'std': std, 'conf_interval': conf_interval}

# Extract the required statistics for plotting
average_percentages = [statistics[column]['mean'] for column in columns]
error_bars = [statistics[column]['conf_interval'] for column in columns]

def generate_complementary_colors(base_color, n):
    base_rgb = mcolors.to_rgb(base_color)
    complementary_rgb = mcolors.rgb_to_hsv(base_rgb)
    complementary_rgb[0] = (complementary_rgb[0] + 0.5) % 1  # Shift hue by 180 degrees (complementary color)
    
    # Generate n harmonious colors
    harmonious_colors = []
    for _ in range(n):
        complementary_rgb[0] = (complementary_rgb[0] + 0.2) % 1  # Shift hue by 72 degrees (for example)
        harmonious_colors.append(mcolors.to_hex(mcolors.hsv_to_rgb(complementary_rgb)))
    
    return harmonious_colors
  
n = len(columns)  # Number of harmonious colors to generate
colors = generate_complementary_colors(base_color, n)

#['blue', 'orange', 'green']

df_bar = pd.DataFrame({
    'Categories': labels,
    'Y': average_percentages,
    'Error Bars': error_bars
})

fig = px.bar(df_bar, 
              x='Categories', 
              y='Y', 
              color='Categories',
              error_y='Error Bars', 
              color_discrete_sequence=colors,
              labels={'Categories': xLabel if xLabel != "" else "Categories",
                      'Y': yLabel if yLabel != "" else 'Average value'
                      })
fig.update_layout(
    title=title,
    legend_title=legend_title
)`;

  const sectionCodeEnd = `  
fig_html = fig.to_html()
js.render_html(plot_output, fig_html)`;


  const templates = {
    // linePlot: sectionCodeStart + "\n" + linePlotCode + "\n" + sectionCodeEnd,
    scatterPlot:
      sectionCodeStart + "\n" + scatterPlotCode + "\n" + sectionCodeEnd,
    histogram: sectionCodeStart + "\n" + histogramCode + "\n" + sectionCodeEnd,
    barGraph: sectionCodeStart + "\n" + barGraphCode + "\n" + sectionCodeEnd,
  };

  const selectGraphType = ({ type, title }) => {
    const code = templates[type];
    handleChange({ name: "code", content: code });
    runCode({ code });
  };

  return (
    <div className="templates">
      <div
        className="template"
        onClick={() =>
          selectGraphType({ type: "scatterPlot", title: "Scatter Plot" })
        }
      >
        <div>
          <img src={`/assets/icons/visualize/scatterPlot.svg`} />
        </div>
        <div className="text">
          <div className="title">Scatter Plot</div>
          <div className="description">Shows variables relationship</div>
        </div>
      </div>
      <div
        className="template"
        onClick={() =>
          selectGraphType({ type: "histogram", title: "Histogram" })
        }
      >
        <div>
          <img src={`/assets/icons/visualize/histogram.svg`} />
        </div>
        <div className="text">
          <div className="title">Histogram</div>
          <div className="description">Compare distributions</div>
        </div>
      </div>
      <div
        className="template"
        onClick={() =>
          selectGraphType({ type: "barGraph", title: "Bar Graph" })
        }
      >
        <div>
          <img src={`/assets/icons/visualize/barGraph.svg`} />
        </div>
        <div className="text">
          <div className="title">Bar graph</div>
          <div className="description">Compare quantities</div>
        </div>
      </div>
      {/* <div
        className="template"
        onClick={() =>
          selectGraphType({ type: "linePlot", title: "Line Plot" })
        }
      >
        <div>
          <img src={`/assets/icons/visualize/linePlot.svg`} />
        </div>
        <div className="text">
          <div className="title">Line Plot</div>
          <div className="description">Observe a variable across time</div>
        </div>
      </div> */}
    </div>
  );
}

// const defaultCode = `import matplotlib
// import matplotlib.pyplot as plt
// import pandas as pd
// import micropip

// # install plotly from pypi
// await micropip.install('plotly==5.0.0')

// import js_workspace as data
// data = data.to_py()

// df = pd.DataFrame(data)

// # clean the canvas
// plt.clf()

// X = document.getElementById("X-variable").value
// Y = document.getElementById("Y-variable").value
// Group = document.getElementById("Group-variable").value

// # create a scatter plot
// plt.scatter(df[X], df[Y])

// # customize the graph
// plt.title('Sample Line Graph')
// plt.xlabel('X-axis Label')
// plt.ylabel('Y-axis Label')
// plt.legend()
// plt.grid(True)

// plt.show()`;
