import React from 'react';
import { connect } from 'react-redux';
import Idea from './Idea';
import { sendPost, updateLocation, activateSubmit, changePriority } from '../actions/postAction';
import { UNLABELED } from '../resource';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        // this.panelRef = React.createRef();
        // this.containerRef = React.createRef();
        this.state = {
            // draggingItem: null,
            // isDrag: false,
            x: 0,
            y: 0,
            isMouseOnRightEdge: false,
            isMouseOnBottomEdge: false,
            isMouseOnleftEdge: false,
            isMouseOnTopEdge: false,
            currentPointerX: undefined,
            currentPointerY: undefined,
        }
    }

    updateXY(x, y) {
        this.setState({
            x: x + this.containerRef.current.scrollLeft,
            y: y + this.containerRef.current.scrollTop,
        });
    }

    // setIsDrag(isDrag) {
    //     this.setState({
    //         isDrag,
    //     });
    // }

    // setDraggingItem(draggingItem) {
    //     this.setState({
    //         draggingItem,
    //     });
    // }

    handleMouseMove(e) {
        if (this.props.isDrag) {
            const container = this.containerRef.current;
            const left = container.offsetLeft;
            const top = container.offsetTop;
            const right = left + container.offsetWidth;
            const bottom = top + container.offsetHeight;

            if(e.pageX > right - 50 || e.pageY > bottom - 50 || e.pageX < left + 50 || e.pageY < top + 50) {
                if(e.pageX > right - 50) {
                    if(!this.state.isMouseOnRightEdge) {
                        this.setState({
                            isMouseOnRightEdge: true,
                        });
                        this.scrollIfOnEdge('right');
                    }
                } else {
                    if(this.state.isMouseOnRightEdge) {
                        this.setState({
                            isMouseOnRightEdge: false,
                        });
                    }
                }

                if(e.pageY > bottom - 50) {
                    if(!this.state.isMouseOnBottomEdge) {
                        this.setState({
                            isMouseOnBottomEdge: true,
                        });
                        this.scrollIfOnEdge('bottom');
                    }
                } else {
                    if(this.state.isMouseOnBottomEdge) {
                        this.setState({
                            isMouseOnBottomEdge: false,
                        });
                    }
                }

                if(e.pageX < left + 50) {
                    if(!this.state.isMouseOnLeftEdge) {
                        this.setState({
                            isMouseOnLeftEdge: true,
                        });
                        this.scrollIfOnEdge('left');
                    }
                } else {
                    if(this.state.isMouseOnLeftEdge) {
                        this.setState({
                            isMouseOnLeftEdge: false,
                        });
                    }
                }

                if(e.pageY < top + 50) {
                    if(!this.state.isMouseOnTopEdge) {
                        this.setState({
                            isMouseOnTopEdge: true,
                        });
                        this.scrollIfOnEdge('top');
                    }
                } else {
                    if(this.state.isMouseOnTopEdge) {
                        this.setState({
                            isMouseOnTopEdge: false,
                        });
                    }
                }
            } else {
                if(this.state.isMouseOnRightEdge || this.state.isMouseOnBottomEdge || this.state.isMouseOnTopEdge || this.state.isMouseOnLeftEdge) {
                    this.setState({
                        isMouseOnRightEdge: false,
                        isMouseOnBottomEdge: false,
                        isMouseOnTopEdge: false,
                        isMouseOnLeftEdge: false,
                    });
                }
            }

            if(e.pageX < right && e.pageX > left){
                if(e.pageY < bottom && e.pageY > top) {
                    e.preventDefault();
                    this.setState({
                        currentPointerX: e.pageX,
                        currentPointerY: e.pageY,
                    });
                    this.props.updateLocation({
                        y: e.pageY - this.state.y + container.scrollTop,
                        x: e.pageX - this.state.x + container.scrollLeft,
                    }, this.props.draggingItem);
                }
            }
        }
    }

    scrollIfOnEdge(action) {
        switch(action) {
            case 'right': {
                // console.log('right called');
                let onEdgeCheckerR = setInterval(() => {
                    // console.log('moving right');
                    if(this.props.isDrag) {
                        const container = this.containerRef.current;
                        if(container.scrollLeft < 3000 - container.offsetWidth) {
                            if(this.state.isMouseOnRightEdge) {
                                this.containerRef.current.scrollLeft += 5;
                                this.props.updateLocation({
                                    y: this.state.currentPointerY - this.state.y + container.scrollTop,
                                    x: this.state.currentPointerX - this.state.x + container.scrollLeft,
                                }, this.props.draggingItem);
                                return;
                            }
                        }
                    }
                    // console.log('clearing right');
                    clearInterval(onEdgeCheckerR);
                }, 15);
                break;
            }
            case 'bottom': {
                //console.log('bottom called');
                let onEdgeCheckerB = setInterval(() => {
                    //console.log('moving bottom');
                    if(this.props.isDrag) {
                        const container = this.containerRef.current;
                        if(container.scrollTop < 3000 - container.offsetWidth) {
                            if(this.state.isMouseOnBottomEdge) {
                                this.containerRef.current.scrollTop += 5;
                                this.props.updateLocation({
                                    y: this.state.currentPointerY - this.state.y + container.scrollTop,
                                    x: this.state.currentPointerX - this.state.x + container.scrollLeft,
                                }, this.props.draggingItem);
                                return;
                            }
                        }
                    }
                    //console.log('clearing bottom');
                    clearInterval(onEdgeCheckerB);
                }, 15);
                break;
            }
            case 'left': {
                //console.log('left called');
                let onEdgeCheckerL = setInterval(() => {
                    //console.log('moving left');
                    if(this.props.isDrag) {
                        if(this.containerRef.current.scrollLeft > 0) {
                            if(this.state.isMouseOnLeftEdge) {
                                this.containerRef.current.scrollLeft -= 5;
                                const container = this.containerRef.current;
                                this.props.updateLocation({
                                    y: this.state.currentPointerY - this.state.y + container.scrollTop,
                                    x: this.state.currentPointerX - this.state.x + container.scrollLeft,
                                }, this.props.draggingItem);
                                return;
                            }
                        }
                    }
                    //console.log('clearing left');
                    clearInterval(onEdgeCheckerL);
                }, 15);
                break;
            }
            default: {
                //console.log('top called');
                let onEdgeCheckerT = setInterval(() => {
                    //console.log('moving top');
                    if(this.props.isDrag) {
                        if(this.containerRef.current.scrollTop > 0) {
                            if(this.state.isMouseOnTopEdge) {
                                this.containerRef.current.scrollTop -= 5;
                                const container = this.containerRef.current;
                                this.props.updateLocation({
                                    y: this.state.currentPointerY - this.state.y + container.scrollTop,
                                    x: this.state.currentPointerX - this.state.x + container.scrollLeft,
                                }, this.props.draggingItem);
                                return;
                            }
                        }
                    }
                    //console.log('clearing top');
                    clearInterval(onEdgeCheckerT);
                }, 15);
                break;
            }
                
        }
    }

    // scrollIfOnEdgeX() {
    //     let onEdgeChecker = setInterval(() => {
    //         if(this.props.isDrag) {
    //             if(this.state.isMouseOnRightEdge) {
    //                 this.containerRef.current.scrollLeft += 5;
    //                 const container = this.containerRef.current;
    //                 this.props.updateLocation({
    //                     y: this.state.currentPointerY - this.state.y + container.scrollTop,
    //                     x: this.state.currentPointerX - this.state.x + container.scrollLeft,
    //                 }, this.state.draggingItem);
    //                 return;
    //             }
    //         }
    //         clearInterval(onEdgeChecker);
    //     }, 15);
    // }

    // scrollIfOnEdgeY() {
    //     let onEdgeChecker = setInterval(() => {
    //         if(this.props.isDrag) {
    //             if(this.state.isMouseOnBottomEdge) {
    //                 this.containerRef.current.scrollTop += 5;
    //                 const container = this.containerRef.current;
    //                 this.props.updateLocation({
    //                     y: this.state.currentPointerY - this.state.y + container.scrollTop,
    //                     x: this.state.currentPointerX - this.state.x + container.scrollLeft,
    //                 }, this.state.draggingItem);
    //                 return;
    //             }
    //         }
    //         clearInterval(onEdgeCheckerY);
    //     }, 15);
    // }

    handleClick(e) {
        if(this.props.submitIsActive) {
            const post = {
                shape: this.props.submittedShape,
                label: this.props.submittedLabel,
                loc: { 
                    x: e.pageX - this.containerRef.current.getBoundingClientRect().left + this.containerRef.current.scrollLeft - 50,
                    y: e.pageY - this.containerRef.current.getBoundingClientRect().top + this.containerRef.current.scrollTop -50,
                },
                priority: UNLABELED,
            }
            this.props.sendPost(post);
            this.props.activateSubmit();
        }
    }

    handleMouseEnter() {
        if(this.props.isDrag) {
            this.props.changePriority(UNLABELED);
        }
    }

    render() {
        const list = this.props.ideas.map((idea) => {
            return(
                <Idea
                    shape={ idea.shape }
                    label={ idea.label }
                    key={ idea.id }
                    id={ idea.id }
                    loc={ idea.loc }
                    updateXY={ (x, y) => this.updateXY(x, y) }
                />
                    // <label className="label">{compact(idea.label)}</label>
            )
        });
        return(
            <div className="panelContainer" ref={ this.containerRef }>
                <div
                    className="panel"
                    onMouseMove={ e => this.handleMouseMove(e) }
                    onMouseEnter={ () => this.handleMouseEnter() }
                    onClick={ e => this.handleClick(e) }>
                    {list}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ideas: state.postReducer.ideas.filter(idea => idea.priority === UNLABELED),
    submitIsActive: state.formReducer.submitIsActive,
    submittedShape: state.formReducer.shape,
    submittedLabel: state.formReducer.label,
    isDrag: state.postReducer.isItemDragging,
    draggingItem: state.postReducer.draggingKey,
});

const mapDispatchToProps = dispatch => ({
    activateSubmit: () => dispatch(activateSubmit()),
    updateLocation: (loc, key) => dispatch(updateLocation(loc, key)),
    sendPost: post => dispatch(sendPost(post)),
    changePriority: priority => dispatch(changePriority(priority)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);