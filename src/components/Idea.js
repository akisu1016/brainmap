import React from 'react';
import { connect } from 'react-redux';
import {
    activateIdea,
    setIsItemDragging,
    setDraggingItem
} from '../actions/postAction';

class Idea extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.showDisc = this.showDisc.bind(this);
        this.state = {
            isDrag: false,
            isHover: false,
            DiscIsShown: false,
        }
    }

    handleMouseEnter() {
        this.setState({
            isHover: true,
        });
        setTimeout(this.showDisc, 2000);
    }

    handleMouseLeave() {
        this.setState({
            isHover: false,
            DiscIsShown: false,
        })
    }

    handleDown(e) {
        const item = this.node.current;
        const x = e.pageX - item.offsetLeft;
        const y = e.pageY - item.offsetTop;
        this.props.updateXY(x, y);
        this.props.setIsDrag(true);
        this.props.setDraggingItem(this.props.id);
        this.setState({
            isDrag: true,
        });
    }

    handleUp() {
        // this.props.setIsDrag(false);
        this.setState({
            isDrag: false,
        });
    }

    handleClick(e) {
        e.stopPropagation();
        this.props.activateIdea(this.props.id);
    }

    showDisc() {
        if(this.state.isHover) {
            this.setState({
                DiscIsShown: true,
            });
        }
    }

    render() {
        console.log(this.props.isDrag);
        // console.log(this.props.key);
        const pos = {
            left: this.props.loc.x,
            top: this.props.loc.y,
            position: 'absolute',
            // pointerEvents: 'none',
        };

        return(
            <div className={ [
                    this.props.shape,
                    this.state.isDrag ? 'dragging' : '',
                ].join(' ') }
                ref={ this.node }
                // onMouseEnter={ () => this.handleMouseEnter() }
                // onMouseLeave={ () => this.handleMouseLeave() }
                onMouseDown={ (e) => this.handleDown(e) }
                onMouseUp={ () => this.handleUp() }
                style = { pos }
                onClick={ (e) => this.handleClick(e) }
            >
                <label className="label">{ compact(this.props.label) }</label>
                <div 
                    className="ideaDiscription"
                    style={ this.state.DiscIsShown ? {} : {display:'none'} }
                    onMouseDown={ (e) => e.stopPropagation() }>
                        <p>{ this.props.label }</p>
                </div>
            </div>
        )
    }
}

const compact = str => {
    let newStr = str.substring(0, 6);
    if(str !== newStr) {
        newStr += '...';
    }
    return newStr;
};

const mapStateToProps = state => ({
    isDrag: state.postReducer.isItemDragging,
});

const mapDispatchToProps = (dispatch) => ({
    activateIdea: id => dispatch(activateIdea(id)),
    setIsDrag: isDrag => dispatch(setIsItemDragging(isDrag)),
    setDraggingItem: id => dispatch(setDraggingItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Idea);