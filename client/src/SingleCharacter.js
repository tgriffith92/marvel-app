import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleCharacter extends Component {
    state = {
        character: {}
    }

    getSingleCharacter = () => {
        fetch(`/api/character/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(character => {
                this.setState({ character })
            })
    }

    componentDidMount = () => {
        this.getSingleCharacter()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getSingleCharacter()
        }
    }

    render = () => {
        return (
            <div>
                <Link to='/'>Home</Link>
                <h1>Character</h1>
                <p>{this.state.character.name}</p>
                <p>{this.state.character.affiliation}</p>
                <p>{this.state.character.reason}</p>
            </div>
        )
    }
}

export default SingleCharacter