import React from 'react';
import Axios from "axios";
import CarouselCard from './CarouselCard.js'

import Article from './Article';
const serverPort = 3010;

class FeedItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: 'Loading...',
            image: '',
            body: 'Loading...',
            full: props.full
        };
        this.setImage();
        this.setTitle();
        if(this.state.full){
            this.getBody();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.id !== this.props.id){
            this.setImage();
            this.setTitle();
            if(this.state.full){
                this.getBody();
            }
        }
    }

    //Fetches from server then updates state of title
    setTitle(){
        Axios.post("http://localhost:"+serverPort+"/api/cards/getTitle", {
            id: this.props.id
        }).then((response) => {
            this.setState({
                title: response.data
            });
        });
    }

    //Fetches from server then updates state of image
    setImage(){
        Axios.post("http://localhost:"+serverPort+"/api/cards/getImage", {
            id: this.props.id,
            responseType : 'arraybuffer'
        }).then((response) => {
            this.setState({
                image : 'data:image/png;base64,'+ response.data
            });
        });
    }

    //Fetches from server then updates state of body
    getBody(){
        console.log("getting body")
        Axios.post("http://localhost:"+serverPort+"/api/cards/getBody", {
            id: this.props.id
        }).then((response) => {
            console.log('_________________________')
            console.log(response.data)
            this.setState({
                body: response.data
            });
        });
    }

    getTitle(){
        return this.state.title
    }

    getImage(){
        return this.state.image
    }

    render(){
        return(
            <div>
                {(this.state.full)?(
                    <Article
                        title= {this.state.title}
                        image= {this.state.image}
                        body= {this.state.body}
                    />
                ):(
                    <CarouselCard 
                        image = {this.state.image}
                        title = {this.state.title} 
                    />
                )}

            </div>
        )
    }
}

export default FeedItem;