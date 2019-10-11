import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SingleComic from './SingleComic'
import { Button } from 'react-bulma-components'
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
    <Link to={`/comic/${comic.id}`}>
      {comic.id} - {comic.title}
    </Link>
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
    future_release: Date,
    related_movie: '',
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
    this.setState({ title: '', future_release: '', related_movie: '', plot: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Dark Reign' /><br />
      <label htmlFor='future_release'>Year:</label><br />
      <input type='date' name='future_release' onChange={this.handleInput} /><br />
      <label htmlFor='related_movie'>Tie-in Movie:</label><br />
      <input type='text' name='related_movie' onChange={this.handleInput} placeholder='Black Panther 2' /><br />
      <label htmlFor='plot'>Plot:</label><br />
      <textarea rows='4' cols='50' name='plot' onChange={this.handleInput} placeholder='Enter text here...'></textarea><br />
      <Button type='submit'>Add Movie</Button>
    </form>
  )
}

class NewComicForm extends React.Component {
  state = {
    title: '',
    rating: 1,
    review: ''
  }

  handleInput = (evnt) => {
    let newComic = { ...this.state }

    newComic[evnt.target.name] = evnt.target.value

    this.setState(newComic)

  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewComic(this.state)
    this.setState({ title: '', rating: '', review: '' })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Civil War' /><br />
      <label htmlFor='rating'>Rating(1-5):</label><br />
      <input type='number' name='rating' min='1' max='5' onChange={this.handleInput} /><br />
      <label htmlFor='review'>Review:</label><br />
      <textarea rows='4' cols='50' name='review' onChange={this.handleInput} placeholder='Enter text here...'></textarea><br />
      <Button type='submit'>Add Comic</Button>
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
      <Button type='submit' color='info' outlined rounded size='large'>Add Character</Button>
    </form>
  )
}

const getMoviesFromServer = () =>
  fetch('/api/movie/')
    .then(res => res.json())

const saveCharacterToServer = (newChar) =>
  fetch('/api/character/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newChar)
    }
  )

const saveComicToServer = (newComic) =>
  fetch('/api/comic/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComic)
    }).then(res => res.json())

const saveSuggestionToServer = (newSuggestion) =>
  fetch('/api/suggestion/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSuggestion)
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

  getAllMovies = () => {
    console.log(this.state)
    return Object.values(this.state.movies)
    
  }
    

  getMovie = () =>
    this.state.movies[this.state.currentMovie - 1]

  getNextCharId = () =>
    this.state.movies.characters !== undefined ? this.state.movies.characters.map(this.addNewChar) : null

  getNextComicId = () =>
    this.state.movies.comics !== undefined ? this.state.movies.comics.map(this.addNewComic) : null

  getNextSuggestionId = () =>
    this.state.movies.suggestions !== undefined ? this.state.movies.suggestions.map(this.addNewSuggestion) : null

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie })
  }

  addNewChar = ({ name, reason }) => {
    saveCharacterToServer({ name, reason })
    const newChar = {
      name,
      id: this.getNextCharId()
    }
    let movies = { ...this.state.movies }

    movies[this.state.currentMovie - 1].characters.push(newChar)

    this.setState({ movies })
  }

  addNewComic = ({ title, rating, review }) => {

    let movie = this.state.currentMovie
    saveComicToServer({ title, rating, review, movie })
    .then(newDBComic => {
      console.log(newDBComic)
      const newComic = {
        title,
        id: this.getNextComicId()
      }
    })


    let movies = { ...this.state.movies }

    // movies[this.state.currentMovie - 1].comics.push(newComic)

    this.setState({ movies })
  }

  addNewSuggestion = ({ title, future_release, related_movie, plot }) => {
    saveSuggestionToServer({ title, future_release, related_movie, plot })
    const newSuggestion = {
      title,
      id: this.getNextSuggestionId()
    }

    let movies = { ...this.state.movies }

    movies[this.state.currentMovie - 1].suggestions.push(newSuggestion)

    this.setState({ movies })
  }

  render = () => {
    if (this.state.isLoading === true) {
      return (<h1>Loading</h1>);
    }
    return (
      <div>
        <aside>
          <Router>
            <Switch>
              <Route
                path='/'
                exact
                render={() => (
                  <div>
                    {titleList(this.getAllMovies(), this.setCurrentMovie)}
                    {singleComicList(this.getMovie())}
                  </div>
                )} />
              <Route path='/comic/:id' component={SingleComic} />
            </Switch>
          </Router>
        </aside>
        <main>

          <NewCharacterForm addNewChar={this.addNewChar} />
          {singleCharacterList(this.getMovie())}
          <NewComicForm addNewComic={this.addNewComic} />
          <NewSuggestionForm addNewSuggestion={this.addNewSuggestion} />
          {singleMovieList(this.getMovie())}
        </main>
      </div>
    )
  }
}

export default App;