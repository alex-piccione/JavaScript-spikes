tauCharts || tauCharts;

// data
var datasource_1 = [{
  type:'us', count:20, date:'12-2013'
},{
  type:'us', count:10, date:'01-2014'
},{
  type:'bug', count:15, date:'02-2014'
},{
  type:'bug', count:23, date:'05-2014'
}];


var datasource_2 = [
    {"team": "A", "cycleTime": 1, "effort": 1, "count": 1, "priority": "low"},
    {"team": "B", "cycleTime": 2, "effort": 2, "count": 3, "priority": "medium"},
    {"team": "B", "cycleTime": 3, "effort": 4, "count": 2, "priority": "low"},
    {"team": "C", "cycleTime": 3, "effort": 6, "count": 8, "priority": "medium"},
    {"team": "D", "cycleTime": 2, "effort": 4, "count": 4, "priority": "low"},
    {"team": "D", "cycleTime": 3, "effort": 3, "count": 2, "priority": "low"}
];

// charts
var chart_1 = new tauCharts.Chart({
    data: datasource_1,
    type: 'line',
    x: 'date',
    y: 'count',
    color: 'type' // there will be two lines with different colors on the chart
});

chart_1.renderTo('#chart_1');

var chart_2 = new tauCharts.Chart({
    guide: {
        x: {label: "Cycle Time in days"},   // custom label for X axis
        y: {label: "Effort in points"},     // custom label for Y axis
        padding: {b:40, l:40, t:10, r:10 }, // chart paddin
        colors: {                           // colors
            brewer: ["color-red", "color-green", "color-blu"] 
        }
    },
    data: datasource_2,
    type: "scatterplot",
    x: "cycleTime",
    y: "effort",
    color: "team", // evry team will be represented by diferent color
    size: "count"
});

chart_2.renderTo("#chart_2");