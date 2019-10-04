import React from 'react';
import './App.css';

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

  render = () => (
    <form onSubmit={this.handleSubmit}>
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
    </div>
  )
}

export default App;
