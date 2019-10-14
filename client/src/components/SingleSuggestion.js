import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleSuggestion extends Component {
    state = {
        suggestion: {}
    }

    getSingleSuggestion = () => {
        fetch(`/api/suggestion/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(suggestion => {
                this.setState({ suggestion })
            })
    }

    componentDidMount = () => {
        this.getSingleSuggestion()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getSingleSuggestion()
        }
    }

    render = () => {
        return (
            <div className='single'>
                <Link to='/'>Home</Link>
                <h1>Movie Suggestion</h1>
                <h3>Title</h3>
                <p>{this.state.suggestion.title}</p>
                <h3>Release Date</h3>
                <p>{this.state.suggestion.future_release}</p>
                <h3>Related Movie</h3>
                <p>{this.state.suggestion.related_movie}</p>
                <h3>Plot</h3>
                <p>{this.state.suggestion.plot}</p>
            </div>
        )
    }
}

export default SingleSuggestion