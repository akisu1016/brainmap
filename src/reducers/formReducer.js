import { CHANGE_FORM_STATE } from '../actions/types';

const initialState = {
    shape: 'circle',
    submitIsActive: false,
    label: '',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_FORM_STATE: {
            if(action.payload) {
                return Object.assign({}, state, {
                    shape: action.payload.shape,
                    label: action.payload.label,
                    submitIsActive: !state.submitIsActive,
                });
            } else {
                return Object.assign({}, state, {
                    submitIsActive: !state.submitIsActive,
                });
            }
        }
        default:
            return state;
    }
}