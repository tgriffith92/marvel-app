import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleComic extends Component {
    state = {
        comic: {}
    }

    getSingleComic = () => {
        fetch(`/api/comic/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(comic => {
                this.setState({ comic })
            })
    }

    componentDidMount = () => {
        this.getSingleComic()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getSingleComic()
        }
    }

    render = () => {
        return (
            <div className='single'>
                <Link to='/'>Home</Link>
                <h1>Comic</h1>
                <h3>Title</h3>
                <p>{this.state.comic.title}</p>
                <h3>Rating</h3>
                <p>{this.state.comic.rating}</p>
                <h3>Review</h3>
                <p>{this.state.comic.review}</p>
              
            </div>
        )
    }
}

export default SingleComic;