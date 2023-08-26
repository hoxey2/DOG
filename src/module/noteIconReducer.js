export const IN_NOTE_PAGE = () => {
    return {
        type: 'IN_NOTE_PAGE'
    }
}
export const OUT_NOTE_PAGE = () => {
    return {
        type: 'OUT_NOTE_PAGE'
    }
}

const noteIconReducer = (state = false , action) => {
    if(action.type === 'IN_NOTE_PAGE' ) {
        return true;
    }
    if(action.type === 'OUT_NOTE_PAGE' ) {
        return false;
    }
    return state;
}

export default noteIconReducer;