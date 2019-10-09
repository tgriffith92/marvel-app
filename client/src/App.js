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
    {movieList(movie.suggestion)}
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

const comicList = (comic) => (
  <ul>
    {comic.map(comicPreview)}
  </ul>
)

const singleComicList = (movie) => (
  <div>
    {movie.title}
    {comicList(movie.comic)}
  </div>
)

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

const singleCharacterList = (movie) => (
  <div>
    {movie.title}
    {characterList(movie.character)}
  </div>
)

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

    this.props.addNewChar(this.state.name)
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

const testMovies =
{
  1:
  {
    id: 1,
    title: 'Iron Man',
    year: '2008-05-02',
    comic:
      [
        { id: 1, title: 'Civil War', rating: 5, review: 'Great comic.'},
        { id: 2, title: 'Dark Reign', rating: 5, review: 'Great comic.'}
      ],
    character:
      [
        { name: 'Namor', id: 1 },
        { name: 'Silver Surfer', id: 2 }
      ],
    suggestion:
      [
        { title: 'Doctor Doom', id: 1 },
        { title: 'Avengers Vs Xmen', id: 1 }
      ]
  },
  2:
  {
    id: 2,
    title: 'Thor',
    year: Date,
    comic:
      [
        { id: 1, title: 'The Mighty Thor', rating: 5, review: 'Great comic.' },
        { id: 2, title: 'Thor Ragnorak', rating: 5, review: 'Great comic.'  }
      ],
    character:
      [
        { name: 'Namor', id: 1 },
        { name: 'Silver Surfer', id: 2 }
      ],
    suggestion:
      [
        { title: 'Doctor Doom', id: 1 },
        { title: 'Avengers Vs Xmen', id: 2 }
      ]
  }
}

const getMoviesFromServer = () =>
  fetch('/api/movie/')
    .then(res => res.json())

const getComicsFromServer = () =>
  fetch('/api/comic/')
    .then(res => res.json())

// const getCharactersFromServer = () =>
//   fetch('/api/character/')
//     .then(res => res.json())

// const getSuggestionsFromServer = () =>
//   fetch('/api/suggestion/')
//     .then(res => res.json())

const movieArrayToObject = (movies) =>
  movies.reduce((obj, movie) => {
    obj[movie.id] = movie;
    return obj;
  }, {})

const trace = (x, msg = "") => (console.log(msg, x), x)


class App extends React.Component {

  state = {
    currentMovie: 1,
    movies: testMovies
  }

  componentDidMount = () => {
    getMoviesFromServer()
      .then(movies => movieArrayToObject(movies))
      .then(movies => {
        this.setState({movies: trace(movies, "movies")})
      })
  }

  getAllMovies = () =>
    Object.values(this.state.movies)

  getMovieTitle = () =>
    trace(this.state.movies[this.state.currentMovie], 'getMovieTitle')

  getNextId = () =>
    Math.max(...this.getMovieTitle().character.map(character => character.id)) + 1

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie })
  }

  addNewCharCurrentTitle = (name) => {
    const newChar = {
      name,
      id: this.getNextId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].character.push(newChar)

    this.setState({ movies })
  }

  addNewComicCurrentTitle = (title) => {
    const newComic = {
      title,
      id: this.getNextId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].comic.push(newComic)

    this.setState({ movies })
  }

  addNewSuggestionCurrentTitle = (title) => {
    const newSuggestion = {
      title,
      id: this.getNextId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].suggestion.push(newSuggestion)

    this.setState({ movies })
  }

  render = () => (
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
        {singleComicList(this.getMovieTitle())}
        <NewCharacterForm addNewChar={this.addNewCharCurrentTitle} />
        {singleCharacterList(this.getMovieTitle())}
        <NewComicForm addNewComic={this.addNewComicCurrentTitle} />
        <NewSuggestionForm addNewSuggestion={this.addNewSuggestionCurrentTitle} />
        {singleMovieList(this.getMovieTitle())}
      </main>
    </div>
  )
}

export default App;