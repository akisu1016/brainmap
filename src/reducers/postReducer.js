import {
    NEW_POST, 
    LOCATION_CHANGE, 
    ACTIVATE_IDEA, 
    CHANGE_PRIORITY,
    CHANGE_IS_DRAG,
    CHANGE_DRAGGING_ITEM,
} from '../actions/types';

const initialState = {
    ideas: [],
    counter: 0,
    activeKey: undefined,
    draggingKey: null,
    isItemDragging: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case NEW_POST: {
            const newIdea = Object.assign({}, action.payload, {
                id: state.counter,
            });
            const newIdeaList = state.ideas.slice();
            newIdeaList.push(newIdea);
            return Object.assign({}, state, {
                ideas: newIdeaList,
                counter: state.counter + 1,
            });
        }
        case LOCATION_CHANGE: {
            const newIdeaList = state.ideas.slice();
            for(let i = 0; i < newIdeaList.length; i++) {
                if(newIdeaList[i].id === action.key) {
                    newIdeaList[i].loc = action.payload;
                    break;
                }
            }
            // console.log(newIdeaList[0].loc.x);
            // if(state.ideas !== newIdeaList) {
            //     console.log(state);
            //     console.log(newIdeaList);
            //     console.log(Object.assign({}, state, {
            //     ideas: newIdeaList,
            // }));
            // }
            


            return Object.assign({}, state, {
                ideas: newIdeaList,
            });
        }
        case ACTIVATE_IDEA: {
            return Object.assign({}, state, {
                activeKey: action.payload,
            });
        }
        case CHANGE_PRIORITY: {
            const newIdeas = state.ideas.slice();
            for(let i = 0; i < newIdeas.length; i++) {
                if(state.isItemDragging) {
                    if(newIdeas[i].id === state.draggingKey) {
                        newIdeas[i].priority = action.payload;
                        break;
                    }
                } else {
                    if(newIdeas[i].id === state.activeKey) {
                        newIdeas[i].priority = action.payload;
                        break;
                    }
                }
            }
            return Object.assign({}, state, {
                ideas: newIdeas,
            });
        }
        case CHANGE_IS_DRAG: {
            return Object.assign({}, state, {
                isItemDragging: action.payload,
            });
        }
        case CHANGE_DRAGGING_ITEM: {
            const newIdea = Object.assign({}, action.payload, {
                id: state.counter,
            });
            const newIdeaList = state.ideas.slice();
            newIdeaList.push(newIdea);
            console.log(action.payload);
            return Object.assign({}, state, {
                draggingKey: action.payload,
            });
        }
        default:
            return state;
    }
}