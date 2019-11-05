import React from 'react';
import PostForm from './PostForm';
import Panel from './Panel';
import OKList from './OKList';
import GarbageList from './GarbageList';
import Property from './Property';
import { connect } from 'react-redux';
import { activateIdea, setIsItemDragging } from '../actions/postAction';

class App extends React.Component {
    handleClick() {
        this.props.activateIdea();
    }

    handleMouseUp() {
        this.props.setIsItemDragging(false);
    }

    render() {
        return(
            <div 
                className="appContainer" 
                onClick={ () => this.handleClick() }
                onMouseUp={ () => this.handleMouseUp() }>
                <GarbageList />
                <Property />
                <Panel />
                <OKList />
                <PostForm />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    activateIdea: () => dispatch(activateIdea(undefined)),
    setIsItemDragging: isDrag => dispatch(setIsItemDragging(isDrag)),
});

export default connect(null, mapDispatchToProps)(App);