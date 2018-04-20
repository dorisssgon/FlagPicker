import React, { Component } from 'react';
import SearchBox from './SearchBox';
import './FlagPicker.css';
class FlagPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      continents: [],
      countries: {},
      flags: {},
      continentPicked: '',
      flagsPicked: [],
      focusOn: -1,
      termFirst: '',
      termSecond: '',
      showSearchBoxOne: false,
      showSearchBOxTwo: true,
    }
    this.updataContinentPicked = this.updataContinentPicked.bind(this);
    this.renderContinent = this.renderContinent.bind(this);
    this.renderYouSelected = this.renderYouSelected.bind(this);
    this.renderCountry = this.renderCountry.bind(this);
    this.onClickInput = this.onClickInput.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.reset = this.reset.bind(this);
    this.keyMonitor = this.keyMonitor.bind(this);
    this.getInput1 = this.getInput1.bind(this);
    this.getInput2 = this.getInput2.bind(this);
    this.updateShowOptionOne = this.updateShowOptionOne.bind(this);
    this.updateShowOptionTwo = this.updateShowOptionTwo.bind(this);
  }

  keyMonitor(e) {
    if(e.keyCode === 40 && this.state.focusOn<this.state.continents.length-1) { this.setState((prevState) => ({...prevState, focusOn: prevState.focusOn+1}))}
    if(e.keyCode === 38 && this.state.focusOn>0) { this.setState((prevState) => ({...prevState, focusOn: prevState.focusOn-1}))}
    if(e.keyCode === 13 && document.querySelector('.item-focus')) {
      this.setState({
        ...this.state,
        continentPicked: document.querySelector('.item-focus').innerText,
      })
    }
  }

  componentWillMount() {
    window.addEventListener("keydown", this.keyMonitor);
  }

  componentDidMount() {
    // fetch data here
    fetch('continents.json').then(response => response.json()).then(response => {
      const continents = [];
      const countries = {};
      const flags = {};
      for(let index in response) {
        continents.push(response[index].continent);
        countries[response[index].continent] = Array.prototype.map.call(response[index].countries, (element) => {
          flags[element.name] = element.flag;
          return element.name;
        })
      }
      this.setState({
        ...this.state,
        continents,
        countries,
        flags,
        data: response
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyMonitor);
  }

  // functions for step 1
  updataContinentPicked(value) {
    this.setState({
      ...this.state,
      continentPicked: value
    })
  }

  renderContinent(data) {
    return data.filter(element => element.toLowerCase().startsWith(this.state.termFirst.toLowerCase())).map((element, index) => {
      return (
        <li 
          value={element} 
          key={index}
          onClick={() => {this.updataContinentPicked(element)}}
          className={this.state.focusOn===index? "item-focus" : ""}>
          {element}
        </li>
      )
    })
  }

  renderYouSelected() {
    return (
      <div>
        <p>You selected</p>
        <h1>{this.state.continentPicked}</h1>
      </div>
    )
  }

  //functions for step 2
  renderCountry(data) {
    return data.filter(element => element.toLowerCase().startsWith(this.state.termSecond.toLowerCase())).map((element, index) => {
      return (
        <li
          className = "picker-second" 
          value={element}
          key={index}
          onClick={this.onCountryClick}>
            <input 
              type="checkbox"
              id={element}
              checked={this.state.flagsPicked.includes(element)}
              onChange={()=>this.onClickInput(element)}/>{element}
        </li>
      )
    })
  }

  onClickInput(element) {
    const newFlagsPicked = this.state.flagsPicked.slice();
    let current = newFlagsPicked.indexOf(element);
    if(current!==-1) {
      newFlagsPicked.splice(current, 1);
    } else {
      newFlagsPicked.push(element);     
    }
    this.setState({
      ...this.state,
      flagsPicked: newFlagsPicked,
    })
  }

  // functions for result
  renderResult() {
    return this.state.flagsPicked.map((element, index) => {
      return <div key={index}>{this.state.flags[element]}</div>
    })
  }

  reset() {
    this.setState({
      ...this.state,
      continentPicked: '',
      flagsPicked: [],
    })
  }

  getInput1(value) {
    this.setState({
      ...this.state,
      termFirst: value,
    })
  }
  getInput2(value) {
    this.setState({
      ...this.state,
      termSecond: value,
    })
  }

  updateShowOptionOne(value) {
    this.setState({
      ...this.state,
      showSearchBoxOne: value
    })
  }

  updateShowOptionTwo(value) {
    this.setState({
      ...this.state,
      showSearchBoxTwo: value
    })
  }

  render() {
    return (
      <div>
        <h1 className="flagTitle">Flag Picker</h1>
        <p className = "flagText">This app will help you to learn flags around the world in <u>3 steps.</u></p>
        <div className="flag-picker">
          <SearchBox 
            title="Step 1"
            description="Select a continent."
            getInput={this.getInput1}
            updateShowOption={this.updateShowOptionOne}>
            <ul>
              { 
                this.state.showSearchBoxOne
                ? this.renderContinent(this.state.continents)
                : null
              }
            </ul>
            {
            this.state.continentPicked!==''
            ? this.renderYouSelected()
            : null
            }
          </SearchBox>
          {
            this.state.continentPicked!=='' && this.state.showSearchBOxTwo
            ? (
                <SearchBox
                  title="Step 2"
                  description="Now, select a country."
                  updateShowOption={this.updateShowOptionTwo}
                  getInput={this.getInput2}>
                  <ul>
                    {this.renderCountry(this.state.countries[this.state.continentPicked])}
                  </ul>
                </SearchBox>
            ) : null
          }
          <div>
          {
            this.state.flagsPicked.length!==0
            ? (
              <div>
                <h1>Selected flags:</h1>
                <div className="render-flag">{this.renderResult()}</div>
                <button className="clear-flag" onClick={this.reset}>Clear Result</button>
              </div>
            )
            : null
          }
          </div>
        </div>
        
      </div>
    )
  }
}

export default FlagPicker;