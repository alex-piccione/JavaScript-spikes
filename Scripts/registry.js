// charts
var chart_registry_years = new tauCharts.Chart({
    data: registry.years,
    type: 'bar',
    x: 'year',
    y: 'amount',
    size: null,
    color: 'type', // there will be two lines with different colors on the chart
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        //tauCharts.api.plugins.get('quick-filter')(),
        tauCharts.api.plugins.get('tooltip')()
    ]
});

chart_registry_years.renderTo('#chart_registry_years');

var chart_registry_months = new tauCharts.Chart({
    data: months, //registry.months,
    type: "line",
    x: "period",
    y: "amount",
    color: "type",
    plugins: [
        tauCharts.api.plugins.get('legend')(),
        tauCharts.api.plugins.get('tooltip')()
    ]
});

chart_registry_months.renderTo("#chart_registry_months");