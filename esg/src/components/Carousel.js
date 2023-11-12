import React from "react";
import FeedItem from "./FeedItem.js";

import Axios from 'axios';
const serverPort = 3010;

class CardCarousel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      myList : 'Loading...'
    };
    this.getFeed();
  }

  loadArticleAndSection(id){
    this.props.loadNewArticle(id);
    this.props.loadArticle();
  }

  getFeed(){
    console.log(this.props.searchTerm);

    Axios.post("http://localhost:"+serverPort+"/api/cards/getFeed", {
      section: this.props.currentPage,
      username:this.props.username,
      search  :this.props.searchTerm,
    }).then((response) => {
      if(response.data.length > 0){
        this.setState({
          myList : response.data.map((item) => 
            <div onClick={() => this.loadArticleAndSection(item)}>  
              <FeedItem id ={item} />
            </div>
            )
        });
        this.props.loadNewArticle(response.data[0]);
      }else{
        this.setState({
          myList : 'No results found'
        })
      }
    });
  }
 
  componentDidUpdate(prevProps, prevState){
    if(prevProps.searchTerm !== this.props.searchTerm){
      console.log(this.props.searchTerm);
      this.getFeed();
    }
  }

  render(){
    return (
     <div data-testid="carouseltest" className="CarouselMain">
      {this.state.myList}
     </div>     
    );
  }
}

export default CardCarousel;

