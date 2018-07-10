import React, { Component } from 'react';
// import twitter from './icons8-twitter-80.svg';
import './App.css';
import Quote from './components/Quote'
import Author from './components/Author'
import Tags from './components/Tags'
import Twitter from './components/Twitter'
import Tumblr from './components/Tumblr';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      quote: '',
      author: '',
      used: [], // store used quotes
      authors: [],
      isFiltered: false,
      filteredBy: ''
    }

    this.handleNext = this.handleNext.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
  }

  componentDidMount() {
    let self = this

    fetch(API)
      .then(response => response.json())
      .then((data) => {
        if (self.state.used.length === 0) {
          localStorage.setItem("quotes", JSON.stringify(data.quotes))
        }
        self.randomizeQuote()
      })
  }

  randomizeQuote() {
    const base = JSON.parse(localStorage.getItem('quotes'))
    let vals = [...base]
    if (this.state.isFiltered) {
      // console.log('state', this.state.filteredBy)
      vals = vals.filter((o) => o.author === this.state.filteredBy)
      // console.log('vals', vals)
    }
    
    var idx = Math.floor(Math.random() * vals.length)
    // var doops = this.verifyDoop(vals, idx)
    var doops = false
    
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
      used: [...this.state.used, q],
      authors: base.map((o) => o.author)
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

  handleTagClick(event) {
    event.preventDefault()

    this.setState({
      isFiltered: true,
      filteredBy: event.target.text
    })
  }

  randomizeBackground() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  }

  render() {
    if (this.state.isLoading) {
      return (
        <h1>Loading.......</h1>
      )
    }

    const appStyles = {
      'backgroundColor': this.randomizeBackground()
    }

    return (
      <div className="App" style={appStyles}>        
        <div id="wrapper">
          <div className="quote-box">
            <Quote {...this.state} color={appStyles} />
            <Author {...this.state} />
            <div className="buttons">
              <Twitter {...this.state} color={appStyles} />
              <Tumblr {...this.state} color={appStyles} />
              <button onClick={this.handleNext} style={appStyles} className="button" id="new-quote">New quote</button>
            </div>
          </div>

          <Tags handleTagClick={this.handleTagClick} filteredBy={this.state.filteredBy} authors={this.state.authors} />
        </div>
      </div>
    );
  }
}

export default App;
