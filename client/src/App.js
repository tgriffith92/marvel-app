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
    {movie.category}
    {movieList(movie.suggestion)}
  </div>
)

const categoryPreview = (movie) => (
  <option value={movie.id}>
    {movie.category}
  </option>
)

const categoryList = (movie, onChange) => (
  <select onChange={(evnt) => onChange(evnt.target.value)}>
    {movie.map(categoryPreview)}
  </select>
)

const comicPreview = (comic) => (
  <li>
    {comic.id} - {comic.title}
  </li>
)

const comicList = (comics) => (
  <ul>
    {comics.map(comicPreview)}
  </ul>
)

const singleComicList = (comic) => (
  <div>
    {comic.category}
    {comicList(comic.comics)}
  </div>
)

const characterPreview = (character) => (
  <li>
    {character.id} - {character.name}
  </li>
)

const characterList = (characters) => (
  <ul>
    {characters.map(characterPreview)}
  </ul>
)

const singleCharacterList = (character) => (
  <div>
    {character.category}
    {characterList(character.characters)}
  </div>
)

class NewSuggestionForm extends React.Component {
  state = {
    title: '',
    futureRelease: Date,
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
    this.setState({ title: '', futureRelease: '', relatedMovie: '', plot: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Dark Reign' /><br />
      <label htmlFor='futureRelease'>Future Release:</label><br />
      <input type='date' name='futureRelease' onChange={this.handleInput} /><br />
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

  // addNewChar = (newCharInfo) => {
  //   saveCharToServer(newCharInfo)
  //     .then(newChar => {
  //       console.log(newChar);
  //       newChar
  //     })
  // }

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
    category: 'Iron Man',
    releaseDate: Date,
    comics:
      [
        { title: 'Civil War', id: 1 },
        { title: 'Dark Reign', id: 2 }
      ],
    characters:
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
    category: 'Thor',
    releaseDate: Date,
    comics:
      [
        { title: 'The Mighty Thor', id: 1 },
        { title: 'Thor Ragnorak', id: 2 }
      ],
    characters:
      [
        { name: 'Namor', id: 1 },
        { name: 'Silver Surfer', id: 2 }
      ],
    suggestion:
      [
        { title: 'Doctor Doom', id: 1 },
        { title: 'Avengers Vs Xmen', id: 1 }
      ]
  }
}

// const getMoviesFromServer = () =>
//   fetch('/api/movie')
//     .then(res => res.json())

// const getComicsFromServer = () =>
//   fetch('/api/comic')
//     .then(res => res.json())

// const getCharactersFromServer = () =>
//   fetch('/api/character')
//     .then(res => res.json())

// const getSuggestionsFromServer = () =>
//   fetch('/api/suggestion')
//     .then(res => res.json())

class App extends React.Component {

  state = {
    currentMovie: 1,
    movies: testMovies
  }

  getAllMovies = () =>
    Object.values(this.state.movies)

  getMovieCategory = () =>
    this.state.movies[this.state.currentMovie]

  getNextId = () =>
    Math.max(...this.getMovieCategory().characters.map(character => character.id)) + 1

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie })
  }

  addNewCharCurrentCategory = (name) => {
    const newChar = {
      name,
      id: this.getNextId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].characters.push(newChar)

    this.setState({ movies })
  }

  addNewComicCurrentCategory = (title) => {
    const newComic = {
      title,
      id: this.getNextId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie].comics.push(newComic)

    this.setState({ movies })
  }

  addNewSuggestionCurrentCategory = (title) => {
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
      <main>
        {categoryList(this.getAllMovies(), this.setCurrentMovie)}
        <NewCharacterForm addNewChar={this.addNewCharCurrentCategory} />
        {singleCharacterList(this.getMovieCategory())}
        <NewComicForm addNewComic={this.addNewComicCurrentCategory} />
        {singleComicList(this.getMovieCategory())}
        <NewSuggestionForm addNewSuggestion={this.addNewSuggestionCurrentCategory} />
        {singleMovieList(this.getMovieCategory())}
      </main>
      <div>
        <Router>
          <Switch>
            <Route path='/comic/:id' component={SingleComic}/>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;