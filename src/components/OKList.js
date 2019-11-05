// import React from 'react';

// class OKList extends React.Component {
//     render() {
//         return(
//             <div className="GargabeList">
//                 <h3>garbage</h3>
//                 <div className='list'>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                     <li className="listItem">a</li>
//                 </div>
//             </div>
//         )
//     }
// }


import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { IMPORTANT } from '../resource';
import { changePriority } from '../actions/postAction';

class OKList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInflg: false,
        }
    }

    handleMouseUp(e) {
        if(this.props.isDrag) {
            this.props.changePriority(IMPORTANT);
            this.setState({
                listInflg: false,
            });
        }
    }

    handleMouseEnter() {
        if(this.props.isDrag) {
            this.setState({
                listInflg: true,
            });
        }
    }

    handleMouseOut() {
        if(this.props.isDrag) {
            this.setState({
                listInflg: false,
            });
        }
    }
    
    render() {
        const list = this.props.okList.map((idea) => {
            return(
                <ListItem
                    key={ idea.id }
                    label={ idea.label }
                    id={ idea.id }
                    isActive={ idea.id === this.props.activeKey }

                />
            )
        });

        return(
            <div 
                className="OKList" 
                onMouseUp={ e => this.handleMouseUp(e) }
                onMouseEnter={ () => this.handleMouseEnter()}
                onMouseOut={ () => this.handleMouseOut()}>
                <h3>important</h3>
                <div className={ ['list', this.state.listInflg ? 'listIn' : ''].join(' ') }>
                    {list}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    okList: state.postReducer.ideas.filter(idea => idea.priority === IMPORTANT),
    activeKey: state.postReducer.activeKey,
    isDrag: state.postReducer.isItemDragging,
});

const mapDispatchToProps = dispatch => ({
    changePriority: priority => dispatch(changePriority(priority)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OKList);