import React from "react";
import {Line,Scatter,Doughnut} from "react-chartjs-2"
import moment from "moment";
import {
    Chart as ChartJS,
    registerables,
    TimeScale, //Import timescale instead of category for X axis
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js" //DO NOT DELETE
ChartJS.register(...registerables);

const dateformat = 'MMM/DD';
const currency = 'R'
const lblMoods = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent']

//renders appropriate charts using transformed datasets and formatting
function Charts(props){//{chartData}, section){   
    return(
        <div className="analytics">
            {props.section === "FIN" && //Spending/Finance section chart
                <Scatter
                    data={props.chartData}
                    height= {400}
                    options= {{
                        maintainAspectRatio : false,
                        scales:{
                            x : {
                                ticks: { //convert the unix times to human readable
                                    callback: function(value, index, ticks) {
                                        //divide by 1000 to convert milliseconds to seconds
                                        return moment.unix(value/1000).format(dateformat);
                                    }
                                },
                            },
                            y: {
                                ticks: { //add currency symbol to values
                                    callback: function(value, index, ticks) {
                                        return currency + value;                            }
                                },
                                beginAtZero: true,
                            }
                            
                        },
                        showLine: true,
                        text : "Spending Trend" 
                    }}
                />
            }
            {props.section === "WEL" && //Mood/Wellness section chart
                <Scatter
                    data={props.chartData}
                    height= {400}
                    options= {{
                        maintainAspectRatio : false,
                        scales:{
                            x : {
                                ticks: { //convert the unix times to human readable
                                    callback: function(value, index, ticks) {
                                        //divide by 1000 to convert milliseconds to seconds
                                        return moment.unix(value/1000).format(dateformat);
                                    }
                                },
                            },
                            y: {
                                ticks: { //convert numerical Y scale to human readable labels
                                    callback: function(value, index, ticks) {
                                        switch(value){
                                            case 5 : return "Excellent";
                                            case 4 : return "Good";
                                            case 3 : return "Okay";
                                            case 2 : return "Poor";
                                            case 1 : return "Terrible";
                                            default: return "";
                                        }
                                    }
                                },

                                min : 0.5,
                                max : 5.5
                            }
                            
                        },
                        showLine: true,
                        text : "Spending Trend" 
                    }}
                />
            }
            {props.section === "STD" && //Todo/Study section chart
                <Doughnut
                    data={props.chartData}
                    height = {400}
                    options= {{
                        maintainAspectRatio : false
                    }}
                />
            }
        </div>
    )
}

export default Charts