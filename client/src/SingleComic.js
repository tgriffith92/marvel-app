import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// const testMovies =
// {
//   1:
//   {
//     id: 1,
//     title: 'Iron Man',
//     year: '2008-05-02',
//     comic:
//       [
//         { id: 1, title: 'Civil War', rating: 5, review: 'Great comic.' },
//         { id: 2, title: 'Dark Reign', rating: 5, review: 'Great comic.' }
//       ],
//     character:
//       [
//         { name: 'Namor', id: 1 },
//         { name: 'Silver Surfer', id: 2 }
//       ],
//     suggestion:
//       [
//         { title: 'Doctor Doom', id: 1 },
//         { title: 'Avengers Vs Xmen', id: 1 }
//       ]
//   },
//   2:
//   {
//     id: 2,
//     title: 'Thor',
//     year: Date,
//     comic:
//       [
//         { id: 1, title: 'The Mighty Thor', rating: 5, review: 'Great comic.' },
//         { id: 2, title: 'Thor Ragnorak', rating: 5, review: 'Great comic.' }
//       ],
//     character:
//       [
//         { name: 'Namor', id: 1 },
//         { name: 'Silver Surfer', id: 2 }
//       ],
//     suggestion:
//       [
//         { title: 'Doctor Doom', id: 1 },
//         { title: 'Avengers Vs Xmen', id: 2 }
//       ]
//   }
// }

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
            <div>
                <Link to='/'>Home</Link>
                <h1>Iron Man</h1>
                <p>{this.state.comic.title}</p>
            </div>
        )
    }
}

export default SingleComic;