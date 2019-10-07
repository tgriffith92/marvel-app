import React from 'react';
import './App.css';

const moviePreview = (movie) => (
  <li>
    {movie.id} - {movie.title}
  </li>
)

const movieList = (movies) => (
  <ul>
    {movies.map(moviePreview)}
  </ul>
)

const categoryPreview = (movie) => (
  <option value={movie.id}>
    {movie.category}
  </option>
)

const categoryList = (characters) => (
  <select>
    {characters.map(categoryPreview)}
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

const characterPreview = (character) => (
  <li>
    {character.id} - {character.title}
  </li>
)

const characterList = (characters) => (
  <ul>
    {characters.map(characterPreview)}
  </ul>
)

class NewSuggestionForm extends React.Component {
  state = {
    title: '',
    futureRelease: Date,
    relatedMovie: '',
    plot: ''
  }

  render = () => (
    <form>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Dark Reign' /><br />
      <label htmlFor='futureRelease'>Future Release:</label><br />
      <input type='date' name='futureRelease' onChange={this.handleInput} /><br />
      <label htmlFor='relatedMovie'>Tie-in Movie:</label><br />
      <input type='text' name='relatedMovie' onChange={this.handleInput} placeholder='Black Panther 2' /><br />
      <label htmlFor='plot'>Plot:</label><br />
      <textarea rows='4' cols='50' name='plot' onChange={this.handleInput}>Enter text here...</textarea><br />
      <input type='submit' value='Add Movie' />
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

  render = () => (
    <form>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Civil War' /><br />
      <label htmlFor='rating'>Rating(1-5):</label><br />
      <input type='number' name='rating' min='1' max='5' onChange={this.handleInput} /><br />
      <label htmlFor='reason'>Reason:</label><br />
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput}>Enter text here...</textarea><br />
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
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput}>Enter text here...</textarea><br />
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
    
    characters:
      [
        { name: 'Namor', id: 1 },
        { name: 'Silver Surfer', id: 2 }
      ]
  },
  2:
  {
    id: 2,
    category: 'Thor',
    releaseDate: Date,
    
    characters:
      [
        { name: 'Namor', id: 1 },
        { name: 'Silver Surfer', id: 2 }
      ]
  }
}

class App extends React.Component {

  state = {
    currentMovie: 1,
    movies: testMovies
  }

  getAllMovies = () =>
    Object.values(this.state.movies)

  getMovieCategory = () =>
    this.state.movies[this.state.currentMovie]  

  addNewCharCurrentCategory = (title) => {
    console.log('addNewCharCurrentCategory: ', title)
  }

  render = () => (
    <div>
      {categoryList(this.getAllMovies())}
      <NewCharacterForm addNewChar={this.addNewCharCurrentCategory} />
      {/* <NewComicForm />
      <NewSuggestionForm /> */}
      {/* {comicList(this.getAllMovies())} */}
      {/* {newMovieForm(testMovies)} */}
    </div>
  )
}

export default App;