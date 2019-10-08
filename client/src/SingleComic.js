import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SingleComic extends Component {
    state = {
        comic: {}
    }

    render = () => {
        return (
            <div>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default SingleComic;