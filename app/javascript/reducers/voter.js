
const initialState = {
  key: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'VOTER_KEY_SET':
      return Object.assign({}, state, {
        key: action.key
      })
    default:
      return state
  }
}

export default reducer
