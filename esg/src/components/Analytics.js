import React from 'react';
import Charts from './Charts';
import { setDatasets } from 'react-chartjs-2';
import Axios from 'axios'
import moment from 'moment'

const serverPort = 3010;
/*
    Takes in a username and section then Queries the backend for relevant chart data.
    Transforms data and then passes to Chart component
*/
class Analytics extends React.Component{
    constructor(props){
        super(props)
        //Dummy data for chart to render first time before real data is ready
        this.state = {  
            userData : {
                labels  : ['Loading...','Loading...','Loading...'],
                datasets: [
                    
                ]
            }
        }
        this.getAnalytics();
        
    }

    //Decides which analytics to get based on section
    //FIN - Finance
    //WEL - Wellness
    //STD - Study
    getAnalytics(){
        if(this.props.section === 'FIN'){
            this.getBudgetAnalytics();
        }else if(this.props.section === 'WEL'){
            this.getMoodAnalytics();
        }else if(this.props.section === 'STD'){
            this.getTodoAnalytics();
        }else{
            console.error("Bad analylitics section")
        }
    }

    //Queries for budget analytics data then calls transform
    getBudgetAnalytics(){
        Axios.post("http://localhost:"+serverPort+"/api/analytics/getBudgetsAnalytics", {
            username : this.props.username 
        }).then((response) => {
            this.setState({
                userData : this.getBudgetDatasets(response.data)
            });
        });
    }

    //Queries for Todo analytics data then calls transform
    getTodoAnalytics(){
        Axios.post("http://localhost:"+serverPort+"/api/analytics/getTodoAnalytics", {
            username : this.props.username
        }).then((response) => {
            this.setState({
                userData : this.getTodoDatasets(response.data)
            });
        });
    }

    //Queries for Mood analytics data then calls transform
    getMoodAnalytics(){
        Axios.post("http://localhost:"+serverPort+"/api/analytics/getMoodAnalytics", {
            username : this.props.username
        }).then((response) => {
            this.setState({
                userData : this.getMoodDatasets(response.data)
            });
        });
    }

    //transforms budget data for chart,
    //Scatter Plot
    //X axis - unix times
    //Y axis - money
    getBudgetDatasets(data){
        var datasets = []
        datasets.push({
            type : 'scatter',
            label: 'Spending',
            data : data.fullActual.map((item)=>{
                    return { //convert date time to unix time for plotting
                        x: moment(item.date),
                        y: item.amount
                    }}),
            backgroundColor: 'blue',
            borderColor: 'blue'
        });
        datasets.push({
            type : 'scatter',
            label: 'Budget',
            data : data.fullBudget.map((item)=>{
                return {
                    x: moment(item.date),
                    y: item.amount
                }}),
            backgroundColor: 'red',
            borderColor : 'red'
        });
        console.log(datasets);
        return {datasets};
    }

    //transforms Todo data for chart,
    //Dougnut Chart (pie chart with hole in middle)
    //sets: Complete, Incomplete and Overdue tasks
    getTodoDatasets(data){
        const datasets = {
            labels: ['Complete', 'Incomplete', 'Late'],
            datasets:[{
                type: 'doughnut',
                label: 'Tasks',
                data : [data.complete,data.incomplete,data.overdue],
                backgroundColor: ['green','yellow','red'],
                hoverOffset : 4
            }]
        };
        console.log(datasets);

        return datasets;
    }

    //Transforms mood datasets
    //X Axis - Unix times
    //Y Axis - avaerage mood score for the day
    getMoodDatasets(data){
        const datasets = [{
            label: 'Mood History',
            type : 'scatter',
            data : data.result.map((item)=>{
                return {
                    x: moment(item.moodDate),
                    y: item.mood
                }}),
            backgroundColor: 'blue',
            borderColor: 'blue',
            tension: 0.4,
            fill: 'origin'
        }];
        console.log(datasets);
        return {datasets};
    }

    //calls charts to render
    render(){
        return(
            
            <div data-testid="testanalytics" className='analytics' >
                <Charts chartData={this.state.userData} section = {this.props.section}/>
            </div>

        )
    }
}

export default Analytics;