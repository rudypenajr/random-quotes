import React, { Component } from 'react';
import twitter from '../twitter.svg';

// const Twitter = function(props) {
class Twitter extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }

  handleClick(event) {
    event.preventDefault()
    const encoded = encodeURIComponent('"' + this.props.quote + '" ' + this.props.author)
    this.openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encoded);
  }

  render() {
    const iStyles = {
      backgroundColor: this.props.color.backgroundColor
    }
  
    return (
      <a className="button" id="tweet-quote" onClick={this.handleClick} title="Tweet this quote!" target="_blank" style={iStyles}>
        <img src={twitter} alt="Twitter Logo" />
        {/* <i className="fa fa-twitter"></i> */}
      </a>
    );
  }
}

export default Twitter

