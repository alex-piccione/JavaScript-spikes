// charts
var chart_registry_years = new tauCharts.Chart({
    data: registry.years,
    type: 'line',
    x: 'year',
    y: 'amount',
    color: 'type' // there will be two lines with different colors on the chart
});

chart_registry_years.renderTo('#chart_registry_years');
