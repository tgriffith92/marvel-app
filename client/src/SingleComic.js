import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SingleComic extends Component {
    state = {
        comic: {}
    }

    getSingleComic = () => {
        fetch(`/api/comic/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(comic => {
                this.setState({comic})
            })
    }

    componentDidMount = () => {
        this.getSingleComic()
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.getSingleComic()
        }
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