import React from 'react';

const Author = function(props) {
    return (
        <div className="quote-author">
            - <span id="author">{props.author}</span>
        </div>
    )
}

export default Author

