// Years
var chart_registry_years = new tauCharts.Chart({
    data: registry.years.map(function(x) {
        x.Amount = x.amount;
        x.Type = x.type[0].toUpperCase() + x.type.substr(1); // first letter uppercase
        return x;
    }),
    type: 'bar',
    x: 'year',
    y: 'Amount',
    size: null,
    color: 'Type', // there will be two lines with different colors on the chart
    guide: {
        color: {brewer:{Income:"chart-income", Outcome:"chart-outcome", Result:"chart-result"}},
        y: {label: "Income, Outcome and Result"}
    },
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        //tauCharts.api.plugins.get('quick-filter')(),
        tauCharts.api.plugins.get('tooltip')({fields:["Amount:"]})
    ]
});

chart_registry_years.renderTo('#chart_registry_years');

// Months
var chart_registry_months = new tauCharts.Chart({
    data: months, //registry.months,
    type: "bar",
    x: ["Period"],
    y: ["Amount"],
    color: "type",
    colors: {brewer:["chart-income", "chart-outcome"]},
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        tauCharts.api.plugins.get('tooltip')({fields:["Period:", "Amount:", "Year"]})
    ]
});

chart_registry_months.renderTo("#chart_registry_months");

// Results
var chart_registry_results = new tauCharts.Chart({
    data: results,
    type: "line",
    x: "Period",
    y: "Amount",
    color: "type",
    guide: {
        padding:0,
        showGridLines: "y",
        color: {
            brewer: {month:"chart-result", progressive:"chart-progressive"}
        }
    },
    plugins: [
        tauCharts.api.plugins.get('tooltip')({fields:["Period:", "Amount:"]}),
        tauCharts.api.plugins.get('legend')({labels:["Month", "Amount"]}),
    ]
});

chart_registry_results.renderTo("#chart_registry_results");