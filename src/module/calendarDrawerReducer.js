export const OPEN_CALENDAR_DRAWER = () => {
    return {
      type: 'OPEN_CALENDAR_DRAWER'
    }
  }
  export const CLOSE_CALENDAR_DRAWER = () => {
    return {
      type: 'CLOSE_CALENDAR_DRAWER'
    }
  }
  
  const calendarDrawerReducer = (state = false, action) => {
      if (action.type === 'OPEN_CALENDAR_DRAWER') {
        return !state;
      }
      if (action.type === 'CLOSE_CALENDAR_DRAWER') {
        return !state;
      }
      return state
    }
    export default calendarDrawerReducer;
  
    
    