import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SingleComic from './SingleComic'
import './App.css';

const moviePreview = (movie) => (
  <li>
    {movie.id} - {movie.title}
  </li>
)

const movieList = (movie) => (
  <ul>
    {movie.map(moviePreview)}
  </ul>
)

const singleMovieList = (movie) => (
  <div>
    {movie.title}
    {movieList(movie.suggestions)}
  </div>
)

const titlePreview = (movie) => (
  <option value={movie.id}>
    {movie.title}
  </option>
)

const titleList = (movie, onChange) => (
  <select onChange={(evnt) => onChange(evnt.target.value)}>
    {movie.map(titlePreview)}
  </select>
)

const comicPreview = (comic) => (
  <li>
    {/* <Link to={`/comic/${comic.id}`}> */}
    {comic.id} - {comic.title}
    {/* </Link> */}
  </li>
)

const comicList = (comic) => {
  return (
    <ul>
      {(comic && comic.length) ? comic.map(comicPreview) : null}
    </ul>
  )
}

const singleComicList = (movie) => {
  if (movie === undefined) {
    return null
  }
  return (
    <div>
      {movie.title}
      {comicList(movie.comics)}
    </div>
  )
}

const characterPreview = (character) => (
  <li>
    {character.id} - {character.name}
  </li>
)

const characterList = (character) => (
  <ul>
    {character.map(characterPreview)}
  </ul>
)

const singleCharacterList = (movie) => {
  return (
    <div>
      {movie.title}
      {characterList(movie.characters)}
    </div>
  )
}

class NewSuggestionForm extends React.Component {
  state = {
    title: '',
    year: Date,
    relatedMovie: '',
    plot: ''
  }

  handleInput = (evnt) => {
    let newSuggestion = { ...this.state }

    newSuggestion[evnt.target.name] = evnt.target.value

    this.setState(newSuggestion)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewSuggestion(this.state)
    this.setState({ title: '', year: '', relatedMovie: '', plot: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Dark Reign' /><br />
      <label htmlFor='year'>Year:</label><br />
      <input type='date' name='year' onChange={this.handleInput} /><br />
      <label htmlFor='relatedMovie'>Tie-in Movie:</label><br />
      <input type='text' name='relatedMovie' onChange={this.handleInput} placeholder='Black Panther 2' /><br />
      <label htmlFor='plot'>Plot:</label><br />
      <textarea rows='4' cols='50' name='plot' onChange={this.handleInput} placeholder='Enter text here...'></textarea><br />
      <input type='submit' value='Add Movie' />
    </form>
  )
}

class NewComicForm extends React.Component {
  state = {
    title: '',
    rating: 1,
    reason: ''
  }

  handleInput = (evnt) => {
    let newComic = { ...this.state }

    newComic[evnt.target.name] = evnt.target.value

    this.setState(newComic)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewComic(this.state.title)
    this.setState({ title: '', rating: '', reason: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Civil War' /><br />
      <label htmlFor='rating'>Rating(1-5):</label><br />
      <input type='number' name='rating' min='1' max='5' onChange={this.handleInput} /><br />
      <label htmlFor='reason'>Reason:</label><br />
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput} placeholder='Enter text here...'></textarea><br />
      <input type='submit' value='Add Comic' />
    </form>
  )
}

class NewCharacterForm extends React.Component {

  state = {
    name: '',
    affiliation: 'Hero',
    reason: ''
  }

  handleInput = (evnt) => {
    let newCharacter = { ...this.state }

    newCharacter[evnt.target.name] = evnt.target.value

    this.setState(newCharacter)
  }

  handleSelect = (evnt) => {
    this.setState({ affiliation: evnt.target.value })
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewChar(this.state)
    this.setState({ name: '', affiliation: '', reason: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='name'>Character Name:</label><br />
      <input type='text' name='name' onChange={this.handleInput} placeholder='Namor' /><br />
      <label htmlFor='affiliation'>Affiliation:</label><br />
      <select value={this.state.affiliation} onChange={this.handleSelect}>
        <option value='Hero'>Hero</option>
        <option value='Villain'>Villain</option>
      </select><br />
      <label htmlFor='reason'>Reason:</label><br />
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput} placeholder='Enter text here...'></textarea><br />
      <input type='submit' value='Add Character' />
    </form>
  )
}

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

const getMoviesFromServer = () =>
  fetch('/api/movie/')
    .then(res => res.json())

const saveCharacterToServer = (newComic) =>
  fetch('/api/character/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComic)
    }
  )


// const trace = (x, msg = "") => (console.log(msg, x), x)

class App extends React.Component {

  state = {
    currentMovie: 1,
    movies: [],
    isLoading: true
  }

  componentDidMount = () => {
    getMoviesFromServer()
      .then(movies => {
        this.setState({ ...this.state, movies: movies, isLoading: false })
      })
  }

  getAllMovies = () =>
    Object.values(this.state.movies)

  getMovie = () =>
    this.state.movies[this.state.currentMovie - 1]

  getNextCharId = () =>
    this.state.movies.characters !== undefined ? this.state.movies.characters.map(this.addNewComic) : null

  getNextComicId = () =>
    this.state.movies.comics !== undefined ? this.state.movies.comics.map(this.addNewComic) : null

  getNextSuggestionId = () =>
    this.state.movies.suggestions !== undefined ? this.state.movies.suggestions.map(this.addNewComic) : null

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie })
  }

  addNewChar = ({ name, reason}) => {
    saveCharacterToServer({name, reason})
    const newChar = {
      name,
      id: this.getNextCharId()
    }
    let movies = { ...this.state.movies }

    movies[this.state.currentMovie - 1].characters.push(newChar)

    this.setState({ movies })
  }

  addNewComic = ({ title }) => {
    const newComic = {
      title,
      id: this.getNextComicId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].comics.push(newComic)

    this.setState({ movies })
  }

  addNewSuggestion = ({ title }) => {
    const newSuggestion = {
      title,
      id: this.getNextSuggestionId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].suggestions.push(newSuggestion)

    this.setState({ movies })
  }

  render = () => {
    if (this.state.isLoading === true) {
      return (<h1>Loading</h1>);
    }
    return (
      <div>
        {/* <aside>
        <Router>
          <Switch>
            <Route
              path='/'
              exact
              render={() => (
                
              )} />
            <Route path='/comic/:id' component={SingleComic} />
          </Switch>
        </Router>
      </aside> */}
        <main>
          {titleList(this.getAllMovies(), this.setCurrentMovie)}
          <NewCharacterForm addNewChar={this.addNewChar} />
          {singleCharacterList(this.getMovie())}
          <NewComicForm addNewComic={this.addNewComic} />
          {singleComicList(this.getMovie())}
          <NewSuggestionForm addNewSuggestion={this.addNewSuggestion} />
          {singleMovieList(this.getMovie())}
        </main>
      </div>
    )
  }
}

export default App;