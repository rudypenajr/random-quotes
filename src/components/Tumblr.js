import React, { Component } from 'react';
import tumblr from '../tumblr.svg';

// const Twitter = function(props) {
class Tumblr extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }

  handleClick(event) {
    event.preventDefault()
    const encodedQuote = encodeURIComponent(this.props.quote)
    const encodedAuthor = encodeURIComponent(this.props.author)
    this.openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+ encodedAuthor +'&content=' + encodedQuote +'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  }

  render() {
    const iStyles = {
      backgroundColor: this.props.color.backgroundColor
    }
  
    return (
      <a className="button" id="tumblr-quote" onClick={this.handleClick} title="Post this quote on tumblr!" target="_blank" style={iStyles}>
        <img src={tumblr} alt="Tumblr Logo" />
        {/* <i className="fa fa-tumblr"></i> */}
      </a>
    );
  }
}

export default Tumblr

