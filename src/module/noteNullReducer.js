export const NOTE_NULL = () => {
    return {
        type: 'NOTE_NULL'
    }
}
export const NOTE_NOT_NULL = () => {
    return {
        type: 'NOTE_NOT_NULL'
    }
}

const noteNullReducer = (state = true , action) => {
    if(action.type === 'NOTE_NULL' ) {
        return true;
    }
    if(action.type === 'NOTE_NOT_NULL' ) {
        return false;
    }
    return state;
}

export default noteNullReducer;