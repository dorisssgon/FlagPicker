import React, { Component } from 'react'

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
      term: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      ...this.state,
      term: e.target.value,
    }, this.props.getInput(e.target.value))
  }

  handleOnFocus() {
    this.props.updateShowOption(true);
  }

  handleOnBlur() {
    setTimeout(() => this.props.updateShowOption(false) , 150)
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <input 
          value={this.state.term} 
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          />
        {this.props.children}
      </div>
    )
  }
}

export default SearchBox;