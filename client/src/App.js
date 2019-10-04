import React from 'react';
import './App.css';

class NewComicForm extends React.Component {
  state = {
    title: '',
    rating: 1,
    review: ''
  }

  handleInput = (evnt) => {
    let newComic = {...this.state}

    newComic[evnt.target.name] = evnt.target.value

    this.setState(newComic)
  }

  

  render = () => (
    <form>
      <label htmlFor='title'>Title:</label><br />
      <input type='text' name='title' onChange={this.handleInput} placeholder='Civil War'/><br />
      <label htmlFor='rating'>Rating(1-5):</label><br />
      <input type='number' name='rating' min='1' max='5' onChange={this.handleInput}/>
      <label htmlFor='reason'>Reason:</label><br />
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput}>Enter text here...</textarea><br />
      <input type='submit' value='New Character'/>
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
    let newCharacter = {...this.state}

    newCharacter[evnt.target.name] = evnt.target.value

    this.setState(newCharacter)
  }

  handleSelect = (evnt) => {
    this.setState({affiliation: evnt.target.value})
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewChar(this.state)
    this.setState({name: '', affiliation: '', reason: ''})
  }

  // addNewChar = (newCharInfo) => {
  //   saveCharToServer(newCharInfo)
  //     .then(newChar => {
  //       console.log(newChar);
  //       newChar
  //     })
  // }

  render = () => (
    <form>
      <label htmlFor='name'>Character Name:</label><br />
      <input type='text' name='name' onChange={this.handleInput} placeholder='Namor'/><br />
      <label htmlFor='affiliation'>Affiliation:</label><br />
      <select value={this.state.affiliation} onChange={this.handleSelect}>
        <option value='Hero'>Hero</option>
        <option value='Villain'>Villain</option>
      </select><br />
      <label htmlFor='reason'>Reason:</label><br />
      <textarea rows='4' cols='50' name='reason' onChange={this.handleInput}>Enter text here...</textarea><br />
      <input type='submit' value='New Character'/>
    </form>
  )
}

class App extends React.Component {
  render = () => (
    <div>
      <NewCharacterForm />
      <NewComicForm />
    </div>
  )
}

export default App;
