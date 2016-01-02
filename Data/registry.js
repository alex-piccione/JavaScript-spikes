var registry = {
    years: [
        {year: "2013", type:"income", amount:29237.07000},
        {year: "2013", type:"outcome", amount:25107.39000},
        {year: "2013", type:"result", amount:4129.68000},        
        {year: "2014", type:"income", amount:23496.74000},
        {year: "2014", type:"outcome", amount:15169.08000},
        {year: "2014", type:"result", amount:8327.66000},
        {year: "2015", type:"income", amount:22817.00000},
        {year: "2015", type:"outcome", amount:21087.78000},
        {year: "2015", type:"result", amount:1729.22000} 
    ],
    months: [
        {year:2013, month:1, period:"2013 Jan", income:1514.45000, outcome:303.50000, result:0},
        {year:2013, month:2, period:"2013 Feb", income:1277.00000, outcome:901.76000, result:0},
        {year:2013, month:3, period:"2013 Mar", income:1388.00000, outcome:423.39000, result:0},
        {year:2013, month:4, period:"2013 Apr", income:1267.14000, outcome:1958.47000, esult:0},
        {year:2013, month:5, period:"2013 May", income:1298.01000, outcome:1849.35000, result:0},
        {year:2013, month:6, period:"2013 Jun", income:1254.00000, outcome:794.63000, result:0},
        {year:2013, month:7, period:"2013 Jul", income:3442.49000, outcome:1933.43000, result:0},
        {year:2013, month:8, period:"2013 Aug", income:9369.19000, outcome:700.30000, result:0},
        {year:2013, month:9, period:"2013 Sep", income:1962.79000, outcome:1660.38000},
        {year:2013, month:10, period:"2013 Oct", income:1846.00000, outcome:2292.29000},
        {year:2013, month:11, period:"2013 Nov", income:1849.00000, outcome:2721.36000},
        {year:2013, month:12, period:"2013 Dec", income:2769.00000, outcome:9568.53000},
        {year:2014, month:1, period:"2014 Jan", income:2510.29000, outcome:1103.93000},
        {year:2014, month:2, period:"2014 Feb", income:1776.00000, outcome:1609.02000},
        {year:2014, month:3, period:"2014 Mar", income:1825.00000, outcome:841.65000},
        {year:2014, month:4, period:"2014 Apr", income:1968.00000, outcome:947.51000},
        {year:2014, month:5, period:"2014 May", income:1765.00000, outcome:1364.58000},
        {year:2014, month:6, period:"2014 Jun", income:1788.00000, outcome:1376.99000},
        {year:2014, month:7, period:"2014 Jul", income:1765.00000, outcome:1367.49000},
        {year:2014, month:8, period:"2014 Aug", income:1604.00000, outcome:1047.30000},
        {year:2014, month:9, period:"2014 Sep", income:1604.00000, outcome:1076.26000},
        {year:2014, month:10, period:"2014 Oct", income:1635.00000, outcome:1281.73000},
        {year:2014, month:11, period:"2014 Nov", income:1584.00000, outcome:2018.20000},
        {year:2014, month:12, period:"2014 Dec", income:3672.45000, outcome:1134.42000},
        {year:2015, month:1, period:"2015 Jan", income:1622.00000, outcome:1433.10000},
        {year:2015, month:2, period:"2015 Feb", income:2259.00000, outcome:649.24000},
        {year:2015, month:3, period:"2015 Mar", income:1723.00000, outcome:1893.75000},
        {year:2015, month:4, period:"2015 Apr", income:1808.00000, outcome:4712.14000},
        {year:2015, month:5, period:"2015 May", income:1728.00000, outcome:1979.73000},
        {year:2015, month:6, period:"2015 Jun", income:1751.00000, outcome:1578.65000},
        {year:2015, month:7, period:"2015 Jul", income:1688.00000, outcome:1880.08000},
        {year:2015, month:8, period:"2015 Aug", income:1630.00000, outcome:1049.69000},
        {year:2015, month:9, period:"2015 Sep", income:1729.00000, outcome:1356.48000},
        {year:2015, month:10, period:"2015 Oct", income:1753.00000, outcome:1916.55000},
        {year:2015, month:11, period:"2015 Nov", income:1470.00000, outcome:1223.71000},
        {year:2015, month:12, period:"2015 Dec", income:3656.00000, outcome:1414.66000}                
    ]
};

var months = [];
var results = [];

//$(registry.months).eachs(function(i,e){
var progressiveAmount = 0;
for(var i in registry.months) {
    var e = registry.months[i];
    var result = e.income-e.outcome;
    progressiveAmount = progressiveAmount + result;
    
    results.push( createData("month", e, result));
    results.push( createData("progressive", e, progressiveAmount));
    months.push( {period:e.period, type:"income", Amount:e.income} );
    months.push( {period:e.period, type:"outcome", Amount:-e.outcome} );
    months.push( {period:e.period, type:"result", Amount:result} );
};

function createData(type, data, amount) {
    return {"type":type, "Period":data.period, "Amount":amount, "Amount:":setAmountText(amount)};
}

function setAmountText(amount) {
    return amount.toFixed(2) + ' &#8364'; 
}