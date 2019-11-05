import React from 'react';
import '../App.css';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleClic() {
    const text = document.getElementById("sendText").value;
    this.props.handleClick(text);
  }

  render() {
    return(
      <div className="Submit">
        <form>
          <input type="text" id="sendText"></input>
          <input type="button" value="ボタン" onClick={ () => this.handleClic() }></input>
        </form>
        <ul id="List">
          { this.state.text.map( (text, i) => {
            return <li key={ i }>{ text }</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Submit;