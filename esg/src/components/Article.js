import React from 'react';
//latest lmao

function Article({title,image,body}){
    
   

    
    var template = {__html: body}
    
    return(

        
        <div data-testid ="art" className='Article'>
            <h1>{title}</h1>
            <img  data-testid ="artimage" className ="ArticleImage" src={image}/>
            <div data-testid="artbody" dangerouslySetInnerHTML={template}></div>               
            

        </div>
        
    );
}

export default Article 