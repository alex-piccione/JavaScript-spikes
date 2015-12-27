// Years
var chart_registry_years = new tauCharts.Chart({
    data: registry.years,
    type: 'bar',
    x: 'year',
    y: 'amount',
    size: null,
    color: 'type', // there will be two lines with different colors on the chart
    guide: {
        color: {brewer:{income:"chart-income", outcome:"chart-outcome", result:"chart-result"}}
    },
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        //tauCharts.api.plugins.get('quick-filter')(),
        tauCharts.api.plugins.get('tooltip')({fields:["amount"]})
    ]
});

chart_registry_years.renderTo('#chart_registry_years');

// Months
var chart_registry_months = new tauCharts.Chart({
    data: months, //registry.months,
    type: "bar",
    x: "period",
    y: "Amount",
    color: "type",
    colors: {brewer:["chart-income", "chart-outcome"]},
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        tauCharts.api.plugins.get('tooltip')({fields:["Amount"]})
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
        color: {
            brewer: {income: "css-green", outcome:"color-red"}
        }
    },
    plugins: [
        tauCharts.api.plugins.get('tooltip')({fields:["Amount"]}),
        tauCharts.api.plugins.get('legend')( {labels:["Month", "Amount"]}),
    ]
});

chart_registry_results.renderTo("#chart_registry_results");