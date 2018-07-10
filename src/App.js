import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Quote from './components/Quote'

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      quote: '',
      author: '',
      used: [] // store used quotes
    }

    this.handleNext = this.handleNext.bind(this)
  }

  componentDidMount() {
    let self = this

    fetch(API)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (self.state.used.length === 0) {
          localStorage.setItem("quotes", JSON.stringify(data.quotes))
        }
        self.randomizeQuote()
      })
  }

  componentWillUnmount() {
    console.log('unmounting')
  }

  randomizeQuote() {
    const vals = JSON.parse(localStorage.getItem('quotes'))
    
    var idx = Math.floor(Math.random() * vals.length)
    var doops = this.verifyDoop(vals, idx)
    // try to avoid already used quotes
    while (doops) {
      idx = Math.floor(Math.random() * vals.length)
      doops = this.verifyDoop(vals, idx)
    }

    const q = vals[idx]
    this.setState({
      isLoading: false,
      quote: q.quote,
      author: q.author,
      used: [...this.state.used, q]
    })
  }

  verifyDoop(vals, idx) {
    let currentSelection = vals[idx].quote
    return this.state.used.includes(currentSelection.quote)
  }

  handleNext(event) {
    event.preventDefault()
    this.randomizeQuote()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div className="App">        
        <div id="wrapper">
          <div id="quote-box">
            <Quote {...this.state} />
            <div className="quote-author">
              - <span id="author">{this.state.author}</span>
            </div>
            <div className="buttons">
              <a className="button" id="tweet-quote" title="Tweet this quote!" target="_blank">
                <i className="fa fa-twitter"></i>
              </a>
              <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank">
                <i className="fa fa-tumblr"></i>
              </a>
              <button onClick={this.handleNext} className="button" id="new-quote">New quote</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
