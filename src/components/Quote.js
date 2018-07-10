import React from 'react';

const Quote = function(props) {
    return (
        <div className="quote-text">
            <i className="fa fa-quote-left"> </i><span id="text">{props.quote}</span>
        </div>
    )
}

export default Quote