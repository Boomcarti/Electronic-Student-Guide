import React from 'react';

class FeatureNav extends React.Component{
    constructor(props){
        super(props);
        this.buttonLabels = props.buttonLabels;
        this.functions = props.functions;
        this.section =props.section;

        //creates an array of buttons corresponding to labels, allows for variable number of navigation buttons
        this.buttons = this.buttonLabels.map((value,index)=>{return <button onClick={()=>{this.functions[index]()}} id ={index}>{value}</button>
                                            });
    }

    //calls after first render
    componentDidMount(){
        this.highlight(this.init(this.section));
    }

    //more robust than assuming user navigated via butons.
    componentDidUpdate(prevProps, prevState){
        if(prevProps.section !== this.props.section){
            this.highlight(this.init(this.props.section));
        }
    }

    //get index for initialization of highlighting
    init(section){
        switch(section){
            case "ART": return 0;
            case 'FET': return 1;
            case 'ANL': return 2;
            default:    return 0;
        }
    }

    //change highlighting and function tied to button
    highlight(props){
        for(let i = 0; i < this.buttonLabels.length ;i++){
            let c =i;
            document.getElementById(c).className="active";
        }
        for(let i=0;i< this.buttonLabels.length ;i++){
            let c=i;
            if(c==props){
            document.getElementById(c).className="buttonactive";}
        }
    }

    render(){
        return(
            <div data-testid="featureNavtest" className='featureNav'>
                {this.buttons}
            </div> 
        );

    }
}




export default FeatureNav;