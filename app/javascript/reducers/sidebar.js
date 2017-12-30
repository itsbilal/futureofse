
const initialState = {
  open: false,
  course: {},
  program: {},
  display: "course",
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'STAGE_CHANGED':
    case 'STAGE_NEXT':
      // reset
      return initialState
    case 'SIDEBAR_CHANGED':
      if (action.display == 'course') {
        return Object.assign({}, state, {
          open: true,
          display: "course",
          course: action.course,
        })
      } else {
        return Object.assign({}, state, {
          open: true,
          display: "program",
          program: action.program,
        })
      }
    case 'SIDEBAR_TOGGLED':
      return Object.assign({}, state, {
        open: !state.open,
      })
    default:
      return state
  }
}

export default reducer
