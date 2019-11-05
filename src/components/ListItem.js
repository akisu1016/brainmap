import React from 'react';
import { connect } from 'react-redux';
import { activateIdea, setIsItemDragging, setDraggingItem } from '../actions/postAction';

class ListItem extends React.Component {
    handleClick(e) {
        e.stopPropagation();
        this.props.activateIdea(this.props.id);
    }

    handleMouseDown() {
        this.props.setIsItemDragging(true);
        this.props.setDraggingItem(this.props.id);
    }

    render() {
        return(
            <p 
                className={ ["listItem", this.props.isActive ? 'activeListItem' : ''].join(' ') }
                onClick={ e => this.handleClick(e) }
                onMouseDown={ () => this.handleMouseDown() }>
                <label>{ compact(this.props.label) }</label>
            </p>
        )
    }
}

const compact = str => {
    let newStr = str.substring(0, 6);
    if(str !== newStr) {
        newStr += '...';
    }
    return newStr;
}

const mapDispatchToProps = dispatch => ({
    activateIdea: key => dispatch(activateIdea(key)),
    setIsItemDragging: isDrag => dispatch(setIsItemDragging(isDrag)),
    setDraggingItem: id => dispatch(setDraggingItem(id)),
});

export default connect(null, mapDispatchToProps)(ListItem);