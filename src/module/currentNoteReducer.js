import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const SET_CURRENT_NOTE = 'CURRENT_NOTE/SET_CURRENT_NOTE';
export const INIT_CURRENT_NOTE = 'CURRENT_NOTE/INIT_CURRENT_NOTE';

const actions = createActions({
    [SET_CURRENT_NOTE]: () => {},
    [INIT_CURRENT_NOTE]: () => {},
});

/* 리듀서 */
const noteReducer = handleActions(
    {
        [SET_CURRENT_NOTE]: (state, { payload }) => {
            return payload;
        },
        [INIT_CURRENT_NOTE]: (state, { payload }) => {
            return [];
        },
    },
    initialState
);

export default noteReducer;