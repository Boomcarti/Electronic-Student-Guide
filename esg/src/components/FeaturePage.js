import React, {useState} from 'react';
import Finance from './Finance';
import Carousel from './Carousel';
import FeedItem from './FeedItem.js';
import FeatureNav from './FeatureNav'
import WellnessFeature from './WellnessFeature';
import StudyFeature from './StudyFeature';
import Analytics from './Analytics';
import BlockContent from './BlockContent';

const serverPort = 3010;

class FeaturePage extends React.Component {
    constructor(props){
        super(props);
        this.currentPage = props.currentPage
        this.username = props.username
        /*indicates which page is active
        FIN - Finance
        STD - Study
        WEL - Wellness
        */

        this.state={
            article : '001', //id of actively loaded article
            section : (this.username !== '' ? 'FET' : 'ART'),   /* subsection loaded
                                                                ART - Article
                                                                FET - Feature
                                                                ANL - Analysis
                                                                */  
            loadFeedWithSearch : false,
            search : '' //search term
        }

        //define button labels here
        //different sections have different button labels
        this.buttonLabels = (()=>{switch(props.currentPage){
            case "FIN": return ['Finance Article','Budget Planner','Spending Trend']; 
            case 'STD': return ['Study Article','Todo List','Task Summary'];
            case 'WEL': return ['Wellness Article','Mood Tracker','Mood Trend'];
            default:    return ['Article Reader','Feature','Analysis'];
        }})()

        //wraps functions into array to be passed to navigation.
        this.functions = [this.loadArticle.bind(this),this.loadFeature.bind(this), this.loadAnalysis.bind(this)];

        //FEATURE COMPONENTS GO HERE
        //Place Feature pages here
        this.feature = this.getFeatures(this.currentPage, this.username, this.props.changePage);

        //analysis pages here
        this.analysis = this.getAnalysis(this.currentPage, this.username, this.props.changePage);

        //article reader is defined in render
        //END OF FEATURE COMPONENTS

        this.submitHandler = (event) =>{ //for search button
            event.preventDefault();
            this.setState({
                searchTerm : ''
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.username !== this.props.username){
            this.feature = this.getFeatures(this.props.currentPage,this.props.username, this.props.changePage);
            this.analysis = this.getAnalysis(this.props.currentPage,this.props.username, this.props.changePage);
        }
    }

    getFeatures(page,username,changePage){
        if(username !== '') //COMMENT THIS LINE TO ENABLE ACCESS TO FEATURES WITHOUT LOGIN
        {
            switch(page){
                case "FIN": return <Finance username = {username}/>;
                case 'STD': return <StudyFeature username = {username}/>;
                case 'WEL': return <WellnessFeature username = {username}/>;
                default:    return <div>ERROR WHEN LOADING CONTENT</div>
            }
        }
        return BlockContent(changePage = {changePage});
    }

    getAnalysis(page,username,changePage){
        if(username !== '') //COMMENT THIS LINE TO ENABLE ACCESS TO ANALYSIS WITHOUT LOGIN
        { 
            return <Analytics username = {username} section = {page}/> 
        }
        return BlockContent(changePage = {changePage});
    }

    loadArticle(){
       // console.log('goto same article');
        this.setState({
            section : 'ART',
        })
    };

    loadNewArticle(id){
       // console.log('goto new article ' + id);
        this.setState({
            article : id,
        });
    }

    //call this function to load up feature content
    loadFeature(){
       // console.log('goto feature');
        this.setState({
            section : 'FET',
            //loadFeedWithSearch : false
        })

    }

    loadAnalysis(){
       // console.log('goto analysis');
        this.setState({
            section : 'ANL',
            //loadFeedWithSearch : false
        })
    }

    //call this to clear search and go back to normal
    clearSearch(){
        this.setState({
            search : '',
            loadFeedWithSearch : false
        });
    }

    render(){
        return (
            <div data-testid="fpagetest" className='FeaturePage'>
                <div className='left'>
                    {/*SEARCH*/} 
                    <div className='search'>                   
                        <form className="searchForm" onSubmit={() => this.clearSearch()} role="search">
                            <label 
                                className="searchLabel" 
                                form="search"
                                >Search for stuff</label>
                            <input  
                                className="searchInput" 
                                id="search" type="search"
                                onChange={e => this.setState({search : e.target.value})} 
                                placeholder="Search..." 
                                value = {this.state.search}
                                autoFocus required />
                            <button 
                                className="searchButton" 
                                type="submit"
                                >Go</button>    
                        </form>         
                    </div>
                    {/*FEED*/} 
                    <div className='feed'>
                        <Carousel   
                            currentPage     = {this.currentPage} 
                            username        = {this.props.username}
                            loadNewArticle  = {this.loadNewArticle.bind(this)} 
                            loadArticle     = {this.loadArticle.bind(this)} 
                            searchTerm      = {this.state.search}
                        />
                    </div>
                </div>
                <div className='right'>
                    {/*NAVIGATION*/} 
                    <div className='featureNavContainer'>
                        <FeatureNav 
                            buttonLabels= {this.buttonLabels} 
                            functions   = {this.functions}
                            section     ={this.state.section}
                        />
                    </div>
                    {/*CONTENT*/} 
                    <div className='featureContent'>
                        {/*DECIDING WHAT TO DISPLAY BASED ON SECTION VALUE*/}
                        {this.state.section === "ART" &&                        
                            <FeedItem id = {this.state.article} full={true}/>
                        }
                        
                        {this.state.section === "FET" &&
                            this.feature
                        }

                        {this.state.section === "QWZ" &&
                            this.quiz
                        }

                        {this.state.section === "ANL" &&
                            this.analysis
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturePage;
