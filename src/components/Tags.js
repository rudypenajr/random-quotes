import React, { Component } from 'react';

class Tags extends Component {
    createListItems(authors, filteredBy) {
        let list= []
        
        authors.map((name, idx) => {
            let cn
            if (name === filteredBy) {
                cn = 'selected'
            }

            list.push(
                <li key={idx}>
                    <a href="#{name}" className={cn} onClick={this.props.handleTagClick}>
                        {name}
                    </a>
                </li>
            )    
        })

        return list
    }

    render() {
        const { authors, filteredBy } = this.props
        const list = this.createListItems(authors, filteredBy)
        let selected = filteredBy.length > 0 ? 'filtered' : ''
        return (
            <div className="tags">
                <ul className={selected}>
                    {list}
                </ul>
            </div>
        )
    }
}

// {authors.map((author, idx) =>
//     <li key={idx}>
//         <a href="#" onClick={this.props.handleTagClick}>
//             {author}
//         </a>
//     </li>
// )}

export default Tags