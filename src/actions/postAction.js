import { 
    NEW_POST,
    LOCATION_CHANGE, 
    CHANGE_FORM_STATE, 
    ACTIVATE_IDEA, 
    CHANGE_PRIORITY,
    CHANGE_IS_DRAG,
    CHANGE_DRAGGING_ITEM,
} from './types';

export const sendPost = post => {
    return {
        type:  NEW_POST,
        payload: post,
     };
}

export const updateLocation = (loc, key) => {
    return {
        type: LOCATION_CHANGE,
        payload: loc,
        key,
    }
}

export const activateSubmit  = formState => {
    return {
        type: CHANGE_FORM_STATE,
        payload: formState,
    }
}

export const activateIdea = id => {
    return {
        type: ACTIVATE_IDEA,
        payload: id,
    }
}

export const changePriority = priority => {
    return {
        type: CHANGE_PRIORITY,
        payload: priority,
    }
}

export const setIsItemDragging = isDrag => {
    return {
        type: CHANGE_IS_DRAG,
        payload: isDrag,
    }
}

export const setDraggingItem = id => {
    return {
        type: CHANGE_DRAGGING_ITEM,
        payload: id,
    }
}
