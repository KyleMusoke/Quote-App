import React, { Component} from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      author: ''
    };
  }
  componentDidMount(){
    this.fetchQuotes();
  }

  fetchQuotes = () => {
    fetch('https://type.fit/api/quotes')
        .then((res)=> {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }

          return res.json();

        })
        .then((data)=>{
          const RandomQuote = Math.floor(Math.random() * data.length);
            const quote = data[RandomQuote].text;
            const author = data[RandomQuote].author;
            this.setState({ quote,author,error: ''});
        })
        .catch((error) =>{
          console.error(error);
          this.setState({error: 'failed to fetch data'});
        });
        
  }

  render(){
    const {quote,author,error} = this.state;
    return(
      <div className='Machine'>
      <div id='quote-box'>
        {error ? (<p>{error}</p>):(
        <>
          <div id='text'>
        <p><i className="fa-solid fa-quote-left"></i>
         {quote}<i className="fa-solid fa-quote-right"></i></p>
      </div>
      <div id='author'>
        <p>{author}</p>
      </div>
      <a
      id='tweet-quote'
      href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
      target='_blank'
      ><i className="fa-brands fa-x-twitter"></i></a>
      <button id='new-quote' onClick={this.fetchQuotes}>New quote</button>
      
        </>
        )}
      
      </div>
      </div>
        
    )
  }
}

export default App;
