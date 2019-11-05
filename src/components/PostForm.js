import React from 'react';
import { sendPost, activateSubmit } from '../actions/postAction';
import { connect } from 'react-redux';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef =  React.createRef();
        this.state = {
            shape: 'circle',
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.inputRef.current.value !== ''){
            const formState = {
                shape: this.state.shape,
                label: this.inputRef.current.value,
            }
            this.props.activateSubmit(formState);
        } else {
            this.inputRef.current.focus();
        }
    }

    handleChange(e) {
        this.setState({
            shape: e.target.value,
        });
    }

    render() {
        return(
            <div>
                <form className="form" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="inlineRadio">
                        <div><input 
                            id="circleRadio"
                            type="radio" 
                            name="shape" 
                            value="circle" 
                            checked={ this.state.shape === 'circle' }
                            onChange={ (e) => this.handleChange(e) }
                        /> <label htmlFor="circleRadio">○</label></div>
                        <div><input 
                            id="triangleRadio"
                            type="radio" 
                            name="shape" 
                            value="triangle" 
                            checked={ this.state.shape === 'triangle' }
                            onChange={ (e) => this.handleChange(e) }
                        /><label htmlFor="triangleRadio">☆</label></div>
                    </div>
                    {/* <span id="circle"
                        className={['shapeSelector',
                            this.state.shape === 'circle' ? 'shapeSelected' : ''].join(' ')}
                        onClick={(e) => this.handleClick(e)}>〇</span>
                    <span id="triangle"
                        className={['shapeSelector',
                            this.state.shape === 'triangle' ? 'shapeSelected' : ''].join(' ')}
                        onClick={(e) => this.handleClick(e)}>☆</span> */}
                    <input type="text" className="postInput" ref={this.inputRef} />
                    <input type="submit" value="submit"
                        className={ ['formSubmit',
                        this.props.submitIsActive ? 'activeSubmit' : '' ].join(' ')} />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    sendPost: post => dispatch(sendPost(post)),
    activateSubmit: formState => dispatch(activateSubmit(formState)),
});

const mapStateToProps = state => ({
    submitIsActive: state.formReducer.submitIsActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);