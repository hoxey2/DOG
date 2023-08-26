export const OPEN_ACCOUNT_DRAWER = () => {
  return {
    type: 'OPEN_ACCOUNT_DRAWER'
  }
}
export const CLOSE_ACCOUNT_DRAWER = () => {
  return {
    type: 'CLOSE_ACCOUNT_DRAWER'
  }
}

const accountDrawerReducer = (state = false, action) => {
    if (action.type === 'OPEN_ACCOUNT_DRAWER') {
      return !state;
    }
    if (action.type === 'CLOSE_ACCOUNT_DRAWER') {
      return !state;
    }
    return state
  }
  export default accountDrawerReducer;

  
  