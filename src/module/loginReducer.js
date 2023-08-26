export const LOG_IN = () => {
  return {
    type: 'LOG_IN'
  }
}
export const LOG_OUT = () => {
  return {
    type: 'LOG_OUT'
  }
}

const loginReducer = (state = false, action) => {
  if (action.type === 'LOG_IN') {
    return state = true
  }
  if (action.type === 'LOG_OUT') {
    return state = false
  }
  return state
}

export default loginReducer;
