// import React from 'react'

// class Property extends React.Component {
//     render() {
//         return (
//             <div className="property" style={{textAlign: 'center'}}>
//                 <h3>property</h3>
//                 <label>disc: </label><input type="text"></input><br />
//                 <label>prio: </label><input type="text"></input>
//                 <input type="radio" name="radio" value="name" />
//             </div>
//         )
//     }
// }

// export default Property;

import React from 'react';
import { connect } from 'react-redux';
import { IMPORTANT, GARBAGE, UNLABELED } from '../resource';
import { changePriority } from '../actions/postAction';


class Property extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			nameInputRef: undefined,
			noteInputRef: undefined,
		}
	}

	setNameInputRef(e) {
		// console.log(e);
		this.setState({
			nameInputRef: e.target.value,
		});
	}

	setNoteInputRef(e) {
		this.setState({
			noteInputRef: e.target.value,
		});
	}

  handleChange(priority) {
    this.props.changePriority(priority);
  }

  render(){
    const  property = this.props.ideas.map((idea) => {
      if(idea.id === this.props.activeKey){
        return(
          <div key={ idea.id }>
            <div className="inlineRadio">
              <div><input 
                id="garbageRadio"
                type="radio" 
                name="prioritySelecter" 
                checked={ idea.priority === GARBAGE }
                onChange={ () => this.handleChange(GARBAGE) }/><label htmlFor="garbageRadio">G</label></div>
              <div><input 
                id="unlabeldRadio"
                type="radio" 
                name="prioritySelecter" 
                checked={ idea.priority === UNLABELED }
                onChange={ () => this.handleChange(UNLABELED) }/><label htmlFor="unlabeldRadio">U</label></div>
              <div><input 
                id="imporatantRadio"
                type="radio" 
                name="prioritySelecter" 
                checked={ idea.priority === IMPORTANT }
                onChange={ () => this.handleChange(IMPORTANT) }/><label htmlFor="imporatantRadio">！</label></div>
            </div>
            <label>name:</label>
            <input style={{width: "130px"}}type="text" defaultValue={idea.label} onChange={ (e) => this.setNameInputRef(e) }/>
            <br></br>
            <label>relevance: </label>
            <input type="submit" value="cf."/>
            <br></br>
            <div>
              <input type="button" value="〇"/>
              <input type="button" value="☆"/>
            </div>
            <label>notes:</label>
            <br></br>
            <textarea name="notes" rows="5" cols="30" defaultValue="Write anything" onChange={ (e) => this.setNameInputRef(e) }></textarea>
            
          </div>
        ) 
      } else {
					return null;
			}
    });

    return(
      <div className="property" onClick={e => e.stopPropagation()}>
        <h3>Property</h3>
        {property}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    ideas: state.postReducer.ideas,
    activeKey: state.postReducer.activeKey,
});

const mapDispatchToProps = dispatch => ({
    changePriority: priority => dispatch(changePriority(priority)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);


