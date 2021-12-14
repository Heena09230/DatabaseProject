// const labels =["01/19","02/19","03/19","04/19","05/19","06/19","07/19","08/19","09/19","10/19","11/19","12/19","01/20","02/20","03/20","04/20","05/20","06/20","07/20","08/20","09/20","10/20","11/20","12/20","01/21","02/21","03/21","04/21","05/21","06/21","07/21","08/21","09/21","10/21", "11/21"];
//    console.log("labels");
//    console.log(labels);

let response = 0
const Super_Sectors = {

'00':	'Total nonfarm',
'05':	'Total private',
'06':	'Goods-producing',
'07':	'Service-providing',
'08':	'Private service-providing',
'10':	'Mining and logging',
'20':	'Construction',
'30':	'Manufacturing',
'31':	'Durable Goods',
'32':	'Nondurable Goods',
'40':	'Trade, transportation, and utilities',
'41':	'Wholesale trade',
'42':	'Retail trade',
'43':	'Transportation and warehousing',
'44':	'Utilities',
'50':	'Information',
'55':	'Financial activities',
'60':	'Professional and business services',
'65':	'Education and health services',
'70':	'Leisure and hospitality',
'80':	'Other services',
'90':	'Government'

} 
//6.10 book 
let Super_Sectors_Keys = Object.keys(Super_Sectors)
console.log(Super_Sectors_Keys)


// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(204, 0, 0)',
      orange: 'rgb(255, 153, 0)',
      pink: 'rgb(247, 30, 223)',
      green: 'rgb(0, 153, 51)',
      blue: 'rgb(0, 153, 255)',
      purple: 'rgb(153, 0, 204)',
      grey: 'rgb(201, 201, 201)',
      yellow:'rgb(255, 255, 0)',
      darkpurple:'rgb(102, 0, 102)',
      darkblue:'rgb(0, 51, 153)',
      darkred:'rgb(128, 0, 0)',
      darkgreen:'rgb(0, 51, 0)',
      darkorange:'rgb(255, 102, 0)',
      navygreen:'rgb(51, 51, 0)',
      brown:'rgb(102, 51, 0)',
      oceanblue:'rgb(102, 153, 153)',
      babypink:'rgb(255, 204, 255)',
      skyblue:'rgb(102, 153, 255)',
      lightyellow:'rgb(255, 255, 153)',
      pinkred: 'rgb(255, 0, 102)',
      lightpurple:'rgb(204, 153, 255)',
      greenblue:'rgb(0, 102, 102)',
      lightgreen: 'rgb(0, 255, 0)'

      

      
    };
let Chart_Color_Keys = Object.keys(CHART_COLORS)

//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = {
      red: 'rgba(204, 0, 0, 0.5)',
      orange: 'rgba(255, 153, 0, 0.5)',
      pink: 'rgba(247, 30, 223, 0.5)',
      green: 'rgba(0, 153, 51, 0.5)',
      blue: 'rgba(0, 153, 255, 0.5)',
      purple: 'rgba(153, 0, 204, 0.5)',
      grey: 'rgba(201, 201, 201, 0.5)',
      yellow: 'rgba(255, 255, 0,0.5)',
      darkpurple: 'rgba(102, 0, 102,0.5)',
      navy: 'rgba(0, 51, 153,0.5)',
      darkred: 'rgba(128, 0, 0,0.5)',
      darkgreen:'rgba(0, 51, 0,0.5)',
      darkorange:'rgba(255, 102, 0,0.5)',
      navygreen:'rgba(51, 51, 0,0.5)',
      brown:'rgba(102, 51, 0,0.5)',
      oceanblue:'rgba(102, 153, 153,0.5)',
      babypink:'rgba(255, 204, 255,0.5)',
      skyblue:'rgba(102, 153, 255,0.5)',
      lightyellow:'rgba(255, 255, 153,0.5)',
      pinkred: 'rgba(255, 0, 102,0.5)',
      lightpurple: 'rgba(204, 153, 255,0.5)',
      greenblue:'rgba(0, 102, 102,0.5)',
      lightgreen: 'rgba(0, 255, 0,0.5)'
    
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: [],
      datasets: []
    }

  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);

    
//    console.dir(myChart);
//    console.log("Ending");

function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorID = seriesID.substring(3,5)
    let gridline =  {
      label: 'Super sector name',
      data: [],
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS_50_Percent.red,
      hidden: true

    };

    
    for (let i = dataArray.length-1; i >= 0; i--) {
     gridline.data.push(dataArray[i].value)
     if(response==0) {

     data.labels.push(dataArray[i].period.substring(1)+ '/'+ dataArray[i].year)
    }
  }
gridline.label = Super_Sectors[sectorID]
gridline.borderColor = CHART_COLORS[Chart_Color_Keys[response]] 
gridline.backgroundColor = CHART_COLORS_50_Percent[Chart_Color_Keys[response]] 

    data.datasets.push(gridline)
  response++
  } else {
console.log ("error");
  }

  if(response==Super_Sectors_Keys.length) {

  const myChart = new Chart(
    document.getElementById('myChart'),
      config);
    }
}

for (let i=0; i<Super_Sectors_Keys.length; i++) {
let startquery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
let endquery = "00000001?registrationkey=efa74bf1744c4f8cbd09744b2204824b"


let xhr = new XMLHttpRequest();
xhr.addEventListener("load", responseReceivedHandler);
xhr.responseType = "json";
xhr.open("GET", startquery+Super_Sectors_Keys[i]+endquery);
xhr.send();
}
