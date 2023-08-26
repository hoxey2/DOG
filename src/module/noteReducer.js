import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_NOTE = 'NOTE/GET_NOTE';
export const SET_NOTE = 'NOTE/SET_NOTE';

const actions = createActions({
    [GET_NOTE]: () => {},
    [SET_NOTE]: () => {},
});

/* 리듀서 */
const noteReducer = handleActions(
    {
        [GET_NOTE]: (state, { payload }) => {
            return state;
        },
        [SET_NOTE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default noteReducer;