import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SingleComic from './SingleComic'
import './App.css'

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
        <input color='primary' type='submit' value='Add Movie'/>
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
        <input color='primary' type='submit' value='Add Comic'/>
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
        <input type='submit' color='primary' />
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
    }).then(res => res.json())

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
    }).then(res => res.json())

// const trace = (x, msg = "") => (console.log(msg, x), x)

const onEvery = (f) => (xs) => xs.map(f)
const appendTo = (a) => l => !l ? [a] : (l.push(a), l)
const modifyAt = (k) => (f) => (o) => (o[k] = f(o[k]), o)
const changeIf = (p) => (f) => (o) => p(o) ? f(o) : o

const modifyAllIf = (p) => (f) => onEvery(changeIf(p)(f))

const appendCharToMovies = (newChar) =>
  modifyAllIf
    (m => m.id === newChar.movie)
    (modifyAt
      ('characters')
      (appendTo(newChar))
    )

const appendComicToMovies = (newComic) =>
  modifyAllIf
    (m => m.id === newComic.movie)
    (modifyAt
      ('comics')
      (appendTo(newComic))
    )

const appendSuggestionToMovies = (newSuggestion) =>
  modifyAllIf
    (m => m.id === newSuggestion.movie)
    (modifyAt
      ('suggestions')
      (appendTo(newSuggestion))
    )

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
    this.state.movies.characters !== undefined ? this.state.movies.characters.map(this.addNewChar) : null

  getNextComicId = () =>
    this.state.movies.comics !== undefined ? this.state.movies.comics.map(this.addNewComic) : null

  getNextSuggestionId = () =>
    this.state.movies.suggestions !== undefined ? this.state.movies.suggestions.map(this.addNewSuggestion) : null

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie })
  }

  addNewChar = ({ name, reason }) => {
    saveCharacterToServer({ name, reason, movie: this.state.currentMovie })
      .then(newDBChar => {
        let movies =
          appendCharToMovies
            (newDBChar)
            ([...this.state.movies])

        this.setState({ movies })

      })
  }

  addNewComic = ({ title, rating, review }) => {
    saveComicToServer({ title, rating, review, movie: this.state.currentMovie })
      .then(newDBComic => {
        let movies =
          appendComicToMovies
            (newDBComic)
            ([...this.state.movies])

        this.setState({ movies })
      })

  }

  addNewSuggestion = ({ title, future_release, related_movie, plot }) => {
    saveSuggestionToServer({ title, future_release, related_movie, plot, movie: this.state.currentMovie })
      .then(newDBSuggestion => {
        let movies =
          appendSuggestionToMovies
            (newDBSuggestion)
            ([...this.state.movies])

        this.setState({ movies })
      })
  }

  render = () => {
    if (this.state.isLoading === true) {
      return (<h1>Loading</h1>);
    }
    return (
      
        <div className='container'>
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
          
            <main className='container'>
              <NewComicForm addNewComic={this.addNewComic} />
              <NewCharacterForm addNewChar={this.addNewChar} />
              {singleCharacterList(this.getMovie())}
              <NewSuggestionForm addNewSuggestion={this.addNewSuggestion} />
              {singleMovieList(this.getMovie())}
            </main> 
        </div>  
    )
  }
}

export default App;