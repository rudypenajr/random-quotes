import React from 'react';

const Quote = function(props) {
    console.log('props', props)
    const iStyles = {
        color: props.color.backgroundColor
    }
    
    return (
        <div className="quote-text">
            <i className="fa fa-quote-left" style={iStyles}> </i>
            <span id="text">{props.quote}</span>
        </div>
    )
}

export default Quote